import { bind } from "../factory/di/inject";

@bind({singleton: true})
export class GameConfig {
    private _serverUrl!: string;
    private _soundMap!: any;
    private _gameName!: string;

    public set initialConfig(gameConfig: any) {
        this.soundMap = gameConfig.soundMap;
        this.serverUrl = gameConfig.server.serverUrl;
        this.gameName = gameConfig.gameName;
    }

    public get serverUrl(): string {
        return this._serverUrl;
    }

    public set serverUrl(value: string) {
        this._serverUrl = value;
    }

    public getSoundId(name: string): string {
        const soundId: string = this._soundMap[name];
        if (!soundId) {
            console.error(`no sound id for name -> ${name}`);
        }
        return soundId;
    }

    public set soundMap(data: any) {
        this._soundMap = data || {};
    }

    public get gameName(): string {
        return this._gameName;
    }

    public set gameName(data: string) {
        this._gameName = data || '';
    }
}