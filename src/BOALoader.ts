import { CoreLoader } from "../core/src/CoreLoader";
import { GameView } from "./views/GameView";
import { BOAGameModel } from "./models/BOAGameModel";
import { LoadState } from "./actions/LoadState";
import { IdleState } from "./actions/IdleState";
import { LoadConfigAction } from "./actions/load/LoadConfigAction";
import { PreloadAssetsAction } from "./actions/load/PreloadAssetsAction";
import { InitialAssetsAction } from "./actions/load/InitialAssetsAction";
import { LazyAssetsAction } from "./actions/load/LazyAssetsAction";
import { ShowGameSceneAction } from "./actions/load/ShowGameSceneAction";
import { ShowLoadSceneAction } from "./actions/load/ShowLoadSceneAction";
import { HideLoadSceneAction } from "./actions/load/HideLoadSceneAction";
import { BOAStateMachine } from "./actions/BOAStateMachine";
import { InitializeSlotAction } from "./actions/load/InitializeSlotAction";
import { SlotView } from "./views/game/SlotView";
import { BOAGameConfig } from "./models/BOAGameConfig";
import { ReelView } from "./views/game/slot/ReelView";
import { StartReelSpinAction } from "./actions/reel/StartReelSpinAction";
import { StopReelSpinAction } from "./actions/reel/StopReelSpinAction";
import { ReelSpinState } from "./actions/ReelSpinState";
import { SpinButtonView } from "./views/game/ui/SpinButtonView";
import { SpinButtonClickAction } from "./actions/idle/SpinButtonClickAction";
import { EnableUIAction } from "./actions/idle/EnableUIAction";
import { DisableUIAction } from "./actions/idle/DisableUIAction";

export class BOALoader extends CoreLoader {

    protected getBindedClasses(): Array<Function> {
        const bindedClasses = super.getBindedClasses();
        bindedClasses.push(...[
            BOAGameModel,
            BOAGameConfig,
            LoadConfigAction,
            PreloadAssetsAction,
            InitialAssetsAction,
            LazyAssetsAction,
            ShowGameSceneAction,
            ShowLoadSceneAction,
            HideLoadSceneAction,
            InitializeSlotAction,
            StartReelSpinAction,
            StopReelSpinAction,
            SpinButtonClickAction,
            EnableUIAction,
            DisableUIAction,
            LoadState,
            IdleState,
            ReelSpinState,
            BOAStateMachine
        ]);
        return bindedClasses;
    }

    protected getViewMappingClasses(): Array<Function> {
        const bindedClasses = super.getViewMappingClasses();
        bindedClasses.push(...[
            GameView,
            SlotView,
            ReelView,
            SpinButtonView
        ]);
        return bindedClasses;
    }
}
