import { Action } from './Action';
import { IAction } from './IAction';
import { inject } from "../../factory/di/inject";

export abstract class ManagingAction extends Action {
    protected _actions: IAction[] = [];

    constructor(actions: IAction[] | Function[] | (IAction | Function)[]) {
        super();

        for (let i: number = 0; i < actions.length; i++) {
            const action = actions[i];
            if (action instanceof Function) {
                this._actions.push(inject(action));
            } else {
                this._actions.push(action);
            }
        }
    }
}