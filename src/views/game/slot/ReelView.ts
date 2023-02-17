import { Container } from 'pixi.js'
import { viewMapping } from "../../../../core/src/factory/di/inject";
import { ObjectView } from "../../../../core/src/views/ObjectView";
import { ReelData } from "../../../models/data/ReelData";
import { BOAGameModel } from "../../../models/BOAGameModel";
import { BOAGameEvents } from "../../../events";
import { ReelBehaviorType, ReelState } from "../../../types";
import { CoreEvents } from "../../../../core/src/types/CoreEvents";
import { SpinReelBehaviorController } from "./controllers/SpinReelBehaviorController";
import { IReelBehaviorController } from "./controllers/IReelBehaviorController";
import { AvalancheReelBehaviorController } from "./controllers/AvalancheReelBehaviorController";

@viewMapping('reelView')
export class ReelView extends ObjectView<Container, BOAGameModel> {
    private _reelData: ReelData;
    private behaviorController: IReelBehaviorController;

    public reelId: number;

    public onAdded() {
        super.onAdded();
        this.dispatcher.addListener(BOAGameEvents.InitializeReelViews, this.onInitialize, this);
        this.dispatcher.addListener(CoreEvents.ON_RENDER, this.onRender, this);
    }

    public onRemoved() {
        this.dispatcher.removeListener(BOAGameEvents.InitializeReelViews, this.onInitialize, this);
        super.onRemoved();
    }

    public onInitialize(): void {
        this._reelData = this.model.slot.reels[this.reelId];
        this._reelData.state = ReelState.Idle;
        this.behaviorController = this.getReelBehaviorController(this.model.config.slot.behavior);
    }

    public onRender() {
        switch (this._reelData.state) {
            case ReelState.Idle:
                break;
            case ReelState.PrepareToSpin:
                this.behaviorController.prepareToSpin();
                break;
            case ReelState.BounceUp:
                break;
            case ReelState.Spinning:
                this.behaviorController.reelSpinning();
                break;
            case ReelState.PrepareToStop:
                this.behaviorController.prepareToStop();
                break;
            case ReelState.Stopping:
                this.behaviorController.reelStopping();
                break;
            case ReelState.BounceDown:
                break;
        }
    }

    public onReelStopped(): void {
        this.dispatcher.dispatch(BOAGameEvents.ReelStopped, this.reelId);
    }

    private getReelBehaviorController(behavior: string): IReelBehaviorController {
        switch (behavior) {
            case ReelBehaviorType.Spin:
                return new SpinReelBehaviorController(this, this._reelData, this.model.config.slot);
            case ReelBehaviorType.Avalanche:
                return new AvalancheReelBehaviorController(this, this._reelData, this.model.config.slot);
            default:
                return new SpinReelBehaviorController(this, this._reelData, this.model.config.slot);
        }
    }
}
