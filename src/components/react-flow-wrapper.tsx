import { ItemNode } from "./item-node"
import { ReactFlow, Background, BackgroundVariant, useNodesState } from "@xyflow/react"
import '@xyflow/react/dist/style.css';
import { INCH } from "@/utils/constants";

const nodeTypes = {
    itemNode: ItemNode,
  };
const defaultViewport = { x: INCH, y: INCH, zoom: 1 };

export function ReactFlowWrapper() {

    const [nodes, setNodes, onNodesChange] = useNodesState([]);

    return (
        <ReactFlow 
            nodes={nodes}
            nodeTypes={nodeTypes}
            onNodesChange={onNodesChange}
            proOptions={{ hideAttribution: true }} 
            className="rounded-2xl"
            defaultViewport={defaultViewport}
            deleteKeyCode={[]}
        >
            <Background variant={BackgroundVariant.Dots} color="#6b6b6b" />
        </ReactFlow>
    )
}