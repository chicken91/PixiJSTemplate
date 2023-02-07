import { EventDispatcher } from "./EventDispatcher";
import { bind, inject } from "../factory/di/inject";
import { CoreEvents } from "../types/CoreEvents";
import { CreationPriority } from "../factory/di/CreationPriority";

@bind({singleton: true, priority: CreationPriority.HIGH})
export class KeyboardService {
    protected dispatcher: EventDispatcher = inject(EventDispatcher);

    constructor() {
        document.addEventListener('keydown', this.onKeyDown.bind(this), false);
    }

    protected onKeyDown(event: KeyboardEvent): void {
        if (event.code === 'Space') {
            this.dispatcher.dispatch(CoreEvents.ON_SPACE_KEY_PRESS);
        }
    }
}