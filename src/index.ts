import { BOAActivator } from "./BOAActivator";

export function activation(): void {
    let activator = new BOAActivator();
    activator.activate();
}

activation();
