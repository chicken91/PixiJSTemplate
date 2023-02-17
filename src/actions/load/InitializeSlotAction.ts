import { bind } from "../../../core/src/factory/di/inject";
import { Action } from "../../../core/src/actions/Action";
import { BOAGameModel } from "../../models/BOAGameModel";
import { ReelData } from "../../models/data/ReelData";
import { BOAGameEvents } from "../../events";

@bind({singleton: true})
export class InitializeSlotAction extends Action<BOAGameModel> {

    protected onExecute(): void {
        this.model.config.slot.reels.forEach((reelConfig, reelIndex) => {
            const reelData = new ReelData(reelIndex, reelConfig);
            reelData.setupDisplaySymbolIdList();
            this.model.slot.reels.push(reelData);
        });

        this.dispatcher.dispatch(BOAGameEvents.InitializeReelViews);
        this.dispatcher.dispatch(BOAGameEvents.InitializeGameViews);

        this.onFinish();
    }
}
