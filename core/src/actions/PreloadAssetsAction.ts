import { EventDispatcher } from "../service/EventDispatcher";
import { bind, inject } from "../factory/di/inject";
import { LoadService } from "../service/LoadService";
import { AssetsGroup } from "../types/AssetsGroup";
import { AbstractAssetData } from "../models/data/asset/AbstractAssetData";
import { LoadModel } from "../models/LoadModel";
import { Action } from "./core/Action";
import { CoreEvents } from "../types/CoreEvents";

@bind({singleton: true})
export class PreloadAssetsAction extends Action {
    protected dispatcher: EventDispatcher = inject(EventDispatcher);
    protected loadManager: LoadService = inject(LoadService);
    protected loadModel: LoadModel = inject(LoadModel);

    protected onExecute(): void {
        this.loadManager.initAssetsPool();

        let assetList: Array<AbstractAssetData> = this.loadModel.getNotLoadedAssetsByGroup(AssetsGroup.PRELOAD);
        this.loadManager.loadAssets(assetList)
            .then(this.onPreloadAssetsLoaded.bind(this));
    }

    protected onPreloadAssetsLoaded(): void {
        this.dispatcher.dispatch(CoreEvents.PRELOAD_ASSETS_LOADED);
        this.onFinish();
    }
}