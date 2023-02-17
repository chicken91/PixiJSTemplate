import { Texture } from "pixi.js";
import { TextureCache } from "@pixi/utils";

export class TextureUtils {
    public static getTexture(id: string): Texture {
        const texture = TextureCache[id];
        if (!texture) {
            console.error(`no texture for id ${id}`);
        }
        return texture;
    }
}
