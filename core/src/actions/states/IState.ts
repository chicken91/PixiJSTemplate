import { IStateMachine } from "../../types/interface/IStateMachine";

export interface IState {
    name: string;

    onEnter(fsm: IStateMachine): void;

    onLeave(): Promise<any>;
}