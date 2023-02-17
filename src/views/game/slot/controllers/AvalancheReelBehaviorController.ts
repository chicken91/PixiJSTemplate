import { Sprite } from 'pixi.js'
import gsap from 'gsap';
import { ReelData } from "../../../../models/data/ReelData";
import { ReelState } from "../../../../types";
import { ReelView } from "../ReelView";
import { SlotConfig } from "../../../../models/config/SlotConfig";
import { IReelBehaviorController } from "./IReelBehaviorController";
import { AvalancheSymbolView } from "../AvalancheSymbolView";

export class AvalancheReelBehaviorController implements IReelBehaviorController {
    private _view: ReelView;
    private _reelData: ReelData;
    private _slotConfig: SlotConfig;
    private _symbolCashList: AvalancheSymbolView[];
    private _symbolViewList: AvalancheSymbolView[];
    private _symbolDroppingViewList: AvalancheSymbolView[];
    private _symbolDroppedViewList: AvalancheSymbolView[];
    private _topPositionY: number;
    private _bottomPositionY: number;
    private _cellHeight: number;
    private _dropSpeed: number;

    public constructor(reelView: ReelView, data: ReelData, config: SlotConfig) {
        this._view = reelView;
        this._reelData = data;
        this._slotConfig = config;
        this._symbolCashList = [];
        this._symbolViewList = [];
        this._symbolDroppingViewList = [];
        this._symbolDroppedViewList = [];

        this._cellHeight = this._slotConfig.cellSize[1];
        this._topPositionY = 0;
        this._bottomPositionY = this._reelData.config.symbolCount * this._cellHeight;
        this._dropSpeed = this._slotConfig.spinSpeed;

        this._reelData.displaySymbolIdList.forEach((symbolId, symbolIndex) => {
            const symbolView = this.getSymbolFromCash(symbolId);
            symbolView.dropCell = this._reelData.config.symbolCount + 1;
            symbolView.object.position.y = this._topPositionY + symbolIndex * this._cellHeight;
            this._symbolViewList.unshift(symbolView);
        });
    }

    public async prepareToSpin(): Promise<void> {
        this._reelData.state = ReelState.Spinning;

        const dropConfig = this._reelData.config.drop;
        const dropDelayTimeline = gsap.timeline();
        this._symbolViewList.forEach((symbolView, symbolIndex) => {
            symbolView.dropCell = this._reelData.config.symbolCount + 1;
            dropDelayTimeline.call(() => this._symbolDroppingViewList.push(symbolView), [], dropConfig.delay * symbolIndex * 0.001)
        });
        dropDelayTimeline.play();
        this._symbolViewList.length = 0;
    }

    public reelSpinning(): void {
        this.reelDropping();
        this._symbolDroppedViewList.forEach(symbolView => this.moveSymbolToCash(symbolView));
        this._symbolDroppedViewList.length = 0;
    }

    public prepareToStop(): void {
        this._reelData.state = ReelState.Stopping;

        const dropConfig = this._reelData.config.drop;
        const dropDelayTimeline = gsap.timeline();
        const symbolCount = this._reelData.displaySymbolIdList.length;
        this._reelData.displaySymbolIdList.forEach((symbolId, symbolIndex) => {
            const symbolView = this.getSymbolFromCash(symbolId);
            symbolView.dropCell = symbolIndex;
            symbolView.object.position.y = this._topPositionY + symbolIndex * this._cellHeight - symbolCount * this._cellHeight;
            dropDelayTimeline.call(() => this._symbolDroppingViewList.push(symbolView), [], dropConfig.delay * (symbolCount - symbolIndex) * 0.001);
        });
        dropDelayTimeline.play();
    }

    public reelStopping(): void {
        this.reelDropping();

        if (this._symbolDroppedViewList.length === this._reelData.displaySymbolIdList.length) {
            this._reelData.state = ReelState.Idle;
            this._symbolViewList = this._symbolDroppedViewList.slice();
            this._symbolDroppedViewList.length = 0;
            this._view.onReelStopped();
        }
    }

    private reelDropping(): void {
        this._symbolDroppingViewList.forEach(symbolView => {
            symbolView.object.y += this._dropSpeed;

            if (symbolView.object.y >= symbolView.dropCell * this._cellHeight) {
                symbolView.object.y = symbolView.dropCell * this._cellHeight;
                this._symbolDroppedViewList.push(symbolView);
            }
        });

        this._symbolDroppingViewList = this._symbolDroppingViewList
            .filter(symbolView => this._symbolDroppedViewList.indexOf(symbolView) === -1);
    }

    private getSymbolFromCash(symbolId: number): AvalancheSymbolView {
        let symbolView: AvalancheSymbolView = this._symbolCashList.find(symbol => symbol.config.id === symbolId);

        if (symbolView) {
            this._symbolCashList.splice(this._symbolCashList.indexOf(symbolView), 1);
        } else {
            symbolView = new AvalancheSymbolView(new Sprite());
            const config = this._slotConfig.symbols.find(config => config.id == symbolId);
            symbolView.Initialize(config);
        }
        this._view.object.addChild(symbolView.object);
        symbolView.object.visible = true;

        return symbolView;
    }

    private moveSymbolToCash(symbolView: AvalancheSymbolView): void {
        this._symbolCashList.push(symbolView);
        this._view.object.removeChild(symbolView.object);
    }
}
