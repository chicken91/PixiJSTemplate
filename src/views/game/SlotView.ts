import { Container, Sprite } from 'pixi.js'
import { viewMapping } from "../../../core/src/factory/di/inject";
import { ObjectView } from "../../../core/src/views/ObjectView";
import { BOAGameModel } from "../../models/BOAGameModel";
import { BOAGameEvents } from "../../events";

@viewMapping('slotView')
export class SlotView extends ObjectView<Container, BOAGameModel> {
    public reelViews: ObjectView<Sprite, BOAGameModel>;

    public onAdded() {
        super.onAdded();
        this.dispatcher.addListener(BOAGameEvents.InitializeGameViews, this.onInitializeGameViews, this);
    }


    public onRemoved() {
        super.onRemoved();
        this.dispatcher.removeListener(BOAGameEvents.InitializeGameViews, this.onInitializeGameViews, this);
    }

    public onInitializeGameViews() {
        this.onActivate();
    }
}
