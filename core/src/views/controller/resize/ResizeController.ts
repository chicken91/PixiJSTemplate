import { ResizeProperty } from "./ResizeProperty";
import { ScreenModel } from "../../../models/game/ScreenModel";
import { ResizePropertyType } from "../../../types/ResizePropertyType";
import { CoreConstants } from "../../../types/constant/CoreConstants";
import { Container } from "pixi.js";
import { ObjectView } from "../../ObjectView";
import { ResizeType } from "../../../types/ResizeType";
import { GroupResizeProperty } from "./GroupResizeProperty";
import { GameModel } from "../../../models/GameModel";
import { GameConfig } from "../../../models/GameConfig";

export class ResizeController {
    protected model: ScreenModel;
    protected view: ObjectView<Container, GameModel<GameConfig>>;
    protected type: string;
    protected resizePropertyMap: { [key: string]: ResizeProperty };
    protected activePropertyKey: string;

    constructor(model: ScreenModel, view: ObjectView<Container, GameModel<GameConfig>>, type: string) {
        this.model = model;
        this.view = view;
        this.type = type;
        this.resizePropertyMap = {};
        const defaultProperty = this.createResizeProperty();
        this.addResizeProperty(ResizePropertyType.DEFAULT, defaultProperty);
    }

    public addResizeProperty(type: string, resizeProperty: ResizeProperty): void {
        this.mergeDefaultProperty(resizeProperty);
        this.resizePropertyMap[type] = resizeProperty;
    }

    public getResizePropertyByType(type: string): ResizeProperty {
        return this.resizePropertyMap[type];
    }

    public getActiveResizeProperty(): ResizeProperty {
        return this.resizePropertyMap[this.activePropertyKey];
    }

    public hasResizeProperty(type: string): boolean {
        return this.resizePropertyMap[type] != null;
    }

    public getResizePropertyKeys(): Array<string> {
        return Object.keys(this.resizePropertyMap);
    }

    public onResize(width?: number, height?: number): void {
        let propertyKey = this.getPropertyKey();
        this.updatePropertiesByKey(propertyKey, width, height);
    }

    public onActivate(): void {
        let activePropertyKey = this.activePropertyKey ? this.activePropertyKey : ResizePropertyType.DEFAULT;
        let resizeProperty: ResizeProperty = this.resizePropertyMap[activePropertyKey];
        if (resizeProperty) {
            resizeProperty.onActivate();
        }
    }

    protected getPropertyKey(): string {
        if (CoreConstants.deviceType.MOBILE) {
            let key = this.updateRatioProperties();
            if (key == null) {
                key = this.updateOrientationProperties();
                if (key == null) {
                    return ResizePropertyType.DEFAULT;
                }
            }
            return key;
        } else {
            return ResizePropertyType.DEFAULT;
        }
    }

    protected updateOrientationProperties(): string | undefined {
        let ratioKeyList: Array<string> = Object.keys(this.resizePropertyMap);
        let index: number = ratioKeyList.indexOf(this.model.orientation);
        if (index !== -1) {
            let ratioKey: string = ratioKeyList[index];
            return ratioKey;
        }
        return undefined;
    }

    protected updateRatioProperties(): string | undefined {
        let ratioKeyList: Array<string> = Object.keys(this.resizePropertyMap);
        for (let ratioKey of ratioKeyList) {
            if (ratioKey.includes("/")) {
                let splashIndex: number = ratioKey.indexOf("/");
                let ratioWidth: number = parseInt(ratioKey.substring(0, splashIndex));
                let rationHeight: number = parseInt(ratioKey.substring(splashIndex + 1));
                let ratioValue: number = rationHeight / ratioWidth;

                if (this.model.ratio === ratioValue) {
                    return ratioKey;
                }
            }
        }
        return undefined;
    }

    protected updatePropertiesByKey(key: string, width?: number, height?: number): void {
        let resizeProperty: ResizeProperty = this.resizePropertyMap[key];
        if (resizeProperty) {
            if (this.activePropertyKey !== key) {
                this.activePropertyKey = key;
                resizeProperty.onActivate(width, height);
            }
            resizeProperty.onResize(width, height);
        }
    }

    protected mergeDefaultProperty(resizeProperty: ResizeProperty): void {
        let defaultResizeProperty: ResizeProperty = this.getResizePropertyByType(ResizePropertyType.DEFAULT);
        if (defaultResizeProperty) {
            let properties = Object.getOwnPropertyNames(defaultResizeProperty);
            for (let property of properties) {
                if (!resizeProperty.hasOwnProperty(property)) {
                    resizeProperty[property] = defaultResizeProperty[property];
                }
            }
        }
    }

    public createResizeProperty() {
        switch (this.type) {
            case ResizeType.SIMPLE:
                return new ResizeProperty(this.view);
            case ResizeType.GROUP:
                return new GroupResizeProperty(this.view);
            default :
                throw new Error("Incorrect resize type!");
        }
    }
}
