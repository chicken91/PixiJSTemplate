import { AbstractAssetData } from "./AbstractAssetData";
import { inject } from "../../../factory/di/inject";
import { AbstractSoundProvider } from "../../../service/providers/AbstractSoundProvider";

export abstract class AbstractSoundAssetData extends AbstractAssetData {
    public loaderProvider: AbstractSoundProvider = inject(AbstractSoundProvider);
}