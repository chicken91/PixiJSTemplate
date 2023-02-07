import { AbstractSound } from "./data/sound/AbstractSound";

export class SoundModel {
    private _volume: number = 1;
    private _soundMap: { [id: string]: AbstractSound } = {};

    public get soundIdList(): Array<string> {
        return Object.keys(this._soundMap);
    }

    public addSound(sound: AbstractSound): void {
        this._soundMap[sound.id] = sound;
    }

    public setVolumeSound(value: number): void {
        if (value <= 1 && value >= 0) {
            this._volume = value;
        }
    }

    public get volume(): number {
        return this._volume;
    }

    public getSoundById(soundId: string): AbstractSound {
        return this._soundMap[soundId];
    }
}