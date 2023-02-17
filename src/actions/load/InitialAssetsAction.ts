import { EventDispatcher } from "../../../core/src/service/EventDispatcher";
import { bind, inject } from "../../../core/src/factory/di/inject";
import { LoadService } from "../../../core/src/service/LoadService";
import { AssetsGroup } from "../../../core/src/types/AssetsGroup";
import { AbstractAssetData } from "../../../core/src/models/data/asset/AbstractAssetData";
import { LoadModel } from "../../../core/src/models/game/LoadModel";
import { Action } from "../../../core/src/actions/Action";
import { CoreEvents } from "../../../core/src/types/CoreEvents";
import { BOAGameModel } from "../../models/BOAGameModel";

@bind({singleton: true})
export class InitialAssetsAction extends Action<BOAGameModel> {
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
