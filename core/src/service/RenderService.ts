import { bind, inject } from "../factory/di/inject";
import { CreationPriority } from "../factory/di/CreationPriority";
import { CoreEvents } from "../types/CoreEvents";
import { RenderModel } from "../models/game/RenderModel";
import { EventDispatcher } from "./EventDispatcher";
import { Ticker } from "pixi.js";
import { Group } from "tweedle.js";

@bind({singleton: true, priority: CreationPriority.VERY_HIGH})
export class RenderService {
    protected dispatcher: EventDispatcher = inject(EventDispatcher);
    protected renderModel: RenderModel = inject(RenderModel);

    constructor() {
        this.renderModel.createApplication();
        this.renderModel.createFPSMeter();
        this.initFocusListeners();
        Ticker.shared.add(this.onRender, this);
    }

    protected initFocusListeners(): void {
        window.addEventListener('focus', (event) => {
            this.dispatcher.dispatch(CoreEvents.RECOVER_GAME_FOCUS);
        });

        window.addEventListener('blur', (event) => {
            this.dispatcher.dispatch(CoreEvents.LOSE_GAME_FOCUS);
        });
    }

    public resizeCanvas(width: number, heigth: number) {
        this.renderModel.renderer.resize(width, heigth);
        this.updateCanvasStyleDimension(width, heigth);
    }

    protected onRender() {
        this.renderModel.updateFPSMeter();
        Group.shared.update();
        this.dispatcher.dispatch(CoreEvents.ON_RENDER);
    }

    protected updateCanvasStyleDimension(width: number, heigth: number): void {
        this.renderModel.canvas.style.width = width.toString() + "px";
        this.renderModel.canvas.style.height = heigth.toString() + "px";
    }
}
