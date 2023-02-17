import { AbstractAssetData } from "../models/data/asset/AbstractAssetData";
import { AssetsType } from "../types/AssetsType";
import { ImageAssetData } from "../models/data/asset/ImageAssetData";
import { AbstractSoundAssetData } from "../models/data/asset/AbstractSoundAssetData";
import { HowlerSoundAssetData } from "../models/data/asset/HowlerSoundAssetData";
import { FontAssetData } from '../models/data/asset/FontAssetData';
import { bind } from "./di/inject";

@bind({singleton: true})
export class AssetDataFactory {
    public createAssetDataByType(assetType: string): AbstractAssetData {
        switch (assetType) {
            case AssetsType.IMAGES:
                return this.createImageAssetData();
            case AssetsType.SOUNDS:
                return this.createSoundAssetData();
            case AssetsType.FONTS:
                return this.createFontAssetData();
            default:
                throw new Error("You are trying create asset with missing type [" + assetType + "]");

        }
    }

    protected createSoundAssetData(): AbstractSoundAssetData {
        return new HowlerSoundAssetData();
    }

    protected createImageAssetData(): ImageAssetData {
        return new ImageAssetData();
    }

    protected createFontAssetData(): FontAssetData {
        return new FontAssetData();
    }
}
