import { SequenceAction } from './SequenceAction';
import { GameModel } from "../models/GameModel";
import { GameConfig } from "../models/GameConfig";

export class SequenceLoopAction<M extends GameModel<GameConfig>> extends SequenceAction<M> {
    protected onFinish(): void {
        if (this._stateInfo.isTerminating) {
            super.onFinish();
            return;
        }

        this.currentActionPosition = 0;
        this.actionsLoop();
    }
}
