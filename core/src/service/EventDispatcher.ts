import { EventEmitter } from "eventemitter3";
import { bind } from "../factory/di/inject";
import { CreationPriority } from "../factory/di/CreationPriority";

@bind({singleton: true, priority: CreationPriority.VERY_HIGH})
export class EventDispatcher extends EventEmitter {
    public logginEnabled: boolean = false;

    dispatch(event: string, ...args: any[]): void {
        if (__DEV__ && this.logginEnabled) {
            this.logEvent(event, args);
        }
        super.emit(event, ...args);
    }

    protected logEvent(event: string, ...args: any[]): void {
        console.log(event + args ? ', data -> ' + args : '');
    }
}
