export enum ReelState {
    Idle,
    PrepareToSpin,
    BounceUp,
    Spinning,
    PrepareToStop,
    Stopping,
    BounceDown
}

export const StateType = {
    LoadState: "LoadState",
    IdleState: "IdleState",
    ReelSpinState: "ReelSpinState"
};

export const ReelBehaviorType = {
    Spin: "spin",
    Avalanche: "avalanche"
};
