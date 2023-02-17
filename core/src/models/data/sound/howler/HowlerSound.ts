import { PlaySoundAction } from "../../../../actions/sound/PlaySoundAction";
import { AbstractSound } from "../AbstractSound";
import { FadeSoundAction } from "../../../../actions/sound/FadeSoundAction";
import { Howl, HowlCallback } from "howler";

export class HowlerSound extends AbstractSound {
    protected instance!: Howl;
    protected playIdList: Array<number> = [];
    protected unLockAudio: boolean = false;

    constructor(id: string, instance: any) {
        super(id, instance);
        this.instance.once("unlock", this.onUnlock.bind(this));
    }

    public play(playSoundAction: PlaySoundAction): void {
        if (this.unLockAudio) {
            const playId: number = this.instance.play(this.id);
            this.playIdList.push(playId);
            this.instance.loop(playSoundAction.loop, playId);
            const completeCallback: HowlCallback = this.onCompleteCallback.bind(this, playId, playSoundAction.onComplete);
            this.instance.once("end", completeCallback, playId);
            this.instance.once("stop", completeCallback, playId);
            this.emit("SOUND_PLAY", this.id, playId);
        }
    }

    public stop(): void {
        for (let playId of this.playIdList) {
            this.instance.stop(playId);
            this.instance.off("end", this.onCompleteCallback, playId);
            this.instance.off("stop", this.onCompleteCallback, playId);
        }
        this.playIdList.length = 0;
    }

    public volume(volume: number): void {
        for (let playId of this.playIdList) {
            this.instance.volume(volume, playId);
        }
    }

    public fade(fadeSoundAction: FadeSoundAction): void {
        for (let playId of this.playIdList) {
            this.instance.fade(fadeSoundAction.volume, fadeSoundAction.fadeVolume, fadeSoundAction.fadeTime, playId);
        }
    }

    protected onCompleteCallback(playId: number, onCompleteCallback?: Function): void {
        if (!this.instance.playing(playId)) {
            this.playIdList.splice(this.playIdList.indexOf(playId), 1);
            this.emit("SOUND_COMPLETED", this.id, playId);
            if (onCompleteCallback) {
                onCompleteCallback();
            }
        }
    }

    protected onUnlock(): void {
        this.unLockAudio = true;
    }
}
