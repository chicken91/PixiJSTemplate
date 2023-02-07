import { bind } from "../factory/di/inject";

@bind({singleton: true})
export class LocaleModel {
    private _language!: string;
    private _country!: string;


    constructor() {
        this._language = 'en';
    }

    public get country(): string {
        return this._country;
    }

    public get language(): string {
        return this._language;
    }

    public set language(value: string) {
        this._language = value;
    }

    public set country(value: string) {
        this._country = value;
    }
}