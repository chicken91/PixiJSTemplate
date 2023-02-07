import { VolumeAction } from "./VolumeAction";
import { SoundActionType } from "../../types/SoundActionType";

export class FadeSoundAction extends VolumeAction {
    constructor(id: string, volume: number, public fadeVolume: number, public fadeTime: number) {
        super(id, SoundActionType.FADE_SOUND, volume);
    }
}