import { Container, Rectangle } from "pixi.js";
import { ObjectView } from "../../../views/ObjectView";
import { AbstractParser } from "../AbstractParser";
import { bind } from "../../di/inject";
import { TextureUtils } from "../../../utils/TextureUtils";
import { GameModel } from "../../../models/GameModel";
import { GameConfig } from "../../../models/GameConfig";
import { ContainerBuilder } from "./ContainerBuilder";
import { ButtonView } from "../../../views/ButtonView";
import { ButtonController } from "../../../views/controller/button/ButtonController";
import { ButtonViewType } from "../../../types/ButtonViewType";

@bind()
export class ButtonBuilder extends ContainerBuilder {

    protected createDefault(layout: any, layoutParser: AbstractParser): ObjectView<Container, GameModel<GameConfig>> {
        return new ButtonView(new Container());
    }

    protected override applyAttributes(element: ButtonView, layout: any, layoutParser: AbstractParser): void {
        super.applyAttributes(element, layout, layoutParser);

        this.setButtonController(element, layout);

        if (layout.hitArea) {
            element.setHitArea(new Rectangle(layout.hitArea.x, layout.hitArea.y, layout.hitArea.width, layout.hitArea.height));
        }

        for (let state in layout.components) {
            if (layout.components.hasOwnProperty(state)) {
                const stateObject = layout.components[state];
                const component = layoutParser.createFromLayout(stateObject);
                element.setStateComponent(state, component);
            }
        }

        for (let state in layout.states) {
            const stateObject = layout.states[state];
            element.setStateTexture(state, TextureUtils.getTexture(stateObject));
        }

        if (layout.mainImageAnchor) {
            element.setMainImageAnchor(layout.mainImageAnchor);
        }
        element.changeState(ButtonViewType.NORMAL);
    }

    protected setButtonController(element: ButtonView, layout: any): void {
        new ButtonController(element);
    }
}
