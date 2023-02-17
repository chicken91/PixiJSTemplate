import { ReelConfig } from "./slot/ReelConfig";
import { SymbolConfig } from "./slot/SymbolConfig";

export class SlotConfig {
    public behavior: string;
    public spinTime: number;
    public startSpinDelay: number;
    public stopSpinDelay: number;
    public spinSpeed: number;
    public cellSize: number[];
    public reels: ReelConfig[];
    public symbols: SymbolConfig[];
}
