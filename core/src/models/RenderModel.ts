import { bind } from "../factory/di/inject";
import { UrlUtils } from "../utils/UrlUtils";
import { CoreConstants } from "../types/constant/CoreConstants";
import { Application, Container } from "pixi.js";
import { IRenderer } from "@pixi/core";
import { ICanvas } from "@pixi/settings/lib/ICanvas";

@bind({singleton: true})
export class RenderModel {
    private _application!: Application;
    protected _fpsMeter!: FPSMeter;

    public createApplication(): void {
        this._application = new Application({
            view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
            resolution: window.devicePixelRatio || 1,
            autoDensity: true,
            backgroundColor: 0x6495ed
        });
    }

    public createFPSMeter(): void {
        if (__DEV__ && UrlUtils.getParameter(CoreConstants.urlParameters.debug) === "1") {
            this._fpsMeter = new FPSMeter();
        }
    }

    public updateFPSMeter(): void {
        if (this._fpsMeter) {
            this._fpsMeter.tick();
        }
    }

    public get renderer(): IRenderer {
        return this._application.renderer;
    }

    public get canvas(): ICanvas {
        return this._application.renderer.view;
    }

    public get rootContainer(): Container {
        return this._application.stage;
    }
}
