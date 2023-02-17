import { Container, Point, Rectangle, Sprite, Texture } from 'pixi.js';
import { ButtonViewType } from "../types/ButtonViewType";
import { ObjectView } from "./ObjectView";
import { GameModel } from "../models/GameModel";
import { GameConfig } from "../models/GameConfig";
import { ButtonController } from "./controller/button/ButtonController";
import { EventEmitter } from "eventemitter3";

export class ButtonView extends ObjectView<Container, GameModel<GameConfig>> {
    protected states: { [stateName: string]: Texture } = {};
    protected stateComponents: { [stateName: string]: ObjectView<Container, GameModel<GameConfig>> } = {};
    protected mainSprite: Sprite;
    protected componentContainer: Container;
    protected _currentState: string;
    protected listener: EventEmitter;

    protected controller: ButtonController;

    public onRemoved() {
        this.listener.removeAllListeners();
        this.controller.destroy();
        super.onRemoved();
    }

    public Initialize(controller: ButtonController): void {
        this.controller = controller;
        this.listener = new EventEmitter();

        this.mainSprite = new Sprite();
        this.mainSprite.anchor.set(0.5, 0.5);
        this.object.addChild(this.mainSprite);

        this.componentContainer = new Container();
        this.object.addChild(this.componentContainer);

        this.object.cursor = 'pointer';
        this.object.interactive = true;
    }

    public addButtonEvent(event: string, fn: (buttonView: ButtonView) => void, context: any) {
        this.listener.addListener(event, fn, context);
    }

    public EmitButtonEvent(event: string) {
        this.listener.emit(event, this);
    }

    public setMainImageAnchor(anchor: Point): void {
        this.mainSprite.anchor.set(anchor.x, anchor.y);
    }

    public onResize(width?: number, height?: number): void {
        super.onResize();
    }

    public changeState(state: string, force: boolean = false): void {
        if ((this._currentState === state || this._currentState === this.getDisableState())
            && !force) {
            return;
        }
        this.object.interactive = state !== this.getDisableState();
        this._currentState = state;
        this.updateStateTexture(state);
    }

    public setHitArea(hitArea: Rectangle) {
        this.object.hitArea = hitArea;
    }

    protected updateStateTexture(state: string): void {
        const texture: Texture = this.states[state];
        if (texture) {
            this.mainSprite.texture = texture;
        }

        const component = this.stateComponents[state];
        if (component) {
            this.componentContainer.removeChildren();
            this.componentContainer.addChild(component.object);
            component.onResize();
        }
    }

    public setStateTexture(stateName: string, stateTexture: Texture): void {
        this.states[stateName] = stateTexture;
        if (stateName === this._currentState) {
            this.updateStateTexture(stateName);
        }
    }

    public setStateComponent(stateName: string, component: ObjectView<Container, GameModel<GameConfig>>): void {
        this.stateComponents[stateName] = component;
    }

    protected getDisableState(): string {
        return ButtonViewType.DISABLE;
    }

    public get currentState(): string {
        return this._currentState;
    }
}

