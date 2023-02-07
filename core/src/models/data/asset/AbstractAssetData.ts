import { LoadModel } from "../../LoadModel";
import { AbstractLoaderProvider } from "../../../service/providers/AbstractLoaderProvider";
import { IBaseResource } from "../../../types/interface/IBaseResource";

export abstract class AbstractAssetData {
    public loaderProvider!: AbstractLoaderProvider;
    private _resourceData!: IBaseResource;
    protected loadModel!: LoadModel;
    protected loaded: boolean = false;
    protected size: number = 0;

    public load(): Promise<any> {
        return this.loaderProvider.load()
            .then(this.onAssetLoaded.bind(this));
    }

    public setup(resourceData: IBaseResource, loadModel: LoadModel): void {
        this._resourceData = resourceData;
        this.loadModel = loadModel;
        this.loaderProvider.prepare(this._resourceData);
        if (this._resourceData.groups) {
            this.loadModel.increaseAssetsGroupCount(this._resourceData.groups);
        }
        this.initAssetSize(resourceData);
    }

    public isLoaded(): boolean {
        return this.loaded;
    }

    public getAssetSize(): number {
        return this.size;
    }

    protected abstract initAssetSize(resourceData: IBaseResource): void;

    protected onAssetLoaded(data: any): AbstractAssetData {
        this.loaded = true;
        if (this._resourceData.groups) {
            this.loadModel.decreaseAssetsGroupCount(this._resourceData.groups);
        }
        return this;
    }

    public get resourceData(): IBaseResource {
        return this._resourceData;
    }

    public get assetType(): string {
        return this.loaderProvider.type;
    }
}