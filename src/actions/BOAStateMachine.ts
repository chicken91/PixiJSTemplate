import { AbstractStateMachine } from "../../core/src/actions/AbstractStateMachine";
import { IStateMachineOptions } from "../../core/src/types/interface/CoreTypes";
import { LoadState } from "./LoadState";
import { IdleState } from "./IdleState";
import { bind } from "../../core/src/factory/di/inject";
import { ReelSpinState } from "./ReelSpinState";

@bind({bind: AbstractStateMachine})
export class BOAStateMachine extends AbstractStateMachine {

    protected getStateMachineOptions(): IStateMachineOptions {
        return {
            initialState: LoadState,
            transitions: [
                {from: [LoadState, ReelSpinState], to: IdleState},
                {from: [IdleState, ReelSpinState], to: ReelSpinState}
            ],
        };
    }
}
