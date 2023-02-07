import { AbstractBuilder } from "./AbstractBuilder";
import { AbstractParser } from "../parsers/AbstractParser";
import { Container, DisplayObject } from "pixi.js";
import { ObjectView } from "../../../views/ObjectView";
import { bind } from "../../di/inject";

@bind()
export class ComponentBuilder extends AbstractBuilder<DisplayObject> {

    protected override createCustom(customClass: any, layout: any, layoutParser: AbstractParser): ObjectView<DisplayObject> {
        return this.createDefault(layout, layoutParser);
    }

    protected createDefault(layout: any, layoutParser: AbstractParser): ObjectView<DisplayObject> {
        try {
            return layoutParser.createFromLibrary(layout.libId);
        } catch (e) {
            console.error(e);
        }

        return new ObjectView(new Container());
    }
}
