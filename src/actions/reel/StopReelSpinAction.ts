import { bind } from "../../../core/src/factory/di/inject";
import { Action } from "../../../core/src/actions/Action";
import { BOAGameModel } from "../../models/BOAGameModel";
import { BOAGameEvents } from "../../events";
import { ReelState } from "../../types";
import { MathUtils } from "../../../core/src/utils/MathUtils";
import { ReelData } from "../../models/data/ReelData";

@bind({singleton: true})
export class StopReelSpinAction extends Action<BOAGameModel> {

    protected onExecute(): void {
        this.model.slot.reels.forEach((reelData, reelIndex) => {
            setTimeout(() => {
                reelData.stopSymbolIdList = this.generateStopSymbolIdList(reelData);
                reelData.setupDisplaySymbolIdList();
                reelData.spinSymbolIdList = reelData.displaySymbolIdList.slice();
                reelData.state = ReelState.PrepareToStop;
            }, this.model.config.slot.stopSpinDelay * reelIndex);
        });

        this.addListener(BOAGameEvents.ReelStopped, this.onReelStopped);
    }

    private onReelStopped(reelId: number): void {
        if (this.model.slot.reels.every(reelData => reelData.state === ReelState.Idle))
            this.onFinish()
    }

    private generateStopSymbolIdList(reelData: ReelData): number[] {
        const list = [];
        for (let symbolIndex = 0; symbolIndex < reelData.config.symbolCount; symbolIndex++)
            list.push(MathUtils.getRandomInRange(0, 9));
        return list;
    }
}
