export interface IStateMachine {
    activate(): void;

    changeState(nextStateName: string): boolean;
}