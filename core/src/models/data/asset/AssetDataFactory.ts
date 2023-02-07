import { AbstractAssetData } from "./AbstractAssetData";
import { AssetsType } from "../../../types/AssetsType";
import { ImageAssetData } from "./ImageAssetData";
import { AbstractSoundAssetData } from "./AbstractSoundAssetData";
import { HowlerSoundAssetData } from "./HowlerSoundAssetData";
import { FontAssetData } from './FontAssetData';
import { bind } from "../../../factory/di/inject";

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