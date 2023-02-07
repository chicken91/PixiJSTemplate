import { TemplateActivator } from "./TemplateActivator";

export function activation(): void {
    let activator = new TemplateActivator();
    activator.activate();
}

activation();