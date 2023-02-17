import { bind } from "../di/inject";
import { ObjectView } from "../../views/ObjectView";
import { Container } from "pixi.js";
import { GameModel } from "../../models/GameModel";
import { GameConfig } from "../../models/GameConfig";

@bind({singleton: true})
export class LayoutPropertiesPool {
    private _treePropertiesPool: { [property: string]: number } = {};

    public addProperties(layout: any): void {
        for (const prop in layout.props) {
            if (layout.props.hasOwnProperty(prop) && layout.props[prop] != null) {
                this._treePropertiesPool[prop] = layout.props[prop];
            }
        }
    }

    public applyProperties(element: ObjectView<Container, GameModel<GameConfig>>, layout: any): void {
        for (const prop in this._treePropertiesPool) {
            if (prop && this._treePropertiesPool[prop] != null) {
                element[prop] = this._treePropertiesPool[prop];
            }
        }
    }

    public removeProperties(layout: any): void {
        for (const prop in layout.props) {
            if (this._treePropertiesPool[prop] != null) {
                delete this._treePropertiesPool[prop];
            }
        }
    }
}
