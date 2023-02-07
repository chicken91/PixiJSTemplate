import { SoundAction } from "./SoundAction";

export abstract class VolumeAction extends SoundAction {
    constructor(id: string, type: string, public volume: number) {
        super(id, type);
    }
}