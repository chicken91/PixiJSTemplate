import { AbstractModel } from "../AbstractModel";

export function observableProperty(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    let set = descriptor.set;
    let get = descriptor.get;
    descriptor.set = function (value: any) {
        const currentValue = get && get.call(this);
        set && set.call(this, value);
        if (currentValue !== value) {
            (<AbstractModel>this).sendProperty(propertyKey, value);
        }
    };
}
