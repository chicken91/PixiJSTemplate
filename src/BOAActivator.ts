import { BOALoader } from "./BOALoader";
import { CoreActivator } from "../core/src/CoreActivator";
import { CoreContext } from "../core/src/CoreContext";
import { CoreLoader } from "../core/src/CoreLoader";

export class BOAActivator extends CoreActivator {
    protected getLoader(context: CoreContext): CoreLoader {
        return new BOALoader(context);
    }
}
