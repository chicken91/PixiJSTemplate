export interface IAction {

    /**
     * Final method. It is deprecated to override it.
     *
     * Method to run current action. Will return the promise and resolves when finished
     *
     * @param stateInfo defines the behabior of action with such properties as {isTerminating}. This parameter
     * forwarded to the next actions
     */
    run(stateInfo: IStateInfo, callback: Function): void;

    /**
     * Final method. It is deprecated to override it.
     *
     * Method to initiate quicker terminate of the action if it is possible
     *
     */
    terminate(): void;

    /**
     * If the action is finished
     */
    finished: boolean;

    guard(stateInfo: IStateInfo): boolean;
}

export interface IStateInfo {
    isTerminating: boolean;
    nextState: string;
}