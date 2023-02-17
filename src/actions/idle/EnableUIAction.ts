import { bind } from "../../../core/src/factory/di/inject";
import { Action } from "../../../core/src/actions/Action";
import { BOAGameModel } from "../../models/BOAGameModel";
import { BOAGameEvents } from "../../events";

@bind({singleton: true})
export class EnableUIAction extends Action<BOAGameModel> {

    protected onExecute(): void {
        this.dispatcher.dispatch(BOAGameEvents.EnableUI)
        this.onFinish();
    }
}
