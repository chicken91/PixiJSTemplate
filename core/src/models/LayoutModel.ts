import { bind } from "../factory/di/inject";

@bind({singleton: true})
export class LayoutModel {
    private _mainLayout!: any;
    private _fontSettings: string = "Dragons";

    public set layoutConfig(conf: any) {
        this._mainLayout = conf;
    }

    public set fontSettings(settings: string) {
        this._fontSettings = settings;
    }

    public get fontSettings(): string {
        return this._fontSettings;
    }

    public getLibraryComponent(id: string): any {
        const component = this._mainLayout[id];
        if (!component) {
            console.error(`no layout for ${id}`);
        }
        return component;
    }
}

