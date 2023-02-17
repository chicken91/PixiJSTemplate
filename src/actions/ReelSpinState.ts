import { IAction } from "../../core/src/actions/IAction";
import { SequenceAction } from "../../core/src/actions/SequenceAction";
import { AbstractState } from "../../core/src/actions/states/AbstractState";
import { bind } from "../../core/src/factory/di/inject";
import { StartReelSpinAction } from "./reel/StartReelSpinAction";
import { StopReelSpinAction } from "./reel/StopReelSpinAction";
import { StateType } from "../types";

@bind({singleton: true})
export class ReelSpinState extends AbstractState {
    public readonly name: string = StateType.ReelSpinState;

    protected getInitialNextState(): string {
        return StateType.IdleState;
    }

    protected initAction(): IAction {
        return new SequenceAction([
            StartReelSpinAction,
            StopReelSpinAction,
        ]);
    }
}

