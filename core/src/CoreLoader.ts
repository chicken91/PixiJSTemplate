import { CoreContext } from './CoreContext';
import { EventDispatcher } from "./service/EventDispatcher";
import { InitialAssetsProgressService } from "./service/InitialAssetsProgressService";
import { LoadService } from "./service/LoadService";
import { AssetDataFactory } from "./factory/AssetDataFactory";
import { LoadModel } from "./models/game/LoadModel";
import { AbstractSoundProvider } from "./service/providers/AbstractSoundProvider";
import { FontProvider } from "./service/providers/FontProvider";
import { ImageProvider } from "./service/providers/ImageProvider";
import { GameModel } from "./models/GameModel";
import { SceneService } from "./service/SceneService";
import { CoreConstants } from "./types/constant/CoreConstants";
import { KeyboardService } from "./service/KeyboardService";
import { LayoutModel } from "./models/game/LayoutModel";
import { SpriteBuilder } from "./factory/layout/builders/SpriteBuilder";
import { ComponentBuilder } from "./factory/layout/builders/ComponentBuilder";
import { LayoutParser } from "./factory/layout/LayoutParser";
import { LocaleModel } from "./models/game/LocaleModel";
import { ScreenModel } from "./models/game/ScreenModel";
import { RenderModel } from "./models/game/RenderModel";
import { RenderService } from "./service/RenderService";
import { ResizeService } from "./service/ResizeService";
import { ServerRequestFactory } from "./factory/ServerRequestFactory";
import { ServerService } from "./service/ServerService";
import { InitializeServerAction } from "../../src/actions/load/InitializeServerAction";
import { HowlerSoundModel } from "./models/data/sound/howler/HowlerSoundModel";
import { HowlerSoundService } from "./service/sound/HowlerSoundService";
import { HowlerSoundProvider } from "./factory/HowlerSoundProvider";
import { StateModel } from "./models/game/StateModel";
import { AbstractStateMachine } from "./actions/AbstractStateMachine";
import { GroupBuilder } from "./factory/layout/builders/GroupBuilder";
import { ResizeAreaBuilder } from "./factory/layout/builders/ResizeAreaBuilder";
import { ButtonBuilder } from "./factory/layout/builders/ButtonBuilder";
import { GraphicsBuilder } from "./factory/layout/builders/GraphicsBuilder";

export class CoreLoader {
    protected context: CoreContext;

    constructor(context: CoreContext) {
        this.context = context;
        this.initialize();
        this.activate();
    }

    protected initialize(): void {
        this.context.addBindedClasses(this.getBindedClasses());
        if (CoreConstants.deviceType.DESKTOP) {
            this.context.addBindedClasses(this.getDesktopBindedClasses());
        }
        if (CoreConstants.deviceType.MOBILE) {
            this.context.addBindedClasses(this.getMobileBindedClasses());
        }
        this.context.addBindedClasses(this.getViewMappingClasses());
    }

    protected activate(): void {
        this.context.activate();
    }

    protected addModules(context: CoreContext): void {
    }

    protected getBindedClasses(): Array<Function> {
        return [
            EventDispatcher,
            InitialAssetsProgressService,
            LoadService,
            AssetDataFactory,
            LoadModel,
            AbstractSoundProvider,
            FontProvider,
            ImageProvider,
            GameModel,
            SceneService,
            ScreenModel,
            RenderModel,
            RenderService,
            ResizeService,
            LayoutModel,
            ComponentBuilder,
            SpriteBuilder,
            LayoutParser,
            LocaleModel,
            ServerRequestFactory,
            ServerService,
            InitializeServerAction,
            HowlerSoundModel,
            HowlerSoundService,
            HowlerSoundProvider,
            StateModel,
            AbstractStateMachine,
            GroupBuilder,
            ResizeAreaBuilder,
            ButtonBuilder,
            GraphicsBuilder
        ];
    }

    protected getDesktopBindedClasses(): Array<Function> {
        return [
            KeyboardService
        ];
    }

    protected getMobileBindedClasses(): Array<Function> {
        return [];
    }

    protected getViewMappingClasses(): Array<Function> {
        return [];
    }
}
