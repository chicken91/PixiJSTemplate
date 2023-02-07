import { TemplateLoader } from "./TemplateLoader";
import { CoreActivator } from "../core/src/CoreActivator";
import { CoreContext } from "../core/src/CoreContext";
import { CoreLoader } from "../core/src/CoreLoader";

export class TemplateActivator extends CoreActivator {
    protected getLoader(context: CoreContext): CoreLoader {
        return new TemplateLoader(context);
    }
}