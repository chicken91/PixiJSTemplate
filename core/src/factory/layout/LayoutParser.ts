import { ViewType } from "../../types/ViewType";
import { AbstractParser } from "./AbstractParser";
import { bind, inject } from "../di/inject";
import { ComponentBuilder } from "./builders/ComponentBuilder";
import { SpriteBuilder } from "./builders/SpriteBuilder";
import { ContainerBuilder } from "./builders/ContainerBuilder";
import { GroupBuilder } from "./builders/GroupBuilder";
import { ResizeAreaBuilder } from "./builders/ResizeAreaBuilder";
import { ButtonBuilder } from "./builders/ButtonBuilder";
import { GraphicsBuilder } from "./builders/GraphicsBuilder";

@bind({singleton: true})
export class LayoutParser extends AbstractParser {
    protected addBuilders(): void {
        this.addBuilder(ViewType.Component, inject(ComponentBuilder));
        this.addBuilder(ViewType.Container, inject(ContainerBuilder));
        this.addBuilder(ViewType.Group, inject(GroupBuilder));
        this.addBuilder(ViewType.Sprite, inject(SpriteBuilder));
        this.addBuilder(ViewType.ResizeArea, inject(ResizeAreaBuilder));
        this.addBuilder(ViewType.Button, inject(ButtonBuilder));
        this.addBuilder(ViewType.Graphics, inject(GraphicsBuilder));
    }
}
