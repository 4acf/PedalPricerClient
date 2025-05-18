import { ItemNode } from "./item-node"
import { ReactFlow, Background, BackgroundVariant, useNodesState, Node, Controls } from "@xyflow/react"
import '@xyflow/react/dist/style.css';
import { INCH, NODES_STORAGE_KEY } from "@/utils/constants";
import { useFlowStore } from "@/hooks/use-flow-store";
import { useEffect } from "react";

const nodeTypes = {
    itemNode: ItemNode,
  };
const defaultViewport = { x: INCH, y: INCH, zoom: 1 };

export function ReactFlowWrapper() {

    const [nodes, setNodes, onNodesChange] = useNodesState<Node>(
    JSON.parse(localStorage.getItem(NODES_STORAGE_KEY) ?? "[]") as Node[]
);
    const setNodesUpdater = useFlowStore((state) => state.setNodesUpdater);

    //make setNodes global
    useEffect(() => {
        setNodesUpdater(setNodes);
    }, [setNodes, setNodesUpdater])

    useEffect(() => {
        localStorage.setItem(NODES_STORAGE_KEY, JSON.stringify(nodes));
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