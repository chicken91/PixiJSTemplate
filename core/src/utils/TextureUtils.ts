import { Texture } from 'pixi.js';

export class TextureUtils {
    public static getTexture(id: string): Texture {
        const texture = PIXI.utils.TextureCache[id];
        if (!texture) {
            console.error(`no texture for id ${id}`);
        }
        return texture;
    }
}