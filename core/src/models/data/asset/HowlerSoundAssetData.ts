import { IHowlerSoundResource } from "../sound/IHowlerSoundResource";
import { AbstractSoundAssetData } from "./AbstractSoundAssetData";
import { HowlerSoundProvider } from "../../../factory/HowlerSoundProvider";

export class HowlerSoundAssetData extends AbstractSoundAssetData {
    public loaderProvider!: HowlerSoundProvider;

    protected initAssetSize(resourceData: IHowlerSoundResource): void {
        this.size += this.loadModel.getSizeByUrl(resourceData.spriteUrl);
        this.size += this.loadModel.getSizeByUrl(resourceData.src[0]);
    }
}