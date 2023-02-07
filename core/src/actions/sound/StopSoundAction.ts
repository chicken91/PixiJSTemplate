import { SoundAction } from "./SoundAction";
import { SoundActionType } from "../../types/SoundActionType";

export class StopSoundAction extends SoundAction {

    constructor(id) {
        super(id, SoundActionType.STOP_SOUND);
    }
}