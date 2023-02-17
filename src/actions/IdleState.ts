import { IAction } from "../../core/src/actions/IAction";
import { SequenceAction } from "../../core/src/actions/SequenceAction";
import { AbstractState } from "../../core/src/actions/states/AbstractState";
import { bind } from "../../core/src/factory/di/inject";
import { StateType } from "../types";
import { ParallelRaceAction } from "../../core/src/actions/ParallelRaceAction";
import { SpinButtonClickAction } from "./idle/SpinButtonClickAction";
import { EnableUIAction } from "./idle/EnableUIAction";
import { DisableUIAction } from "./idle/DisableUIAction";

@bind({singleton: true})
export class IdleState extends AbstractState {
    public readonly name: string = StateType.IdleState;

    protected getInitialNextState(): string {
        return "";
    }

    protected initAction(): IAction {
        return new SequenceAction([
            EnableUIAction,
            new ParallelRaceAction([
                SpinButtonClickAction
            ]),
            DisableUIAction
        ]);
    }
}

