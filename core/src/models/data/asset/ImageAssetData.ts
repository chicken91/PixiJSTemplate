import { AbstractAssetData } from "./AbstractAssetData";
import { ImageProvider } from "../../../service/providers/ImageProvider";
import { inject } from "../../../factory/di/inject";
import { IImageResource } from "../../../types/interface/IImageResource";

export class ImageAssetData extends AbstractAssetData {
    public loaderProvider: ImageProvider = inject(ImageProvider);

    protected initAssetSize(resourceData: IImageResource): void {
        if (resourceData.atlas) {
            this.size += this.loadModel.getSizeByUrl(resourceData.atlas);
        }
        this.size += this.loadModel.getSizeByUrl(resourceData.src);
    }
}