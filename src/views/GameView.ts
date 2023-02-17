import { viewMapping } from "../../core/src/factory/di/inject";
import { ObjectView } from "../../core/src/views/ObjectView";
import { Container, Sprite } from 'pixi.js'
import { GroupObjectView } from "../../core/src/views/GroupObjectView";
import { BOAGameModel } from "../models/BOAGameModel";

@viewMapping('gameView')
export class GameView extends GroupObjectView<Container, BOAGameModel> {
    public flowerSprite: ObjectView<Sprite, BOAGameModel>;

    onAdded() {
        super.onAdded();
        // this.flowerSprite.object.position.set(600, 600);
    }
}
