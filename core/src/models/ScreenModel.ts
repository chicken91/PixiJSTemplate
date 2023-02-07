import { Size } from "./data/Size";
import { CoreConstants } from "../types/constant/CoreConstants";
import { OrientationType } from "../types/OrientationType";
import { observableProperty } from './observe';
import { AbstractModel } from './AbstractModel';
import { UrlUtils } from "../utils/UrlUtils";
import { bind } from "../factory/di/inject";

@bind({singleton: true})
export class ScreenModel extends AbstractModel {
    private _dpi!: string;
    private _multiply!: number;
    private _size: Size = new Size();
    private _fullScreen: boolean = false;
    private _ratio!: number;
    private _isFocused: boolean = true;
    private _orientation: string = OrientationType.LANDSCAPE;

    constructor() {
        super();
        const urlDpi: string | null = UrlUtils.getParameter(CoreConstants.urlParameters.dpi);
        if (urlDpi) {
            const dpiData = CoreConstants.dpi[urlDpi];
            if (dpiData) {
                this._dpi = dpiData.type;
                this._multiply = dpiData.multiply;
            }
        }
    }

    public setSize(width: number, height: number) {
        this._size.width = width;
        this._size.height = height;
        this.calculateRatio();
        if (CoreConstants.deviceType.MOBILE) {
            this.updateOrientation();
        }
    }

    public calculateDPI(): void {
        if (this._dpi) {
            return;
        }

        let screenDefinition: number = this.getScreenDefinition();
        if (screenDefinition > CoreConstants.dpi.xhdpi.screenDefinition) {
            this._dpi = CoreConstants.dpi.xhdpi.type;
            this._multiply = CoreConstants.dpi.xhdpi.multiply;
        } else {
            this._dpi = CoreConstants.dpi.mdpi.type;
            this._multiply = CoreConstants.dpi.mdpi.multiply;
        }
        console.log("Defined dpi type: " + this._dpi);
    }

    public changeFullScreenMode(value: boolean): void {
        if (this._fullScreen !== value) {
            this._fullScreen = value;
        }
    }

    protected calculateRatio(): void {
        if (this._size.width < this._size.height)
            this._ratio = window.screen.height / window.screen.width;
        else
            this._ratio = window.screen.width / window.screen.height;
    }

    protected updateOrientation(): void {
        const nextOrientation = this._size.width > this._size.height ? OrientationType.LANDSCAPE : OrientationType.PORTRAIT;
        if (this._orientation !== nextOrientation) {
            this.orientation = nextOrientation;
        }
    }

    private getScreenDefinition(): number {
        if (CoreConstants.deviceType.MOBILE && this._size.height > this._size.width) {
            return this._size.width;
        } else {
            return this._size.height;
        }
    }

    public get dpi(): string {
        return this._dpi;
    }

    public get multiply(): number {
        return this._multiply;
    }

    public get size(): Size {
        return this._size;
    }

    public get fullScreen(): boolean {
        return this._fullScreen;
    }

    public set fullScreen(fs: boolean) {
        this._fullScreen = fs;
    }

    public get ratio(): number {
        return this._ratio;
    }

    public get orientation(): string {
        return this._orientation;
    }

    @observableProperty
    public set orientation(value: string) {
        this._orientation = value;
    }

    public get isFocused(): boolean {
        return this._isFocused;
    }

    @observableProperty
    public set isFocused(value: boolean) {
        this._isFocused = value;
    }
}