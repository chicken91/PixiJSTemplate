import { AbstractBuilder } from "./AbstractBuilder";
import { ObjectView } from "../../../views/ObjectView";
import { AbstractParser } from "../AbstractParser";
import { bind } from "../../di/inject";
import { ResizeArea } from "../../../views/objects/ResizeArea";
import { GameModel } from "../../../models/GameModel";
import { GameConfig } from "../../../models/GameConfig";

@bind()
export class ResizeAreaBuilder extends AbstractBuilder<ResizeArea> {

    protected createDefault(layout: any, layoutParser: AbstractParser): ObjectView<ResizeArea, GameModel<GameConfig>> {
        return new ObjectView(new ResizeArea());
    }

    protected createCustom(customClass: any, layout: any, layoutParser: AbstractParser): ObjectView<ResizeArea, GameModel<GameConfig>> {
        return new customClass(new ResizeArea());
    }

    protected override applyAttributes(element: ObjectView<ResizeArea, GameModel<GameConfig>>, layout: any, layoutParser: AbstractParser): void {
        super.applyAttributes(element, layout, layoutParser);

        element.object.beginFill(0xFF0000).drawRect(0, 0, 1, 1).endFill();
        element.object.width = layout.size ? layout.size.width : 1;
        element.object.height = layout.size ? layout.size.height : 1;
    }
}
