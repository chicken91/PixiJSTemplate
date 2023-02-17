import { SymbolConfig } from "../../../models/config/slot/SymbolConfig";
import { SymbolView } from "./SymbolView";

export class AvalancheSymbolView extends SymbolView {
    public config: SymbolConfig;
    public dropCell: number;

    public Initialize(config: SymbolConfig): void {
        super.Initialize(config);
    }
}
