import { VolumeAction } from "./VolumeAction";
import { SoundActionType } from "../../types/SoundActionType";

export class GlobalVolumeAction extends VolumeAction {
    constructor(volume: number) {
        super("", SoundActionType.CHANGE_GLOBAL_VOLUME, volume);
    }
}