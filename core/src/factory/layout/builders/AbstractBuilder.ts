import { AbstractParser } from "../AbstractParser";
import { ObjectView } from "../../../views/ObjectView";
import { Container } from "@pixi/display/lib/Container";
import { inject } from "../../di/inject";
import { LayoutPropertiesPool } from "../LayoutPropertiesPool";
import { CoreConstants } from "../../../types/constant/CoreConstants";
import { ResizeProperty } from "../../../views/controller/resize/ResizeProperty";
import { ResizePropertyType } from "../../../types/ResizePropertyType";
import { GameModel } from "../../../models/GameModel";
import { GameConfig } from "../../../models/GameConfig";

export abstract class AbstractBuilder<TObject extends Container> {
    protected propertiesPool: LayoutPropertiesPool = inject(LayoutPropertiesPool);

    protected abstract createDefault(layout: any, layoutParser: AbstractParser): ObjectView<TObject, GameModel<GameConfig>> ;

    public create(layout: any, layoutParser: AbstractParser, customClass?: any): ObjectView<TObject, GameModel<GameConfig>> {
        this.propertiesPool.addProperties(layout);
        const element = this.createComponent(layout, layoutParser, customClass);
        this.propertiesPool.applyProperties(element, layout);
        this.applyAttributes(element, layout, layoutParser);
        this.propertiesPool.removeProperties(layout);
        return element;
    }

    protected applyAttributes(view: ObjectView<TObject, GameModel<GameConfig>>, layout: any, layoutParser: AbstractParser): void {
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

        let resizeProperty: ResizeProperty = view.resizeController.getResizePropertyByType(ResizePropertyType.DEFAULT);
        resizeProperty.onApplyProperty(layout);

        if (CoreConstants.deviceType.MOBILE && layout.ratio != null) {
            for (let ratioKey in layout.ratio) {
                if (layout.ratio.hasOwnProperty(ratioKey)) {
                    let ratioResizeProperty: ResizeProperty = view.resizeController.createResizeProperty();
                    ratioResizeProperty.onApplyProperty(layout.ratio[ratioKey]);
                    view.resizeController.addResizeProperty(ratioKey, ratioResizeProperty);
                }
            }
        }

        for (const prop in layout.props) {
            if (prop && layout.props[prop] != null) {
                view[prop] = layout.props[prop];
            }
        }
    }

    protected createComponent(layout: any, layoutParser: AbstractParser, customClass: any): ObjectView<TObject, GameModel<GameConfig>> {
        return (customClass) ? this.createCustom(customClass, layout, layoutParser) : this.createDefault(layout, layoutParser);
    }

    protected createCustom(customClass: any, layout: any, layoutParser: AbstractParser): ObjectView<TObject, GameModel<GameConfig>> {
        return new customClass();
    }
}
