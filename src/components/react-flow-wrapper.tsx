import { ItemNode } from "./item-node"
import { ReactFlow, Background, BackgroundVariant, useNodesState, Node } from "@xyflow/react"
import '@xyflow/react/dist/style.css';
import { INCH } from "@/utils/constants";
import { useFlowStore } from "@/hooks/use-flow-store";
import { useEffect } from "react";

const nodeTypes = {
    itemNode: ItemNode,
  };
const defaultViewport = { x: INCH, y: INCH, zoom: 1 };

export function ReactFlowWrapper() {

    const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
    const setNodesUpdater = useFlowStore((state) => state.setNodesUpdater);

    //make setNodes global
    useEffect(() => {
        setNodesUpdater(setNodes);
    }, [setNodes, setNodesUpdater])

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
        >
            <Background variant={BackgroundVariant.Dots} color="#6b6b6b" />
        </ReactFlow>
    )
}