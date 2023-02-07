import { GameConfig } from "./GameConfig";
import { AbstractModel } from "./AbstractModel";
import { bind } from "../factory/di/inject";

@bind({singleton: true})
export abstract class GameModel extends AbstractModel {
    protected _gameConfig!: GameConfig;

    public initialize(gameConfig: GameConfig): void {
        this._gameConfig = gameConfig;
    }

    public getGameConfig(): GameConfig {
        return this._gameConfig;
    }
}