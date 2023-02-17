import { GameConfig } from '../../models/GameConfig';
import { inject } from '../../factory/di/inject';
import { GameModel } from "../../models/GameModel";

export abstract class SoundAction {
    private _id!: string;
    protected model: GameModel<GameConfig> = inject(GameModel);

    constructor(id: string, public type: string) {
        this._id = this.model.config.getSoundId(id) || id;
    }

    public get id(): string {
        return this._id;
    }
}
