import { SequenceAction } from './SequenceAction';

export class SequenceLoopAction extends SequenceAction {
    protected onFinish(): void {
        if (this._stateInfo.isTerminating) {
            super.onFinish();
            return;
        }

        this.currentActionPosition = 0;
        this.actionsLoop();
    }
}