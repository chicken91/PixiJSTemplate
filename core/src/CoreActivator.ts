import { CoreContext } from "./CoreContext";
import { CoreLoader } from "./CoreLoader";
import { inject } from "./factory/di/inject";
import { AbstractStateMachine } from "./actions/AbstractStateMachine";
import { LoadConfigAction } from "../../src/actions/load/LoadConfigAction";
import { DeviceUtils } from "./utils/DeviceUtils";


export class CoreActivator {

    public activate(): void {
        DeviceUtils.defineDevice();
        this.loadContext();
        this.loadConfig()           // load config and then activate state machine, cause config need to setup actions in state
            .then(this.activateStateMachine.bind(this));
    }

    protected loadConfig(): Promise<any> {
        const loadConfigAction: LoadConfigAction = inject(LoadConfigAction);
        return new Promise((resolve) => {
            loadConfigAction.run({isTerminating: false, nextState: ""}, resolve);
        });
        // return loadConfigAction.run({isTerminating: false, nextState: ""});
    }

    protected activateStateMachine(): void {
        const stateMachine: AbstractStateMachine = inject(AbstractStateMachine);
        stateMachine.activate();
    }

    protected getLoader(context: CoreContext): CoreLoader {
        return new CoreLoader(context);
    }

    protected getContext(): CoreContext {
        return new CoreContext();
    }

    private loadContext(): void {
        this.getLoader(this.getContext());
    }
}
