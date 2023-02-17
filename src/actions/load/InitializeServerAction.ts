import { Action } from "../../../core/src/actions/Action";
import { ServerRequestType } from "../../../core/src/types/ServerRequestType";
import { CoreEvents } from "../../../core/src/types/CoreEvents";
import { ServerRequestData } from "../../../core/src/models/data/server/ServerRequestData";
import { bind } from "../../../core/src/factory/di/inject";
import { BOAGameModel } from "../../models/BOAGameModel";

@bind()
export class InitializeServerAction extends Action<BOAGameModel> {

    protected onExecute(): void {
        this.dispatcher.dispatch(CoreEvents.SERVER_REQUEST, new ServerRequestData(ServerRequestType.INIT, this.onFinish.bind(this)));
    }
}
