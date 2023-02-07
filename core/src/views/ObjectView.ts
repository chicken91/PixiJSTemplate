import { IView } from './IView';
import { EventDispatcher } from "../service/EventDispatcher";
import { inject } from "../factory/di/inject";
import { DisplayObject } from "pixi.js";

export class ObjectView<T extends DisplayObject> implements IView {
    private _object: T;
    protected dispatcher: EventDispatcher = inject(EventDispatcher);

    constructor(object3D: T) {
        this._object = object3D;

        this._object.on("added", this.onAdded.bind(this));
        this._object.on("removed", this.onRemoved.bind(this));
    }

    public onAdded(): void {


    }

    public onRemoved(): void {
        this._object.off("added");
        this._object.off("removed");
        this._object = null;
    }

    public onResize(width?: number, height?: number): void {

    }

    public get object(): T {
        return this._object;
    }
}
