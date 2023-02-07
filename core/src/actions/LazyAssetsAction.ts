import { EventDispatcher } from "../service/EventDispatcher";
import { bind, inject } from "../factory/di/inject";
import { LoadService } from "../service/LoadService";
import { LoadModel } from "../models/LoadModel";
import { AbstractAssetData } from "../models/data/asset/AbstractAssetData";
import { Action } from "./core/Action";
import { CoreEvents } from "../types/CoreEvents";

@bind({singleton: true})
export class LazyAssetsAction extends Action {
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