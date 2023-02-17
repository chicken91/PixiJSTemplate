import { ReelConfig } from "../config/slot/ReelConfig";
import { ReelState } from "../../types";
import { MathUtils } from "../../../core/src/utils/MathUtils";

export class ReelData {
    public id: number;
    public config: ReelConfig;
    public stopSymbolIdList: number[] = [];
    public spinSymbolIdList: number[] = [];
    public displaySymbolIdList: number[] = [];
    public state: ReelState = ReelState.Idle;
    public spinSymbolIndex: number = 0;

    constructor(id: number, config: ReelConfig) {
        this.id = id;
        this.config = config;
        this.stopSymbolIdList = config.initialSymbols.slice();
    }

    public setupDisplaySymbolIdList(extraSymbolOnTop = 0): void {
        this.displaySymbolIdList.length = 0;

        for (let symbolIndex = 0; symbolIndex < this.config.extraSymbolCount! + extraSymbolOnTop; symbolIndex++)
            this.displaySymbolIdList.push(MathUtils.getRandomInRange(0, 9));

        this.stopSymbolIdList.forEach(symbolId => this.displaySymbolIdList.push(symbolId))

        for (let symbolIndex = 0; symbolIndex < this.config.extraSymbolCount!; symbolIndex++)
            this.displaySymbolIdList.push(MathUtils.getRandomInRange(0, 9));
    }

    public getNextSpinSymbolId(): number {
        if (this.spinSymbolIndex >= this.spinSymbolIdList.length - 1)
            this.spinSymbolIndex = 0;
        else
            this.spinSymbolIndex++;

        return this.spinSymbolIdList[this.spinSymbolIndex];
    }
}

