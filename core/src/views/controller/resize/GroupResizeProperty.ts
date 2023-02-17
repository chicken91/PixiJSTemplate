import { ResizeProperty } from "./ResizeProperty";
import { GroupContainerType } from "../../../types/GroupContainerType";
import { ObjectView } from "../../ObjectView";
import { Container } from "pixi.js";
import { Size } from "../../../models/data/Size";
import { GameModel } from "../../../models/GameModel";
import { GameConfig } from "../../../models/GameConfig";

export class GroupResizeProperty extends ResizeProperty {
    protected scaleFunctionMap: { [type: string]: Function } = {};
    protected base!: Size;
    protected maxScale!: number;
    protected fitType!: string;

    constructor(view: ObjectView<Container, GameModel<GameConfig>>) {
        super(view);
        this.scaleFunctionMap[GroupContainerType.FIT] = Math.min.bind(this);
        this.scaleFunctionMap[GroupContainerType.FILL] = Math.max.bind(this);
    }

    public onResize(width?: number, height?: number): void {
        super.onResize(width, height);
        if (this.base) {
            let scaleFunction = this.scaleFunctionMap[this.fitType];
            let scale = scaleFunction(this.getRelativeWidth(width) / this.base.width, this.getRelativeHeight(height) / this.base.height);
            if (this.maxScale) {
                let minScale = Math.min(scale, this.maxScale);
                this.view.object.scale.set(minScale, minScale);
            } else {
                this.view.object.scale.set(scale, scale);
            }

            if (this.anchor) {
                this.view.object.pivot.x = (this.view.object.width / this.view.object.scale.x) * this.anchor.x + this.view.object.getLocalBounds().x;
                this.view.object.pivot.y = (this.view.object.height / this.view.object.scale.y) * this.anchor.y + this.view.object.getLocalBounds().y;
            }
            if (this.position) {
                this.view.object.x = this.position.x * this.view.object.scale.x;
                this.view.object.y = this.position.y * this.view.object.scale.y;
            }
        }
    }

    public onApplyProperty(layout: any): void {
        super.onApplyProperty(layout);
        if (layout.base != null) {
            this.base = new Size(layout.base.width || 0, layout.base.height || 0);
        }

        if (layout.maxScale != null) {
            this.maxScale = layout.maxScale;
        }

        if (layout.fitType != null) {
            this.fitType = layout.fitType || GroupContainerType.FIT;
        }
    }
}
