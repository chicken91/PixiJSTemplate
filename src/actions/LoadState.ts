import { ShowGameSceneAction } from "./load/ShowGameSceneAction";
import { IAction } from "../../core/src/actions/IAction";
import { InitialAssetsAction } from "./load/InitialAssetsAction";
import { SequenceAction } from "../../core/src/actions/SequenceAction";
import { PreloadAssetsAction } from "./load/PreloadAssetsAction";
import { AbstractState } from "../../core/src/actions/states/AbstractState";
import { bind } from "../../core/src/factory/di/inject";
import { LoadConfigAction } from "./load/LoadConfigAction";
import { InitializeSlotAction } from "./load/InitializeSlotAction";
import { StateType } from "../types";

@bind({singleton: true})
export class LoadState extends AbstractState {
    public name: string = StateType.LoadState;

    protected getInitialNextState(): string {
        return StateType.IdleState;
    }

    protected initAction(): IAction {
        return new SequenceAction([
            LoadConfigAction,
            PreloadAssetsAction,
            InitialAssetsAction,
            ShowGameSceneAction,
            InitializeSlotAction
        ]);
    }
}
