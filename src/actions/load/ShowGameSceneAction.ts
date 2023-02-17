import { Action } from "../../../core/src/actions/Action";
import { CoreEvents } from "../../../core/src/types/CoreEvents";
import { CoreConstants } from '../../../core/src/types/constant/CoreConstants';
import { bind } from "../../../core/src/factory/di/inject";
import { BOAGameModel } from "../../models/BOAGameModel";

@bind({singleton: true})
export class ShowGameSceneAction extends Action<BOAGameModel> {

    protected onExecute(): void {
        this.dispatcher.dispatch(CoreEvents.ADD_SCENE, CoreConstants.scenes.gameScene);

        this.onFinish();
    }
}
