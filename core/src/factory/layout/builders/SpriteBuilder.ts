import { AbstractBuilder } from "./AbstractBuilder";
import { Container, Sprite, Texture } from "pixi.js";
import { ObjectView } from "../../../views/ObjectView";
import { AbstractParser } from "../parsers/AbstractParser";
import { bind } from "../../di/inject";

@bind()
export class SpriteBuilder extends AbstractBuilder<Sprite> {

    protected createDefault(layout: any, layoutParser: AbstractParser): ObjectView<Sprite> {
        return new ObjectView(new Sprite());
    }

    protected createCustom(customClass: any, layout: any, layoutParser: AbstractParser): ObjectView<Sprite> {
        return new customClass(new Sprite());
    }

    protected override applyAttributes(element: ObjectView<Sprite>, layout: any, layoutParser: AbstractParser): void {
        super.applyAttributes(element, layout, layoutParser);

        element.object.texture = Texture.from(layout.texture || '');

        if (layout.tint != null) {
            element.object.tint = layout.tint;
        }

        if (layout.realAnchor != null) {
            element.object.anchor = layout.realAnchor;
        }

        if (layout.nSize != null) {
            element.object.width = layout.nSize.width || element.object.width;
            element.object.height = layout.nSize.height || element.object.height;
        }
    }
}
