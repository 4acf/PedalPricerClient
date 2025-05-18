import { Action } from "@/utils/action";

export class ActionFactory {

    private constructor() {}

    static Create(undo: () => void, redo: () => void): Action {

        const action: Action = {
            undo: undo,
            redo: redo,
        }

        return action;

    }

}