import { bind } from "../../../core/src/factory/di/inject";
import { Action } from "../../../core/src/actions/Action";
import { BOAGameModel } from "../../models/BOAGameModel";
import { ReelState } from "../../types";
import { MathUtils } from "../../../core/src/utils/MathUtils";

@bind({singleton: true})
export class StartReelSpinAction extends Action<BOAGameModel> {

    protected async onExecute(): Promise<void> {
        this.model.slot.reels.forEach((reelData, reelIndex) => {
            reelData.spinSymbolIdList = this.generateSpinSymbolIdList();
            setTimeout(() => reelData.state = ReelState.PrepareToSpin, this.model.config.slot.startSpinDelay * reelIndex)
        });

        await this.delay(this.model.config.slot.spinTime);

        this.onFinish();
    }

    public generateSpinSymbolIdList(): number[] {
        const size = 30;
        const list = [];
        for (let symbolIndex = 0; symbolIndex < size; symbolIndex++)
            list.push(MathUtils.getRandomInRange(0, 9));
        return list;
    }

    private delay(time: number): Promise<any> {
        return new Promise(resolve => setTimeout(resolve, time));
    }
}
