import { AbstractSoundService } from "./AbstractSoundService";
import { CoreEvents } from "../../types/CoreEvents";
import { Howler } from "howler";
import { bind } from "../../factory/di/inject";
import { CreationPriority } from "../../factory/di/CreationPriority";

@bind({bind: AbstractSoundService, priority: CreationPriority.HIGH, singleton: true})
export class HowlerSoundService extends AbstractSoundService {

    constructor() {
        super();
        this.addListeners();
    }

    protected addListeners(): void {
        this.dispatcher.addListener(CoreEvents.SOUND_ACTION, this.onActionExecute.bind(this));
        this.dispatcher.addListener(CoreEvents.LOSE_GAME_FOCUS, this.onLostFocus.bind(this));
        this.dispatcher.addListener(CoreEvents.RECOVER_GAME_FOCUS, this.onRecoverFocus.bind(this));
    }

    protected onRecoverFocus(): void {
        setTimeout(this.howlerResumeInvoke.bind(this), 1000);
    }

    protected onLostFocus(): void {
        if (Howler.ctx) {
            Howler.ctx.suspend();
        }
    }

    protected howlerResumeInvoke(): void {
        if (Howler.ctx && (<any>Howler.ctx.state === "interrupted" || <any>Howler.ctx.state === "suspended")) {
            Howler.ctx.resume();
        }
    }
}