import { bind, inject } from "../factory/di/inject";
import { LoadUtils } from "../utils/LoadUtils";
import { LoadModel } from "../models/LoadModel";
import { IResources } from "../types/interface/IResources";
import { LocaleModel } from "../models/LocaleModel";
import { Action } from "./core/Action";
import { LayoutModel } from "../models/LayoutModel";
import { CoreConstants } from "../types/constant/CoreConstants";
import { GameConfig } from "../models/GameConfig";
import { ScreenModel } from "../models/ScreenModel";
import { StringReplacement } from "../types/interface/CoreTypes";
import { StringUtils } from '../utils/StringUtils';
import { GameModel } from "../models/GameModel";

@bind({singleton: true})
export class LoadConfigAction extends Action {
    protected gameConfig: GameConfig = inject(GameConfig);
    protected gameModel: GameModel = inject(GameModel);
    protected localeModel: LocaleModel = inject(LocaleModel);
    protected loadModel: LoadModel = inject(LoadModel);
    protected layoutModel: LayoutModel = inject(LayoutModel);
    protected screenModel: ScreenModel = inject(ScreenModel);

    protected onExecute(): void {
        this.loadConfigsPromise()
            .then(this.onFinish.bind(this));
    }

    protected onFinish(): void {
        this.gameModel.initialize(this.gameConfig);
        super.onFinish();
    }

    protected loadConfigsPromise(): Promise<any> {
        const patterns = this.getReplaceUrlPatterns();
        const layout_config_url = StringUtils.replacePatternInText(CoreConstants.layout_config_url, patterns);

        return LoadUtils.loadFile(CoreConstants.size_report_url)
            .then(this.setupSizeReportData.bind(this))

            // Load General Config File
            .then(() => LoadUtils.loadFile(CoreConstants.general_config_url))
            .then(this.setupGeneralConfigData.bind(this))

            // Load resources
            .then(() => LoadUtils.loadFile(CoreConstants.resources_config_url, true))
            .then(this.setupResourcesData.bind(this, patterns))

            // Load layout
            .then(() => LoadUtils.loadFile(layout_config_url))
            .then(this.setupLayoutConfigData.bind(this));
    }

    protected setupSizeReportData(data: any): Promise<any> {
        this.loadModel.sizeReportData = data;
        return Promise.resolve();
    }

    protected setupResourcesData(patterns: Array<StringReplacement>, data: string): Promise<any> {
        const replacePatternData = StringUtils.replacePatternInText(data, patterns);
        const resourceObject: IResources = JSON.parse(replacePatternData);
        this.loadModel.resourceData = resourceObject;
        return Promise.resolve();
    }

    protected setupLayoutConfigData(data: any): Promise<any> {
        this.layoutModel.layoutConfig = data;
        return Promise.resolve();
    }

    protected setupGeneralConfigData(data: any): Promise<any> {
        this.gameConfig.initialConfig = data;
        return Promise.resolve();
    }

    protected getReplaceUrlPatterns(): Array<StringReplacement> {
        return [
            {pattern: new RegExp("{dpi}", "g"), replacement: this.screenModel.dpi},
            {pattern: new RegExp("{multiply}", "g"), replacement: this.screenModel.multiply.toString()},
            {
                pattern: new RegExp("{platform}", "g"),
                replacement: CoreConstants.deviceType.MOBILE ? 'mobile' : 'desktop'
            },
        ];
    }
}