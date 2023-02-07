import { Injection } from "./Injection";
import { InjectionUtils } from "./InjectionUtils";
import { BindingOptions } from "./BindingOptions";

/**
 * @class Kernel
 * Contains all injection maps
 * Contains functionality for binding:
 *          single class,
 *          view class to layout id,
 *          controller class to view.
 */
export class Kernel {
    private static _instance: Kernel;
    private _injectionMap: { [constructorName: string]: Injection } = {};
    private _viewMap: { [id: string]: Function } = {};
    private _activate = false;

    public static getInstance(): Kernel {
        if (!this._instance) {
            this._instance = new Kernel();
        }
        return this._instance;
    }

    public activate(): void {
        this._activate = true;
        this.activateHighPriorityInjections();
    }

    public bind(target: Function, options: BindingOptions): void {
        const constructor = options && options.bind ? options.bind : target;
        let injection = this.getInjection(constructor);
        if (!injection) {
            injection = new Injection(constructor);
            this.addInjection(constructor, injection);
        }

        if (options) {
            options.bind && injection.to(target);
            options.singleton && injection.asSingleton();
            injection.priority = options.priority;
        }
    }

    public getBind(constructor: Function): any {
        this.checkActivation();

        const injection = this.getInjection(constructor);
        if (!injection) {
            throw new Error("There is no any binding for " + constructor + " please bind the class before inject()");
        }
        return injection.getInstance();
    }

    public viewMapping(view: Function, viewId): void {
        this._viewMap[viewId] = view;
    }

    private checkActivation(): void {
        if (!this._activate) {
            throw new Error("You try to use Kernel before activation!");
        }
    }

    private addInjection(constructor: any, injection: Injection): void {
        const uniqueId = InjectionUtils.getUniqueAttributeId(constructor);
        this._injectionMap[uniqueId] = injection;
    }

    private getInjection(constructor: Function): Injection {
        if (!constructor) {
            throw Error("you are trying to get undefined constructor");
        }
        const uniqueId = InjectionUtils.getUniqueAttributeId(constructor);
        return this._injectionMap[uniqueId];
    }

    private activateHighPriorityInjections(): void {
        Object.values(this._injectionMap)
            .filter(injection => injection.priority > 0)
            .sort((injection1, injection2) => injection2.priority - injection1.priority)
            .forEach(injection => injection.getInstance());
    }

    public getView(id: string): Function {
        return this._viewMap[id];
    }
}
