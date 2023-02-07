import { Action } from "./core/Action";
import { CoreEvents } from "../types/CoreEvents";
import { CoreConstants } from '../types/constant/CoreConstants';
import { bind } from "../factory/di/inject";

@bind({singleton: true})
export class ShowGameSceneAction extends Action {

    protected onExecute(): void {
        this.initSceneData();
        this.addScene();
        this.updateSceneComponents();
        this.onFinish();
    }

    protected initSceneData(): void {
        this.dispatcher.dispatch(CoreEvents.INIT_SCENE_DATA);
    }

    protected addScene(): void {
        this.dispatcher.dispatch(CoreEvents.ADD_SCENE, CoreConstants.scenes.gameScene);
    }

    protected updateSceneComponents(): void {

    }
}