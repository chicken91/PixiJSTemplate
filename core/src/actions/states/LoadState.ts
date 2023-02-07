import { ShowGameSceneAction } from "../ShowGameSceneAction";
import { HideLoadSceneAction } from "../HideLoadSceneAction";
import { LazyAssetsAction } from "../LazyAssetsAction";
import { IAction } from "../core/IAction";
import { InitialAssetsAction } from "../InitialAssetsAction";
import { StateType } from "../../types/StateType";
import { ShowLoadSceneAction } from "../ShowLoadSceneAction";
import { SequenceAction } from "../core/SequenceAction";
import { PreloadAssetsAction } from "../PreloadAssetsAction";
import { AbstractState } from "./AbstractState";
import { bind } from "../../factory/di/inject";

@bind({singleton: true})
export class LoadState extends AbstractState {
    public name: string = StateType.LoadState;

    protected getInitialNextState(): string {
        return StateType.IdleState;
    }

    protected initAction(): IAction {
        return new SequenceAction([
            ShowGameSceneAction
        ]);
    }
}