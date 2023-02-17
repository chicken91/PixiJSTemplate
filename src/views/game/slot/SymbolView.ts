import { Sprite } from 'pixi.js'
import { ObjectView } from "../../../../core/src/views/ObjectView";
import { BOAGameModel } from "../../../models/BOAGameModel";
import { SymbolConfig } from "../../../models/config/slot/SymbolConfig";
import { TextureUtils } from "../../../../core/src/utils/TextureUtils";

export class SymbolView extends ObjectView<Sprite, BOAGameModel> {
    public config: SymbolConfig;

    public Initialize(config: SymbolConfig): void {
        this.config = config;
        this.object.texture = TextureUtils.getTexture(config.texture);
        if (config.offset != null)
            this.object.pivot.set(config.offset[0], config.offset[1]);
    }
}
