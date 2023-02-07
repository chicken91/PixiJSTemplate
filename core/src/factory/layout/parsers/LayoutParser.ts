import { ViewType } from "../../../types/ViewType";
import { AbstractParser } from "./AbstractParser";
import { bind, inject } from "../../di/inject";
import { ComponentBuilder } from "../builders/ComponentBuilder";
import { SpriteBuilder } from "../builders/SpriteBuilder";
import { ContainerBuilder } from "../builders/ContainerBuilder";

@bind({singleton: true})
export class LayoutParser extends AbstractParser {
    protected addBuilders(): void {
        this.addBuilder(ViewType.Component, inject(ComponentBuilder));
        this.addBuilder(ViewType.Container, inject(ContainerBuilder));
        this.addBuilder(ViewType.Sprite, inject(SpriteBuilder));
    }
}
