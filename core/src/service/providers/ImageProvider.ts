import { AbstractLoaderProvider } from "./AbstractLoaderProvider";
import { AssetsType } from "../../types/AssetsType";
import { IImageResource } from "../../types/interface/IImageResource";
import { bind } from "../../factory/di/inject";

@bind()
export class ImageProvider extends AbstractLoaderProvider {

    public async load(): Promise<any> {
        return Promise.resolve();
    }

    public prepare(data: IImageResource): void {

    }

    public get type(): string {
        return AssetsType.IMAGES;
    }
}
