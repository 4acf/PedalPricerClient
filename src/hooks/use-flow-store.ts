import { Node } from '@xyflow/react';
import { create } from 'zustand'

type FlowStore = {
    setNodes: (updater: (nodes: Node[]) => Node[]) => void;
    setNodesUpdater: (func: (updater: (nodes: Node[]) => Node[]) => void) => void,
}

export const useFlowStore = create<FlowStore>((set) => ({
    setNodes: () => {},
    setNodesUpdater: (func) => set(() => ({ setNodes: func })),
}));