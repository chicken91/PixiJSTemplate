import { bind } from "../factory/di/inject";
import { ServerConfig } from "./config/ServerConfig";

@bind({singleton: true})
export class GameConfig {
    public server: ServerConfig;
    public soundMap: any;
    public gameName: string;

    public Initialize(config: any): void {
        this.server = config.server;
        this.soundMap = config.soundMap;
        this.gameName = config.gameName;
    }

    public getSoundId(name: string): string {
        const soundId: string = this.soundMap[name];
        if (!soundId)
            console.error(`no sound id for name -> ${name}`);

        return soundId;
    }
}
