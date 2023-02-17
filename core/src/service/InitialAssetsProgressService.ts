import { EventDispatcher } from "./EventDispatcher";
import { bind, inject } from "../factory/di/inject";
import { LoadModel } from "../models/game/LoadModel";
import { AbstractAssetData } from "../models/data/asset/AbstractAssetData";
import { CoreEvents } from "../types/CoreEvents";
import { CreationPriority } from "../factory/di/CreationPriority";

@bind({singleton: true, priority: CreationPriority.HIGH})
export class InitialAssetsProgressService {
    protected dispatcher: EventDispatcher = inject(EventDispatcher);
    protected loadModel: LoadModel = inject(LoadModel);
    protected loadedSize!: number;
    protected progress!: number;
    protected active: boolean = false;

    constructor() {
        this.dispatcher.addListener(CoreEvents.ASSET_LOADED, this.onLoadProgress, this);
        this.dispatcher.addListener(CoreEvents.INITIAL_ASSETS_START_LOADING, this.onInitialAssetStartLoading, this);
        this.dispatcher.addListener(CoreEvents.INITIAL_ASSETS_LOADED, this.onInitialAssetsLoaded, this);
    }

    protected onLoadProgress(assetData: AbstractAssetData): void {
        if (this.active) {
            this.loadedSize += assetData.getAssetSize();
            this.progress = this.loadedSize / this.loadModel.initialAssetsTotalSize;
            const fixedProgress = (this.progress * 100).toFixed(1);
            this.dispatcher.dispatch(CoreEvents.INITIAL_ASSETS_PROGRESS, this.progress);
            console.log("Loaded: " + fixedProgress + " %");
        }
    }

    protected onInitialAssetStartLoading(): void {
        this.progress = 0;
        this.loadedSize = 0;
        this.active = true;
    }

    protected onInitialAssetsLoaded(): void {
        this.active = false;
    }
}
