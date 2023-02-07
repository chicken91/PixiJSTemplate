import { CreationPriority } from "./CreationPriority";

export class BindingOptions {
    singleton?: boolean;
    priority?: number = CreationPriority.NORMAL;
    bind?: Function;
}