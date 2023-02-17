import { bind } from "../../../core/src/factory/di/inject";
import { Action } from "../../../core/src/actions/Action";
import { BOAGameModel } from "../../models/BOAGameModel";
import { StateType } from "../../types";
import { BOAGameEvents } from "../../events";

@bind({singleton: true})
export class SpinButtonClickAction extends Action<BOAGameModel> {

    protected onExecute(): void {
        this.addListener(BOAGameEvents.OnSpinButtonClick, this.OnSpinButtonClick)
    }


    private OnSpinButtonClick(): void {
        this._stateInfo.nextState = StateType.ReelSpinState;
        this.onFinish();
    }
}
