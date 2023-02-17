import { AbstractBuilder } from './builders/AbstractBuilder';
import { getViewClass, inject } from "../di/inject";
import { LayoutModel } from "../../models/game/LayoutModel";
import { ObjectView } from "../../views/ObjectView";
import { Container } from "pixi.js";
import { GameModel } from "../../models/GameModel";
import { GameConfig } from "../../models/GameConfig";

export abstract class AbstractParser {
    private _builders: { [constructorName: string]: AbstractBuilder<Container> } = {};
    private _layoutModel: LayoutModel = inject(LayoutModel);

    constructor() {
        this.addBuilders();
    }

    /**
     * Add builders for each resource type in the layout
     * use addBuilder() method
     */
    protected abstract addBuilders(): void;

    /**
     * Creates an element by id from layout we loaded for the game
     * @param id of element from layout
     */
    public createFromLibrary(id: string): ObjectView<Container, GameModel<GameConfig>> {
        const layout: any = this._layoutModel.getLibraryComponent(id);
        return this.createFromLayout(layout);
    }

    /**
     * Creates an element part of layout
     * @param layout part of layout for specific component
     */
    public createFromLayout(layout: any): ObjectView<Container, GameModel<GameConfig>> {
        const builder = this.getBuilder(layout.type);
        const bindedClass = getViewClass(layout.bindId);

        let component: ObjectView<Container, GameModel<GameConfig>> = builder.create(layout, this, bindedClass);
        return component;
    }

    /**
     * Adding builder to map for each type
     * @param type type of layout element
     * @param builder builder class which assigned to specific type
     */
    protected addBuilder(type: string, builder: AbstractBuilder<Container>): void {
        this._builders[type] = builder;
    }

    /**
     * return  builder for specific layout type
     * @param type type of layout element
     */
    protected getBuilder(type: string): AbstractBuilder<Container> {
        const builder = this._builders[type];
        if (!builder) {
            console.error('NO builder for resource with type: ' + type);
        }

        return builder;
    }
}
