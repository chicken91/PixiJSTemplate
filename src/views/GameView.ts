import { viewMapping } from "../../core/src/factory/di/inject";
import { ObjectView } from "../../core/src/views/ObjectView";
import { Container, Sprite } from 'pixi.js'

@viewMapping('gameView')
export class GameView extends ObjectView<Container> {

    onAdded() {
        super.onAdded();
        const sprite = Sprite.from('assets/images/flowerTop.png');
        this.object.addChild(sprite);
    }
}
