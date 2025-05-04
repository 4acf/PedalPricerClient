import { ItemNode } from "./item-node"
import { ItemTypes } from "../api/constants"
import { ReactFlow, Background, BackgroundVariant, useNodesState } from "@xyflow/react"
import '@xyflow/react/dist/style.css';

const nodeTypes = {
    itemNode: ItemNode,
  };
const defaultViewport = { x: 0, y: 0, zoom: 1 };

const inch = 20;

const initialNodes = [
{
    id: '1',
    type: 'itemNode',
    draggable: true,
    selectable: true,
    data: { itemType: ItemTypes.Pedals, id: "293ff675-5ebf-4e2d-16c5-08dd8226a971"}, 
    position: { x: 0, y: 0 },
    style: { width: 2 * inch, height: 2 * inch },
},
];

export function ReactFlowWrapper() {

    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);

    return (
        <ReactFlow 
            nodes={nodes}
            nodeTypes={nodeTypes}
            onNodesChange={onNodesChange}
            proOptions={{ hideAttribution: true }} 
            className="rounded-2xl"
            defaultViewport={defaultViewport}
        >
            <Background variant={BackgroundVariant.Dots} color="#6b6b6b" />
        </ReactFlow>
    )
}