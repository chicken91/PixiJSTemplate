/**
 * @class Injection
 * Contains all injection data and functionality for one object. *
 */
export class Injection {
    private _instance: any;
    private _isSingleton: boolean = false;
    private _priority: number = 0;
    private _instanceConstructor!: Function;

    constructor(instanceBindedConstructor: any) {
        this._instanceConstructor = instanceBindedConstructor;
    }

    public getInstance(): any {
        if (this._isSingleton) {
            if (!this._instance) {
                this._instance = this.createInstance();
            }
            return this._instance;
        }
        return this.createInstance();
    }

    public createInstance(): any {
        const constructor = this.getConstructor();
        return new constructor();
    }

    public getConstructor(): any {
        return this._instanceConstructor;
    }

    public asSingleton(): Injection {
        this._isSingleton = true;
        return this;
    }

    public to(instanceConstructor: Function): Injection {
        if (!instanceConstructor) {
            throw new Error("There is an undefined constructor you are trying bind to.");
        }

        this._instanceConstructor = instanceConstructor;
        this._instance = null;
        return this;
    }

    public get priority(): number {
        return this._priority;
    }

    public set priority(value: number) {
        this._priority = value;
    }
}