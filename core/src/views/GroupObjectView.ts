import { Container } from "pixi.js";
import { ResizeController } from "./controller/resize/ResizeController";
import { ObjectView } from "./ObjectView";
import { ResizeArea } from "./objects/ResizeArea";
import { ResizeType } from "../types/ResizeType";
import { GameModel } from "../models/GameModel";
import { GameConfig } from "../models/GameConfig";

export class GroupObjectView<TObject extends Container, TModel extends GameModel<GameConfig>> extends ObjectView<TObject, TModel> {
    protected resizeArea: ObjectView<ResizeArea, TModel>;

    constructor(object3D: TObject) {
        super(object3D);
        this.resizeController = new ResizeController(this.model.screenModel, this, ResizeType.GROUP);
    }

    public onAdded() {
        super.onAdded();
        if (this.resizeArea) {
            this.object.calculateBounds = () => {
                this.object._bounds.clear();
                this.resizeArea.object.getBounds();
                this.object._bounds.addBounds(this.resizeArea.object._bounds);
            };
        }
    }
}
