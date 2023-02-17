import { Action } from "../../../core/src/actions/Action";
import { CoreEvents } from "../../../core/src/types/CoreEvents";
import { bind } from "../../../core/src/factory/di/inject";
import { BOAGameModel } from "../../models/BOAGameModel";

@bind({singleton: true})
export class HideLoadSceneAction extends Action<BOAGameModel> {
    protected onExecute(): void {
        this.dispatcher.dispatch(CoreEvents.LOAD_SCENE_CLOSE, this.onFinish.bind(this));
    }
}
