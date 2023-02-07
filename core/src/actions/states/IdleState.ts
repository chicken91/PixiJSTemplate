import { StateType } from "../../types/StateType";
import { IAction } from "../core/IAction";
import { SequenceAction } from "../core/SequenceAction";
import { AbstractState } from "./AbstractState";
import { bind } from "../../factory/di/inject";

@bind({singleton: true})
export class IdleState extends AbstractState {
    public readonly name: string = StateType.IdleState;

    protected getInitialNextState(): string {
        return "";
    }

    protected initAction(): IAction {
        return new SequenceAction([]);
    }
}

