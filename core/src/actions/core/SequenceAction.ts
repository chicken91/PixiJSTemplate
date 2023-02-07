import { ManagingAction } from './ManagingAction';
import { IAction } from './IAction';

export class SequenceAction extends ManagingAction {
    protected currentAction!: IAction;
    protected currentActionPosition: number = 0;

    protected onExecute(): void {
        this.currentActionPosition = 0;
        this.actionsLoop();
    }

    protected actionsLoop(): void {
        this.currentAction = this._actions[this.currentActionPosition++];

        if (!this.currentAction) {
            this.onFinish();
        } else if (!this.currentAction.guard(this._stateInfo)) {
            this.actionsLoop();
        } else {
            this.currentAction.run(this._stateInfo, this.actionsLoop.bind(this));
        }
    }

    protected onTerminate(): void {
        if (this.currentAction) {
            this.currentAction.terminate();
        }
    }
}