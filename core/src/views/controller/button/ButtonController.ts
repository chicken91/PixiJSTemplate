import { ButtonView } from "../../ButtonView";
import { ButtonEventType } from "../../../types/ButtonEventType";
import { ButtonViewType } from "../../../types/ButtonViewType";

export class ButtonController {
    protected buttonView: ButtonView;
    protected _clickStarted: boolean = false;

    constructor(buttonView: ButtonView) {
        this.buttonView = buttonView;

        this.buttonView.object
            .addListener('pointerdown', this.onButtonDown, this)
            .addListener('pointerup', this.onButtonUp, this)
            .addListener('pointerupoutside', this.onPointerUpOutside, this)
            .addListener('pointerover', this.onButtonOver, this)
            .addListener('pointerout', this.onButtonOut, this);

        this.buttonView.Initialize(this);
    }

    protected onButtonDown(event): void {
        event.stopPropagation();
        this._clickStarted = true;
        this.buttonView.changeState(ButtonViewType.DOWN);
    }


    protected onButtonUp(event): void {
        event.stopPropagation();
        this.buttonView.changeState(ButtonViewType.NORMAL);
        this.makeClick();
    }

    protected makeClick(): void {
        if (this._clickStarted) {
            this.buttonView.EmitButtonEvent(ButtonEventType.CLICK);
        }
        this._clickStarted = false;
    }

    protected onButtonOver(): void {
        this.buttonView.changeState(ButtonViewType.OVER);
    }

    protected onButtonOut(): void {
        this.buttonView.changeState(ButtonViewType.NORMAL);
    }

    protected onPointerUpOutside(): void {
        this.onButtonOut();
        this._clickStarted = false;
    }

    public destroy(): void {
        this.buttonView.object
            .removeListener('pointerdown', this.onButtonDown, this)
            .removeListener('pointerup', this.onButtonUp, this)
            .removeListener('pointerupoutside', this.onPointerUpOutside, this)
            .removeListener('pointerover', this.onButtonOver, this)
            .removeListener('pointerout', this.onButtonOut, this);
    }
}
