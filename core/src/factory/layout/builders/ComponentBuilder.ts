import { AbstractBuilder } from "./AbstractBuilder";
import { AbstractParser } from "../AbstractParser";
import { Container } from "pixi.js";
import { ObjectView } from "../../../views/ObjectView";
import { bind } from "../../di/inject";
import { GameModel } from "../../../models/GameModel";
import { GameConfig } from "../../../models/GameConfig";

@bind()
export class ComponentBuilder extends AbstractBuilder<Container> {

    protected override createCustom(customClass: any, layout: any, layoutParser: AbstractParser): ObjectView<Container, GameModel<GameConfig>> {
        return this.createDefault(layout, layoutParser);
    }

    protected createDefault(layout: any, layoutParser: AbstractParser): ObjectView<Container, GameModel<GameConfig>> {
        try {
            return layoutParser.createFromLibrary(layout.libId);
        } catch (e) {
            console.error(e);
        }

        return new ObjectView(new Container());
    }
}
