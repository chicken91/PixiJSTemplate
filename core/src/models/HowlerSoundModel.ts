import { SoundModel } from "./SoundModel";
import { AbstractSound } from "./data/sound/AbstractSound";
import { Howler } from "howler";
import { bind } from "../factory/di/inject";

@bind({bind: SoundModel})
export class HowlerSoundModel extends SoundModel {

    public setVolumeSound(value: number): void {
        super.setVolumeSound(value);
        Howler.volume(this.volume);
    }

    public addSound(sound: AbstractSound): void {
        super.addSound(sound);
        Howler.volume(this.volume);
    }
}