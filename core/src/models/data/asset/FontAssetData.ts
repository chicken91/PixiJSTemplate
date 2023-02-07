import { AbstractAssetData } from "./AbstractAssetData";
import { inject } from "../../../factory/di/inject";
import { FontProvider } from '../../../service/providers/FontProvider';
import { IFontResource } from '../../../types/interface/IFontResource';

export class FontAssetData extends AbstractAssetData {
    public loaderProvider: FontProvider = inject(FontProvider);

    protected initAssetSize(resourceData: IFontResource): void {
        this.size += this.loadModel.getSizeByUrl(resourceData.fontUrl);
    }
}