import { GameConfig } from '../../models/GameConfig';
import { inject } from '../../factory/di/inject';

export abstract class SoundAction {
    protected gameConfig: GameConfig = inject(GameConfig);
    private _id!: string;

    constructor(id: string, public type: string) {
        this._id = this.gameConfig.getSoundId(id) || id;
    }

    public get id(): string {
        return this._id;
    }
}