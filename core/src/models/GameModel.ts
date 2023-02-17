import { GameConfig } from "./GameConfig";
import { AbstractModel } from "./AbstractModel";
import { bind, inject } from "../factory/di/inject";
import { SoundModel } from "./game/SoundModel";
import { LocaleModel } from "./game/LocaleModel";
import { LoadModel } from "./game/LoadModel";
import { LayoutModel } from "./game/LayoutModel";
import { ScreenModel } from "./game/ScreenModel";
import { RenderModel } from "./game/RenderModel";
import { StateModel } from "./game/StateModel";

@bind({singleton: true})
export class GameModel<TConfig extends GameConfig> extends AbstractModel {
    public config: TConfig = inject(GameConfig);
    public localeModel: LocaleModel = inject(LocaleModel);
    public loadModel: LoadModel = inject(LoadModel);
    public layoutModel: LayoutModel = inject(LayoutModel);
    public screenModel: ScreenModel = inject(ScreenModel);
    public renderModel: RenderModel = inject(RenderModel);
    public soundModel: SoundModel = inject(SoundModel);
    public stateModel: StateModel = inject(StateModel);
}
