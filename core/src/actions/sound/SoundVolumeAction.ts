import { VolumeAction } from "./VolumeAction";
import { SoundActionType } from "../../types/SoundActionType";

export class SoundVolumeAction extends VolumeAction {
    constructor(id: string, volume: number) {
        super(id, SoundActionType.CHANGE_SOUND_VOLUME, volume);
    }
}