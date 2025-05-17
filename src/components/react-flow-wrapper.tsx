import { ItemNode } from "./item-node"
import { ReactFlow, Background, BackgroundVariant, useNodesState, Node, Controls, MiniMap } from "@xyflow/react"
import '@xyflow/react/dist/style.css';
import { INCH } from "@/utils/constants";
import { useFlowStore } from "@/hooks/use-flow-store";
import { useEffect } from "react";

const nodeTypes = {
    itemNode: ItemNode,
  };
const defaultViewport = { x: INCH, y: INCH, zoom: 1 };

const storageKey = "nodes";

export function ReactFlowWrapper() {

    const [nodes, setNodes, onNodesChange] = useNodesState<Node>(
    JSON.parse(localStorage.getItem(storageKey) ?? "[]") as Node[]
);
    const setNodesUpdater = useFlowStore((state) => state.setNodesUpdater);

    //make setNodes global
    useEffect(() => {
        setNodesUpdater(setNodes);
    }, [setNodes, setNodesUpdater])

    useEffect(() => {
        localStorage.setItem(storageKey, JSON.stringify(nodes));
    }, [nodes]);

    return (
        <ReactFlow 
            nodes={nodes}
            nodeTypes={nodeTypes}
            onNodesChange={onNodesChange}
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