import { EventDispatcher } from "../service/EventDispatcher";
import { inject } from "../factory/di/inject";
import { Container } from "pixi.js";
import { GameModel } from "../models/GameModel";
import { ResizeController } from "./controller/resize/ResizeController";
import { ResizeType } from "../types/ResizeType";
import { GameConfig } from "../models/GameConfig";

export class ObjectView<TObject extends Container, TModel extends GameModel<GameConfig>> {
    private _object: TObject;
    private _model: TModel = inject(GameModel);
    protected dispatcher: EventDispatcher = inject(EventDispatcher);
    public childViews: ObjectView<TObject, TModel>[];
    public resizeController: ResizeController;

    constructor(object3D: TObject) {
        this._object = object3D;
        this.resizeController = new ResizeController(this.model.screenModel, this, ResizeType.SIMPLE);
        this.childViews = [];

        this._object.on("added", this.onAdded, this);
        this._object.on("removed", this.onRemoved, this);
    }

    public onAdded(): void {
        this.onActivate();
    }

    public onRemoved(): void {
        this._object.off("added", this.onAdded, this);
        this._object.off("removed", this.onRemoved, this);
        // this._object = null;
    }

    public onActivate(): void {
        this.resizeController.onActivate();
    }

    public onResize(width?: number, height?: number): void {
        this.childViews.forEach(childView => childView.onResize(width, height));
        this.resizeController.onResize(width, height);
    }

    public get object(): TObject {
        return this._object;
    }

    public get model(): TModel {
        return this._model;
    }
}
