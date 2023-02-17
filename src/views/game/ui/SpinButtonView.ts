import { viewMapping } from "../../../../core/src/factory/di/inject";
import { ButtonView } from "../../../../core/src/views/ButtonView";
import { ButtonEventType } from "../../../../core/src/types/ButtonEventType";
import { BOAGameEvents } from "../../../events";
import { ButtonViewType } from "../../../../core/src/types/ButtonViewType";

@viewMapping('spinButtonView')
export class SpinButtonView extends ButtonView {
    public spinButton: ButtonView;

    public onAdded() {
        super.onAdded();
        this.spinButton.addButtonEvent(ButtonEventType.CLICK, this.onSpinButtonClick, this);
        this.dispatcher.addListener(BOAGameEvents.EnableUI, this.onEnableUI, this);
        this.dispatcher.addListener(BOAGameEvents.DisableUI, this.onDisableUI, this);
    }

    public onRemoved() {
        this.dispatcher.removeListener(BOAGameEvents.EnableUI, this.onEnableUI, this);
        this.dispatcher.removeListener(BOAGameEvents.DisableUI, this.onDisableUI, this);
        super.onRemoved();
    }

    private onSpinButtonClick() {
        this.dispatcher.dispatch(BOAGameEvents.OnSpinButtonClick);
    }

    private onEnableUI() {
        this.spinButton.changeState(ButtonViewType.NORMAL, true);
    }

    private onDisableUI() {
        this.spinButton.changeState(ButtonViewType.DISABLE);
    }
}
