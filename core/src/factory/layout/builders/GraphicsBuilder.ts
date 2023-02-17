import { AbstractBuilder } from "./AbstractBuilder";
import { ObjectView } from "../../../views/ObjectView";
import { AbstractParser } from "../AbstractParser";
import { bind } from "../../di/inject";
import { GameModel } from "../../../models/GameModel";
import { GameConfig } from "../../../models/GameConfig";
import { Graphics } from "pixi.js";

@bind()
export class GraphicsBuilder extends AbstractBuilder<Graphics> {

    protected createDefault(layout: any, layoutParser: AbstractParser): ObjectView<Graphics, GameModel<GameConfig>> {
        return new ObjectView(new Graphics());
    }

    protected createCustom(customClass: any, layout: any, layoutParser: AbstractParser): ObjectView<Graphics, GameModel<GameConfig>> {
        return new customClass(new Graphics());
    }

    protected override applyAttributes(element: ObjectView<Graphics, GameModel<GameConfig>>, layout: any, layoutParser: AbstractParser): void {
        super.applyAttributes(element, layout, layoutParser);

        if (layout.size == null || layout.color == null) return;

        if (layout.border) {
            if (layout.border.width && layout.border.color) {
                const alpha = layout.border.alpha ? layout.border.alpha : 1;
                element.object.lineStyle(layout.border.width, layout.border.color, alpha);
            }
        }
        if (layout.radius) {
            element.object.beginFill(layout.color).drawCircle(0, 0, layout.radius).endFill();
        } else {
            element.object.beginFill(layout.color).drawRect(0, 0, layout.size.width, layout.size.height).endFill();
        }

        element.object.width = layout.size.width;
        element.object.height = layout.size.height;
    }
}
