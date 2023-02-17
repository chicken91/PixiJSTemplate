import { AbstractLoaderProvider } from "./AbstractLoaderProvider";
import { AssetsType } from "../../types/AssetsType";
import { IImageResource } from "../../types/interface/IImageResource";
import { bind } from "../../factory/di/inject";
import { LoadUtils } from "../../utils/LoadUtils";
import { Assets } from "pixi.js";

@bind()
export class ImageProvider extends AbstractLoaderProvider {
    protected data: IImageResource;

    public async load(): Promise<any> {
        return await Assets.load(this.data.id);
    }

    public async prepare(data: IImageResource): Promise<void> {
        this.data = data
        const url = this.data.atlas ? this.data.atlas : this.data.src;
        Assets.add(this.data.id, LoadUtils.appendHostUrl(url));
    }

    public get type(): string {
        return AssetsType.IMAGES;
    }
}
