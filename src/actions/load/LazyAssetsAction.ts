import { EventDispatcher } from "../../../core/src/service/EventDispatcher";
import { bind, inject } from "../../../core/src/factory/di/inject";
import { LoadService } from "../../../core/src/service/LoadService";
import { LoadModel } from "../../../core/src/models/game/LoadModel";
import { AbstractAssetData } from "../../../core/src/models/data/asset/AbstractAssetData";
import { Action } from "../../../core/src/actions/Action";
import { CoreEvents } from "../../../core/src/types/CoreEvents";
import { BOAGameModel } from "../../models/BOAGameModel";

@bind({singleton: true})
export class LazyAssetsAction extends Action<BOAGameModel> {
    protected dispatcher: EventDispatcher = inject(EventDispatcher);
    protected loadManager: LoadService = inject(LoadService);
    protected loadModel: LoadModel = inject(LoadModel);

    protected onExecute(): void {
        const assetList: Array<AbstractAssetData> = this.loadModel.getNotLoadedAssets();
        this.loadManager.loadAssets(assetList)
            .then(this.onLazyAssetsLoaded.bind(this));
        this.onFinish();
    }

    protected onLazyAssetsLoaded(): void {
        this.loadModel.onLazyAssetsLoaded();
        this.dispatcher.dispatch(CoreEvents.LAZY_ASSETS_LOADED);
    }
}
