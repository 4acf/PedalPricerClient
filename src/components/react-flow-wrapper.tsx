import { ItemNode } from "./item-node"
import { ReactFlow, Background, BackgroundVariant, useNodesState, Node, Controls, OnNodeDrag, XYPosition, OnNodesDelete } from "@xyflow/react"
import '@xyflow/react/dist/style.css';
import { INCH, NODES_STORAGE_KEY } from "@/utils/constants";
import { useFlowStore } from "@/hooks/use-flow-store";
import { useEffect, useState } from "react";
import { useHistory } from "@/hooks/use-history";
import { ActionFactory } from "@/factory/action-factory";

const nodeTypes = {
    itemNode: ItemNode,
  };
const defaultViewport = { x: INCH, y: INCH, zoom: 1 };

export function ReactFlowWrapper() {

    const [nodes, setNodes, onNodesChange] = useNodesState<Node>(
        JSON.parse(localStorage.getItem(NODES_STORAGE_KEY) ?? "[]") as Node[]
    );
    const setNodesUpdater = useFlowStore((state) => state.setNodesUpdater);
    const appendAction = useHistory((state) => state.appendAction);
    const [startPositions, setStartPositions] = useState<Record<string, XYPosition>>({});

    //make setNodes global
    useEffect(() => {
        setNodesUpdater(setNodes);
    }, [setNodes, setNodesUpdater])

    useEffect(() => {
        localStorage.setItem(NODES_STORAGE_KEY, JSON.stringify(nodes));
    }, [nodes]);

    const handleNodeDragStart: OnNodeDrag<Node> = (_, node) => {
        setStartPositions((prev) => ({
            ...prev,
            [node.id]: node.position,
        }));
    }

    const handleNodeDragStop: OnNodeDrag<Node> = (_, node) => {
        const originalPosition = startPositions[node.id];
        const finalPosition = node.position;
        const action = ActionFactory.Create(
            () => {
                setNodes((nds) => 
                    nds.map((n) => (n.id === node.id ? {...n, position: {...originalPosition}} : n))
                );
            },
            () => {
                setNodes((nds) => 
                    nds.map((n) => (n.id === node.id ? {...n, position: {...finalPosition}} : n))
                );
            },
        );
        appendAction(action);
    }

    const handleNodeDeletion: OnNodesDelete<Node> = (deletedNodes) => {
        deletedNodes.forEach((node) => {
            delete startPositions[node.id];
        })
    }

    return (
        <ReactFlow 
            nodes={nodes}
            nodeTypes={nodeTypes}
            onNodesChange={onNodesChange}
            onNodeDragStart={handleNodeDragStart}
            onNodeDragStop={handleNodeDragStop}
            onNodesDelete={handleNodeDeletion}
            proOptions={{ hideAttribution: true }} 
            className="rounded-2xl"
            defaultViewport={defaultViewport}
            deleteKeyCode={[]}
            elevateNodesOnSelect={false}
            fitView
        >
            <Controls 
                showInteractive={false}
                position="top-left"
            />
            <Background variant={BackgroundVariant.Dots} color="#6b6b6b" />
        </ReactFlow>
    )
}