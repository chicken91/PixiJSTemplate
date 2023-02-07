import { Action } from "./core/Action";
import { CoreEvents } from "../types/CoreEvents";
import { bind } from "../factory/di/inject";

@bind({singleton: true})
export class HideLoadSceneAction extends Action {
    protected onExecute(): void {
        this.dispatcher.dispatch(CoreEvents.LOAD_SCENE_CLOSE, this.onFinish.bind(this));
    }
}