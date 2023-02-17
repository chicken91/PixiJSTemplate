import { BounceAnimationConfig } from "./BounceAnimationConfig";
import { DropAnimationConfig } from "./DropAnimationConfig";

export class ReelConfig {
    public id: number;
    public direction: number;
    public symbolCount: number;
    public extraSymbolCount: number;
    public initialSymbols: number[];
    public bounceUp: BounceAnimationConfig;
    public bounceDown: BounceAnimationConfig;
    public drop: DropAnimationConfig;
}
