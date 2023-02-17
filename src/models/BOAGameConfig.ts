import { SlotConfig } from "./config/SlotConfig";
import { bind } from "../../core/src/factory/di/inject";
import { GameConfig } from "../../core/src/models/GameConfig";

@bind({bind: GameConfig})
export class BOAGameConfig extends GameConfig {
    public slot: SlotConfig;

    public Initialize(config: any): void {
        super.Initialize(config);
        this.slot = config.slot;
    }
}
