import { PlaySoundAction } from "../../../actions/sound/PlaySoundAction";
import { EventEmitter } from "eventemitter3";
import { FadeSoundAction } from "../../../actions/sound/FadeSoundAction";

export abstract class AbstractSound extends EventEmitter {
    private _id: string;
    protected instance: any;

    constructor(id: string, instance: any) {
        super();
        this._id = id;
        this.instance = instance;
    }

    public abstract play(playSoundAction: PlaySoundAction): void;

    public abstract stop(): void;

    public abstract volume(volume: number): void;

    public abstract fade(fadeSoundAction: FadeSoundAction): void;

    public get id(): string {
        return this._id;
    }
}