import { IImageResource } from "./IImageResource";
import { ISoundResource } from "./ISoundResource";
import { ISpineResource } from "./ISpineResource";

export interface IResources {
    resources: {
        images: Array<IImageResource>;
        sounds: Array<ISoundResource>;
        spines: Array<ISpineResource>;
    }
}