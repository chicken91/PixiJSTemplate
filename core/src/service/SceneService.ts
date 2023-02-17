import { LayoutParser } from "../factory/layout/LayoutParser";
import { EventDispatcher } from "./EventDispatcher";
import { bind, inject } from "../factory/di/inject";
import { Size } from "../models/data/Size";
import { ScreenModel } from "../models/game/ScreenModel";
import { CoreEvents } from "../types/CoreEvents";
import { RenderModel } from "../models/game/RenderModel";
import { CreationPriority } from "../factory/di/CreationPriority";
import { ObjectView } from "../views/ObjectView";
import { Container } from "pixi.js";
import { GameConfig } from "../models/GameConfig";
import { GameModel } from "../models/GameModel";

@bind({singleton: true, priority: CreationPriority.HIGH})
export class SceneService {
    protected layoutParser: LayoutParser = inject(LayoutParser);
    protected renderModel: RenderModel = inject(RenderModel);
    protected dispatcher: EventDispatcher = inject(EventDispatcher);
    protected screenModel: ScreenModel = inject(ScreenModel);

    protected scenes: { [sceneId: string]: ObjectView<Container, GameModel<GameConfig>> } = {};

    constructor() {
        this.dispatcher.addListener(CoreEvents.ADD_SCENE, this.onSceneAdd.bind(this));
        this.dispatcher.addListener(CoreEvents.REMOVE_SCENE, this.onSceneRemove.bind(this));
        this.dispatcher.addListener(CoreEvents.RESIZE, this.onResize.bind(this));
    }

    protected onSceneAdd(sceneId: string): void {
        if (!this.scenes.hasOwnProperty(sceneId)) {
            const scene = this.layoutParser.createFromLibrary(sceneId);
            this.scenes[sceneId] = scene;
            this.renderModel.rootContainer.addChildAt(scene.object, 0);
            this.onResize(this.screenModel.size);
            this.dispatcher.dispatch(CoreEvents.SCENE_LOADED, sceneId);
        }
    }

    protected onSceneRemove(sceneId: string): void {
        if (this.scenes.hasOwnProperty(sceneId)) {
            const scene = this.scenes[sceneId];
            this.renderModel.rootContainer.removeChild(scene.object);
            delete this.scenes[sceneId];
        }
    }

    protected onResize(size: Size): void {
        for (let scene of Object.values(this.scenes)) {
            scene.onResize(size.width, size.height);
        }
    }
}
