import { bind } from "../../../core/src/factory/di/inject";
import { LoadUtils } from "../../../core/src/utils/LoadUtils";
import { IResources } from "../../../core/src/types/interface/IResources";
import { Action } from "../../../core/src/actions/Action";
import { CoreConstants } from "../../../core/src/types/constant/CoreConstants";
import { StringReplacement } from "../../../core/src/types/interface/CoreTypes";
import { StringUtils } from '../../../core/src/utils/StringUtils';
import { BOAGameModel } from "../../models/BOAGameModel";

@bind({singleton: true})
export class LoadConfigAction extends Action<BOAGameModel> {

    protected onExecute(): void {
        this.loadConfigsPromise()
            .then(this.onFinish.bind(this));
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
        this.model.loadModel.sizeReportData = data;
        return Promise.resolve();
    }

    protected setupResourcesData(patterns: Array<StringReplacement>, data: string): Promise<any> {
        const replacePatternData = StringUtils.replacePatternInText(data, patterns);
        const resourceObject: IResources = JSON.parse(replacePatternData);
        this.model.loadModel.resourceData = resourceObject;
        return Promise.resolve();
    }

    protected setupLayoutConfigData(data: any): Promise<any> {
        this.model.layoutModel.layoutConfig = data;
        return Promise.resolve();
    }

    protected setupGeneralConfigData(data: any): Promise<any> {
        this.model.config.Initialize(data);
        return Promise.resolve();
    }

    protected getReplaceUrlPatterns(): Array<StringReplacement> {
        return [
            {pattern: new RegExp("{dpi}", "g"), replacement: this.model.screenModel.dpi},
            {pattern: new RegExp("{multiply}", "g"), replacement: this.model.screenModel.multiply.toString()},
            {
                pattern: new RegExp("{platform}", "g"),
                replacement: CoreConstants.deviceType.MOBILE ? 'mobile' : 'desktop'
            },
        ];
    }
}
