import { Action } from "./core/Action";
import { ServerRequestType } from "../types/ServerRequestType";
import { CoreEvents } from "../types/CoreEvents";
import { ServerRequestData } from "../models/data/ServerRequestData";
import { bind } from "../factory/di/inject";

@bind()
export class InitializeServerAction extends Action {

    protected onExecute(): void {
        this.dispatcher.dispatch(CoreEvents.SERVER_REQUEST, new ServerRequestData(ServerRequestType.INIT, this.onFinish.bind(this)));
    }
}