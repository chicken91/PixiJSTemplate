import { AbstractParser } from "../parsers/AbstractParser";
import { ObjectView } from "../../../views/ObjectView";
import { DisplayObject } from "pixi.js";

export abstract class AbstractBuilder<T extends DisplayObject> {

    protected abstract createDefault(layout: any, layoutParser: AbstractParser): ObjectView<T> ;

    public create(layout: any, layoutParser: AbstractParser, customClass?: any): ObjectView<T> {
        const element = this.createComponent(layout, layoutParser, customClass);
        this.applyAttributes(element, layout, layoutParser);
        return element;
    }

    protected applyAttributes(view: ObjectView<T>, layout: any, layoutParser: AbstractParser): void {
        if (layout.visible != null)
            view.object.visible = layout.visible;

        if (layout.alpha != null)
            view.object.alpha = layout.alpha;

        if (layout.scale != null)
            view.object.scale.set(layout.scale.x || 1, layout.scale.y || 1);

        if (layout.position != null)
            view.object.position.set(layout.position.x || 0, layout.position.y || 0);

        if (layout.rotation != null)
            view.object.rotation = layout.rotation || 0;
    }

    protected createComponent(layout: any, layoutParser: AbstractParser, customClass: any): ObjectView<T> {
        return (customClass) ? this.createCustom(customClass, layout, layoutParser) : this.createDefault(layout, layoutParser);
    }

    protected createCustom(customClass: any, layout: any, layoutParser: AbstractParser): ObjectView<T> {
        return new customClass();
    }
}
