import { SoundAction } from "./SoundAction";
import { SoundActionType } from "../../types/SoundActionType";

export class PlaySoundAction extends SoundAction {
    public loop!: boolean;
    public onComplete!: Function | undefined;

    constructor(id: string, loop: boolean = false, onComplete?: Function) {
        super(id, SoundActionType.PLAY_SOUND);
        this.loop = loop;
        this.onComplete = onComplete;
    }
}