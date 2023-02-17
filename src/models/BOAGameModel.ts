import { GameModel } from "../../core/src/models/GameModel";
import { bind } from "../../core/src/factory/di/inject";
import { SlotData } from "./data/SlotData";
import { BOAGameConfig } from "./BOAGameConfig";

@bind({bind: GameModel})
export class BOAGameModel extends GameModel<BOAGameConfig> {
    public slot: SlotData = new SlotData();
}
