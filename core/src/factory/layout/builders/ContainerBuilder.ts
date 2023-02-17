import { AbstractBuilder } from "./AbstractBuilder";
import { Container, Graphics } from "pixi.js";
import { ObjectView } from "../../../views/ObjectView";
import { AbstractParser } from "../AbstractParser";
import { bind } from "../../di/inject";
import { GameModel } from "../../../models/GameModel";
import { GameConfig } from "../../../models/GameConfig";

@bind()
export class ContainerBuilder extends AbstractBuilder<Container> {

    protected createDefault(layout: any, layoutParser: AbstractParser): ObjectView<Container, GameModel<GameConfig>> {
        return new ObjectView(new Container());
    }

    protected createCustom(customClass: any, layout: any, layoutParser: AbstractParser): ObjectView<Container, GameModel<GameConfig>> {
        return new customClass(new Container());
    }

    protected createComponent(layout: any, layoutParser: AbstractParser, customClass: any): ObjectView<Container, GameModel<GameConfig>> {
        let element = super.createComponent(layout, layoutParser, customClass);
        this.createChildComponent(<ObjectView<Container, GameModel<GameConfig>>>element, layout, layoutParser);
        return element;
    }

    protected createChildComponent(element: ObjectView<Container, GameModel<GameConfig>>, layout: any, layoutParser: AbstractParser): void {
        const children: any[] = layout.children || [];
        for (const childLayout of children) {
            const child: ObjectView<Container, GameModel<GameConfig>> = layoutParser.createFromLayout(childLayout);
            if (child) {
                element.object.addChild(child.object);
                element.childViews.push(child);
                if (childLayout.id) {
                    element[childLayout.id] = child;
                }
            }
        }

        if (layout.mask != null) {
            const mask: Graphics = new Graphics();
            mask.beginFill(0xFFFFFF, 1);
            mask.drawRect(
                layout.mask.x || 0,
                layout.mask.y || 0,
                layout.mask.width,
                layout.mask.height);
            mask.endFill();
            element.object.addChild(mask);
            element.object.mask = mask;
        }
    }
}
