import { ItemNode } from "./item-node"
import { ReactFlow, Background, BackgroundVariant, useNodesState, Node } from "@xyflow/react"
import '@xyflow/react/dist/style.css';
import { INCH } from "@/utils/constants";

const nodeTypes = {
    itemNode: ItemNode,
  };
const defaultViewport = { x: INCH, y: INCH, zoom: 1 };

export function ReactFlowWrapper() {

    const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);

    const nodesWithSetters = nodes.map((node: Node) => ({
        ...node,
        data: {
            ...node.data,
            setNodes,
        },
    }));

    return (
        <ReactFlow 
            nodes={nodesWithSetters}
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