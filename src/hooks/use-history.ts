import { Action } from '@/utils/action';
import { Stack } from '@/utils/stack';
import { create } from 'zustand'

type History = {
    undoStack: Stack<Action>,
    redoStack: Stack<Action>,
    appendAction: (action: Action) => void,
    undo: () => void,
    redo: () => void,
}

export const useHistory = create<History>((set, get) => ({
    undoStack: new Stack<Action>(),
    redoStack: new Stack<Action>(),
    appendAction: (action: Action) => {
        const { undoStack, redoStack } = get();
        undoStack.push(action);
        redoStack.clear();
        set((state) => ({
            undoStack: state.undoStack,
            redoStack: state.redoStack,
        }));
    },
    undo: (): void => {
        const { undoStack, redoStack } = get();
        const action = undoStack.pop();
        if(action){
            action.undo();
            redoStack.push(action);
            set((state) => ({
                undoStack: state.undoStack,
                redoStack: state.redoStack,
            }));
        }
    },
    redo: (): void => {
        const { undoStack, redoStack } = get();
        const action = redoStack.pop();
        if(action){
            action.redo();
            undoStack.push(action);
            set((state) => ({
                undoStack: state.undoStack,
                redoStack: state.redoStack,
            }));
        }
    }
}));