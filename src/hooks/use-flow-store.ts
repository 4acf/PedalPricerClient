import { Node } from '@xyflow/react';
import { create } from 'zustand'

type FlowStore = {
    nodes: Node[],
    setNodes: (updater: (nodes: Node[]) => Node[]) => void;
    setNodesUpdater: (func: (updater: (nodes: Node[]) => Node[]) => void) => void,
}

export const useFlowStore = create<FlowStore>((set) => ({
    nodes: [],
    setNodes: () => {},
    setNodesUpdater: (func) => set(() => ({ setNodes: func })),
}));