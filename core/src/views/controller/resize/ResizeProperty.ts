import { Container, Point } from "pixi.js";
import { Size } from "../../../models/data/Size";
import { ObjectView } from "../../ObjectView";
import { GameModel } from "../../../models/GameModel";
import { GameConfig } from "../../../models/GameConfig";

export class ResizeProperty {
    protected view: ObjectView<Container, GameModel<GameConfig>>;

    protected relativePosition!: Point;
    protected position!: Point;
    protected anchor!: Point;
    protected globalPositioning: boolean = true;
    protected scale!: Point;
    protected size!: Size;
    protected remove!: boolean;

    constructor(view: ObjectView<Container, GameModel<GameConfig>>) {
        this.view = view;
    }

    public onResize(width?: number, height?: number): void {
        // NOTE: if will be issue with resize, move anchor property to onResize method
        if (this.anchor) {
            this.view.object.pivot.set((this.view.object.width * this.anchor.x) / this.view.object.scale.x, (this.view.object.height * this.anchor.y) / this.view.object.scale.y);
        }

        if (this.relativePosition) {
            this.view.object.x = this.getRelativeWidth(width) * this.relativePosition.x;
            this.view.object.y = this.getRelativeHeight(height) * this.relativePosition.y;
        }
    }

    public onActivate(width?: number, height?: number): void {
        if (this.scale) {
            this.view.object.scale.set(this.scale.x, this.scale.y);
        }

        if (this.size) {
            this.view.object.width = this.size.width;
            this.view.object.height = this.size.height;
        }

        // NOTE: if will be issue with resize, move anchor property to onResize method
        if (this.anchor) {
            this.view.object.pivot.set((this.view.object.width * this.anchor.x) / this.view.object.scale.x, (this.view.object.height * this.anchor.y) / this.view.object.scale.x);
        }

        if (this.relativePosition == null && this.position) {
            this.view.object.x = this.position.x;
            this.view.object.y = this.position.y;
        }

        this.view.object.renderable = !this.remove;

        this.onResize(width, height);
    }

    public onApplyProperty(layout: any): void {
        if (layout.position != null) {
            this.position = new Point(layout.position.x || 0, layout.position.y || 0);
        }
        if (layout.rPos != null) {
            this.relativePosition = new Point(layout.rPos.x || 0, layout.rPos.y || 0);
        }
        if (layout.global != null) {
            this.globalPositioning = layout.global;
        }
        if (layout.anchor != null) {
            this.anchor = new Point(layout.anchor.x || 0, layout.anchor.y || 0);
        }
        if (layout.scale != null) {
            this.scale = new Point(layout.scale.x || 0, layout.scale.y || 0);
        }
        if (layout.size != null) {
            this.size = new Size(layout.size.width || 0, layout.size.height || 0);
        }
        if (layout.remove != null) {
            this.remove = layout.remove;
        }
    }

    protected getRelativeWidth(width?: number): number {
        return width || (this.globalPositioning) ? this.view.model.screenModel.size.width : this.view.object.parent.width;
    }

    protected getRelativeHeight(height?: number): number {
        return height || (this.globalPositioning) ? this.view.model.screenModel.size.height : this.view.object.parent.height;
    }
}
