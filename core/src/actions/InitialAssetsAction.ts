import { EventDispatcher } from "../service/EventDispatcher";
import { bind, inject } from "../factory/di/inject";
import { LoadService } from "../service/LoadService";
import { AssetsGroup } from "../types/AssetsGroup";
import { AbstractAssetData } from "../models/data/asset/AbstractAssetData";
import { LoadModel } from "../models/LoadModel";
import { Action } from "./core/Action";
import { CoreEvents } from "../types/CoreEvents";

@bind({singleton: true})
export class InitialAssetsAction extends Action {
    protected dispatcher: EventDispatcher = inject(EventDispatcher);
    protected loadManager: LoadService = inject(LoadService);
    protected loadModel: LoadModel = inject(LoadModel);

    protected onExecute(): void {
        this.dispatcher.dispatch(CoreEvents.INITIAL_ASSETS_START_LOADING);
        let assetList: Array<AbstractAssetData> = this.loadModel.getNotLoadedAssetsByGroup(AssetsGroup.INITIAL);
        this.calculateInitialAssetsSize(assetList);
        this.loadManager.loadAssets(assetList)
            .then(this.onInitialAssetsLoaded.bind(this));
    }

    protected calculateInitialAssetsSize(assetDataList: Array<AbstractAssetData>): void {
        let totalInitialAssetsSize: number = 0;
        for (let assetData of assetDataList) {
            totalInitialAssetsSize += assetData.getAssetSize();
        }
        this.loadModel.initialAssetsTotalSize = totalInitialAssetsSize;
    }

    protected onInitialAssetsLoaded(): void {
        this.dispatcher.dispatch(CoreEvents.INITIAL_ASSETS_LOADED);
        this.onFinish();
    }
}