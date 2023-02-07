import { Kernel } from "./Kernel";
import { BindingOptions } from "./BindingOptions";

export function bind(options?: BindingOptions): any {
    return function (target: Function) {
        Kernel.getInstance().bind(target, options);
        return target;
    };
}

export function viewMapping(viewId: string): any {
    return function (target: Function) {
        Kernel.getInstance().viewMapping(target, viewId);
        return target;
    };
}

/**
 * Inject method gets binding from the map we created
 * @param constructor base binded class that we want to get
 */
export function inject(constructor: Function): any {
    return Kernel.getInstance().getBind(constructor);
}

/**
 * get biew binding by the id
 * @param id of view from layout
 */
export function getViewClass(id: string): Function {
    return Kernel.getInstance().getView(id);
}