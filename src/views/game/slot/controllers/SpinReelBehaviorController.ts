import { Sprite } from 'pixi.js'
import gsap from 'gsap';
import { ReelData } from "../../../../models/data/ReelData";
import { SymbolView } from "../SymbolView";
import { ReelState } from "../../../../types";
import { BounceAnimationConfig } from "../../../../models/config/slot/BounceAnimationConfig";
import { ReelView } from "../ReelView";
import { SlotConfig } from "../../../../models/config/SlotConfig";
import { IReelBehaviorController } from "./IReelBehaviorController";

export class SpinReelBehaviorController implements IReelBehaviorController {
    private _view: ReelView;
    private _reelData: ReelData;
    private _slotConfig: SlotConfig;
    private _symbolCashList: SymbolView[];
    private _symbolViewList: SymbolView[];
    private _topPositionY: number;
    private _bottomPositionY: number;
    private _cellHeight: number;
    private _spinningSpeed: number;

    public constructor(reelView: ReelView, data: ReelData, config: SlotConfig) {
        this._view = reelView;
        this._reelData = data;
        this._slotConfig = config;
        this._symbolCashList = [];
        this._symbolViewList = [];

        this._cellHeight = this._slotConfig.cellSize[1];
        this._topPositionY = -this._reelData.config.extraSymbolCount * this._cellHeight;
        this._bottomPositionY = (this._reelData.config.extraSymbolCount + this._reelData.config.symbolCount) * this._cellHeight;
        this._spinningSpeed = this._slotConfig.spinSpeed;

        this._reelData.displaySymbolIdList.forEach((symbolId, symbolIndex) => {
            const symbolView = this.getSymbolFromCash(symbolId);
            symbolView.object.position.y = this._topPositionY + symbolIndex * this._cellHeight;
            this._symbolViewList.unshift(symbolView);
        });
    }

    public async prepareToSpin(): Promise<void> {
        this._reelData.state = ReelState.BounceUp;

        if (this._reelData.config.bounceUp != null)
            await this.startBounceAnimation(this._reelData.config.bounceUp);

        this._reelData.state = ReelState.Spinning;
    }

    public reelSpinning(): void {
        this._symbolViewList.forEach(symbolView => symbolView.object.y += this._spinningSpeed)

        const bottomSymbolView = this._symbolViewList[0];
        if (bottomSymbolView.object.y >= this._bottomPositionY) {
            const removeSymbolView = this._symbolViewList.shift();
            this._symbolCashList.push(removeSymbolView);

            const symbolId = this._reelData.getNextSpinSymbolId();
            const addSymbolView = this.getSymbolFromCash(symbolId);
            addSymbolView.object.y = this._symbolViewList[this._symbolViewList.length - 1].object.y - this._cellHeight;
            this._symbolViewList.push(addSymbolView);
        }
    }

    public prepareToStop(): void {
        this._reelData.state = ReelState.Stopping;
    }

    public async reelStopping(): Promise<void> {
        this.reelSpinning();

        if (!this.correctSymbolDisplay())
            return Promise.resolve();

        this._reelData.state = ReelState.BounceDown;

        this._symbolViewList.forEach((symbolView, symbolIndex) => {
            const symbolReverseIndex = this._symbolViewList.length - symbolIndex - 1;
            symbolView.object.position.y = this._topPositionY + symbolReverseIndex * this._cellHeight;
        });


        if (this._reelData.config.bounceDown != null)
            return await this.startBounceAnimation(this._reelData.config.bounceDown);

        this._reelData.state = ReelState.Idle;
        this._view.onReelStopped();
    }

    private correctSymbolDisplay(): boolean {
        return this._reelData.displaySymbolIdList.every((symbolId, symbolIndex) => {
            return this._symbolViewList[symbolIndex].config.id === symbolId;
        });
    }

    private async startBounceAnimation(bounceConfig: BounceAnimationConfig): Promise<any> {
        const upDuration = bounceConfig.duration / 2;
        let bounceUpTimeline = gsap.timeline();
        this._symbolViewList.forEach(symbolView => {
            const positionY = symbolView.object.y;
            bounceUpTimeline.to(symbolView.object,
                {y: positionY - bounceConfig.distance, duration: upDuration, ease: "none"}, 0);
            bounceUpTimeline.to(symbolView.object,
                {y: positionY, duration: upDuration, ease: "none"}, upDuration);
        });
        bounceUpTimeline.play();

        return bounceUpTimeline;
    }

    private getSymbolFromCash(symbolId: number): SymbolView {
        let symbolView: SymbolView = this._symbolCashList.find(symbol => symbol.config.id === symbolId);

        if (symbolView) {
            this._symbolCashList.splice(this._symbolCashList.indexOf(symbolView), 1);

        } else {
            symbolView = new SymbolView(new Sprite());
            const config = this._slotConfig.symbols.find(config => config.id == symbolId);
            symbolView.Initialize(config);
        }

        this._view.object.addChild(symbolView.object);
        symbolView.object.visible = true;

        return symbolView;
    }
}
