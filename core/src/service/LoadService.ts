import { EventDispatcher } from "./EventDispatcher";
import { bind, inject } from "../factory/di/inject";
import { LoadModel } from "../models/LoadModel";
import { AbstractAssetData } from "../models/data/asset/AbstractAssetData";
import { IBaseResource } from "../types/interface/IBaseResource";
import { AssetDataFactory } from "../models/data/asset/AssetDataFactory";
import { CoreEvents } from "../types/CoreEvents";
import { CreationPriority } from "../factory/di/CreationPriority";

@bind({singleton: true, priority: CreationPriority.HIGH})
export class LoadService {
    protected dispatcher: EventDispatcher = inject(EventDispatcher);
    protected loadModel: LoadModel = inject(LoadModel);
    protected assetDataFactory: AssetDataFactory = inject(AssetDataFactory);

    /**
     * Create asset data for each load component and store it in asset pool
     */
    public initAssetsPool(): void {
        for (let resourceKey of this.loadModel.getResourceTypes()) {
            let assetResourceList: Array<IBaseResource> = this.loadModel.getResourcesByType(resourceKey);
            for (let resource of assetResourceList) {
                this.addAssetData(resourceKey, resource);
            }
        }
    }

    public addAssetData(resourceKey, resource: IBaseResource): void {
        let assetData: AbstractAssetData = this.assetDataFactory.createAssetDataByType(resourceKey);
        assetData.setup(resource, this.loadModel);
        this.loadModel.addAssetData(assetData);
        this.loadModel.addResourceData(resource);
    }

    public loadAssets(assetDataList: Array<AbstractAssetData>): Promise<any> {
        let loadPromiseList: Array<Promise<any>> = [];
        for (let assetData of assetDataList) {
            let loadChainPromise = assetData.load().then(this.onAssetLoaded.bind(this));
            loadPromiseList.push(loadChainPromise);
        }
        return Promise.all(loadPromiseList);
    }

    protected onAssetLoaded(assetData: AbstractAssetData): void {
        this.dispatcher.dispatch(CoreEvents.ASSET_LOADED, assetData);
    }
}
