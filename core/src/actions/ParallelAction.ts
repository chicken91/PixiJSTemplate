import { ManagingAction } from './ManagingAction';
import { IAction } from './IAction';
import { GameModel } from "../models/GameModel";
import { GameConfig } from "../models/GameConfig";

export class ParallelAction<M extends GameModel<GameConfig>> extends ManagingAction<M> {
    protected _isTerminating: boolean = false;
    protected _guardedActions!: IAction[];
    protected _completeActions: number = 0;

    protected onExecute(): void {
        this._isTerminating = false;

        this._guardedActions = this._actions.filter(action => {
            return action.guard(this._stateInfo);
        });
        this._completeActions = 0;
        this._guardedActions.forEach(action => {
            action.run(this._stateInfo, this.onActionCallback.bind(this));
        });
    }

    protected onActionCallback(): void {
        this._completeActions++;
        if (this._completeActions === this._guardedActions.length) {
            this.onFinish();
        }
    }

    protected onTerminate(): void {
        if (!this._isTerminating) {
            this._isTerminating = true;
            this._guardedActions.forEach(action => {
                action.terminate();
            });
        }
    }
}
