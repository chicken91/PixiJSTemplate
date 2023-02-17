import { Sprite } from "pixi.js";
import { ObjectView } from "../../../views/ObjectView";
import { AbstractParser } from "../AbstractParser";
import { bind } from "../../di/inject";
import { TextureUtils } from "../../../utils/TextureUtils";
import { GameModel } from "../../../models/GameModel";
import { GameConfig } from "../../../models/GameConfig";
import { ContainerBuilder } from "./ContainerBuilder";

@bind()
export class SpriteBuilder extends ContainerBuilder {

    protected createDefault(layout: any, layoutParser: AbstractParser): ObjectView<Sprite, GameModel<GameConfig>> {
        return new ObjectView(new Sprite());
    }

    protected createCustom(customClass: any, layout: any, layoutParser: AbstractParser): ObjectView<Sprite, GameModel<GameConfig>> {
        return new customClass(new Sprite());
    }

    protected override applyAttributes(element: ObjectView<Sprite, GameModel<GameConfig>>, layout: any, layoutParser: AbstractParser): void {
        super.applyAttributes(element, layout, layoutParser);

        element.object.texture = TextureUtils.getTexture(layout.texture || '');

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
