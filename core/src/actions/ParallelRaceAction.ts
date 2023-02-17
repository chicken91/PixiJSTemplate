import { ParallelAction } from './ParallelAction';
import { GameModel } from "../models/GameModel";
import { GameConfig } from "../models/GameConfig";

export class ParallelRaceAction<M extends GameModel<GameConfig>> extends ParallelAction<M> {
    protected onActionCallback(): void {
        this.onTerminate();
        super.onActionCallback();
    }
}
