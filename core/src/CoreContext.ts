import { Kernel } from "./factory/di/Kernel";

export class CoreContext {
    private _isActivated: boolean;
    private _kernel: Kernel;
    private _classes: Array<Function>;

    constructor() {
        this._isActivated = false;
        this._classes = [];
        this._kernel = Kernel.getInstance();
    }

    /**
     * When Context activating it activates kernel, which
     * enables the injections (only when kernel is activated we can inject classes),
     * Also runs method onActivation() in all binded modules
     */
    public activate(): void {
        if (this.isActivated) {
            throw new Error("Already activated context");
        }
        this._isActivated = true;

        this._kernel.activate();

        console.log(`Binding classes ${this._classes}`);
    }

    public addBindedClasses(classes: Array<Function>): void {
        this._classes.push(...classes);
    }

    public get isActivated(): boolean {
        return this._isActivated;
    }

    public get kernel(): Kernel {
        return this._kernel;
    }
}