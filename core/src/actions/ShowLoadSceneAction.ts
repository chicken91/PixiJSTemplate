import { Action } from "./core/Action";
import { CoreEvents } from "../types/CoreEvents";
import { bind } from "../factory/di/inject";

@bind({singleton: true})
export class ShowLoadSceneAction extends Action {

    protected onExecute(): void {
        this.dispatcher.dispatch(CoreEvents.ADD_SCENE, `loadScene`);
        setTimeout(() => this.onFinish(), 450);
    }
}