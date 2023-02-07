import { AbstractBuilder } from "./AbstractBuilder";
import { Container, DisplayObject, Sprite, Texture } from "pixi.js";
import { ObjectView } from "../../../views/ObjectView";
import { AbstractParser } from "../parsers/AbstractParser";
import { bind } from "../../di/inject";

@bind()
export class ContainerBuilder extends AbstractBuilder<Container> {

    protected createDefault(layout: any, layoutParser: AbstractParser): ObjectView<Container> {
        return new ObjectView(new Container());
    }

    protected createCustom(customClass: any, layout: any, layoutParser: AbstractParser): ObjectView<Container> {
        return new customClass(new Container());
    }

    protected createComponent(layout: any, layoutParser: AbstractParser, customClass: any): ObjectView<Container> {
        return (customClass) ? this.createCustom(customClass, layout, layoutParser) : this.createDefault(layout, layoutParser);

        let element = super.createComponent(layout, layoutParser, customClass);
        this.createChildComponent(<ObjectView<Container>>element, layout, layoutParser);
        return element;
    }

    protected createChildComponent(element: ObjectView<Container>, layout: any, layoutParser: AbstractParser): void {
        const children: any[] = layout.children || [];
        for (const childLayout of children) {
            const child: ObjectView<DisplayObject> = layoutParser.createFromLayout(childLayout);
            if (child) {
                element.object.addChild(child.object);
                if (childLayout.id) {
                    element[childLayout.id] = child;
                }
            }
        }
    }
}
