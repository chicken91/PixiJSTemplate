import { AssetsGroupData } from "./data/asset/AssetsGroupData";
import { IResources } from "../types/interface/IResources";
import { IBaseResource } from "../types/interface/IBaseResource";
import { AbstractAssetData } from "./data/asset/AbstractAssetData";
import { bind } from "../factory/di/inject";

@bind({singleton: true})
export class LoadModel {
    private _resourceData!: IResources;
    private _resourceMap: { [resourceId: string]: IBaseResource } = {};
    private _sizeReportData!: { [fileName: string]: number };
    private _assetsPool: Array<AbstractAssetData> = [];
    private _groupAssetDataMap: { [groupKey: string]: AssetsGroupData } = {};
    private _lazyAssetsLoaded: boolean = false;
    private _initialAssetsTotalSize: number = 0;

    public getResourcesByType(type: string): Array<IBaseResource> {
        return this._resourceData.resources[type];
    }

    public getResourceTypes(): Array<string> {
        return Object.keys(this._resourceData.resources);
    }

    public addResourceData(resource: IBaseResource): void {
        this._resourceMap[resource.id] = resource;
    }

    public getResourceById(resourceId: string): IBaseResource {
        return this._resourceMap[resourceId];
    }

    public getSizeByUrl(fileUrl: string): number {
        let startFileIndex: number = fileUrl.lastIndexOf('/');
        let fileName: string = fileUrl.substring(startFileIndex + 1);

        let size: number = this._sizeReportData[fileName];
        if (size) {
            return size;
        } else {
            console.error("No file in size-report with url: " + fileUrl);
            return 0;
        }

    }

    public addAssetData(asset: AbstractAssetData): void {
        this._assetsPool.push(asset);
    }

    public getNotLoadedAssetsByGroup(assetsGroup: string): Array<AbstractAssetData> {
        let assetDataList: Array<AbstractAssetData> = [];
        for (let assetData of this._assetsPool) {
            if (!assetData.isLoaded()
                && assetData.resourceData.groups
                && assetData.resourceData.groups.indexOf(assetsGroup) !== -1) {
                assetDataList.push(assetData);
            }
        }
        return assetDataList;
    }

    public getAssetsByGroup(assetsGroup: string): Array<AbstractAssetData> {
        let assetDataList: Array<AbstractAssetData> = [];
        for (let assetData of this._assetsPool) {
            if (assetData.resourceData.groups && assetData.resourceData.groups.indexOf(assetsGroup) !== -1) {
                assetDataList.push(assetData);
            }
        }
        return assetDataList;
    }

    public getNotLoadedAssets(): Array<AbstractAssetData> {
        let assetDataList: Array<AbstractAssetData> = [];
        for (let assetData of this._assetsPool) {
            if (!assetData.isLoaded()) {
                assetDataList.push(assetData);
            }
        }
        return assetDataList;
    }

    public isLazyAssetsLoaded(): boolean {
        return this._lazyAssetsLoaded;
    }

    public onLazyAssetsLoaded(): void {
        this._lazyAssetsLoaded = true;
    }

    public isAssetsGroupLoaded(group: string): boolean {
        let assetsGroupData: AssetsGroupData = this._groupAssetDataMap[group];
        return assetsGroupData && assetsGroupData.isGroupLoaded();
    }

    public onAssetsGroupLoaded(group: string, callback: Function) {
        if (this.isAssetsGroupLoaded(group)) {
            callback();
        } else {
            let assetsGroupData: AssetsGroupData = this._groupAssetDataMap[group];
            if (assetsGroupData) {
                assetsGroupData.addLoadCallback(callback);
            }
        }
    }

    public increaseAssetsGroupCount(groups: Array<string>): void {
        for (let group of groups) {
            if (this._groupAssetDataMap[group] == null) {
                this._groupAssetDataMap[group] = new AssetsGroupData();
            }
            this._groupAssetDataMap[group].increaseAssetsCount();
        }
    }

    public decreaseAssetsGroupCount(groups: Array<string>): void {
        for (let group of groups) {
            let assetsGroupData: AssetsGroupData = this._groupAssetDataMap[group];
            if (assetsGroupData) {
                assetsGroupData.decreaseAssetsCount();
            }
        }
    }

    public set resourceData(value: IResources) {
        this._resourceData = value;
    }

    public set sizeReportData(value: { [p: string]: number }) {
        this._sizeReportData = value;
    }


    public get initialAssetsTotalSize(): number {
        return this._initialAssetsTotalSize;
    }

    public set initialAssetsTotalSize(value: number) {
        this._initialAssetsTotalSize = value;
    }
}
