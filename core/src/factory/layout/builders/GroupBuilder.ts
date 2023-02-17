import { Container } from "pixi.js";
import { ObjectView } from "../../../views/ObjectView";
import { AbstractParser } from "../AbstractParser";
import { bind } from "../../di/inject";
import { ContainerBuilder } from "./ContainerBuilder";
import { GroupObjectView } from "../../../views/GroupObjectView";
import { GameModel } from "../../../models/GameModel";
import { GameConfig } from "../../../models/GameConfig";

@bind()
export class GroupBuilder extends ContainerBuilder {

    protected createDefault(layout: any, layoutParser: AbstractParser): ObjectView<Container, GameModel<GameConfig>> {
        return new GroupObjectView(new Container());
    }

    protected createCustom(customClass: any, layout: any, layoutParser: AbstractParser): ObjectView<Container, GameModel<GameConfig>> {
        return new customClass(new Container());
    }
}
