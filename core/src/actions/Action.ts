import { IAction, IStateInfo } from './IAction';
import { EventDispatcher } from '../service/EventDispatcher';
import { inject } from '../factory/di/inject';
import { EventEmitter } from "eventemitter3";
import { GameModel } from "../models/GameModel";
import { GameConfig } from "../models/GameConfig";

export class Action<M extends GameModel<GameConfig>> implements IAction {
    protected dispatcher: EventDispatcher = inject(EventDispatcher);
    protected model: M = inject(GameModel);
    protected _stateInfo!: IStateInfo;

    private _mainResolve!: Function;
    private _finished: boolean = false;
    private _listeners: Listener[] = [];

    /**
     * Defines if the method can be run at the moment. If false, method will not start and
     * resolves imidiately
     */
    public guard(stateInfo: IStateInfo): boolean {
        return true;
    }

    /**
     * Defines if the action can be terminated
     */
    protected isTerminable(): boolean {
        return true;
    }

    /**
     * Logic of action after it starts.
     * Note: to resolve the action you need to run onFinish() method
     * @param actionInfo defines the behabior of action with such properties as {isTerminating}. This parameter
     * forwarded to the next actions
     */
    protected onExecute(): void {
        this.onFinish();
    }

    /**
     * Logic if termination is triggered.
     * Note: to resolve the action you need to run onFinish() method
     * @param actionInfo defines the behabior of action with such properties as {isTerminating}. This parameter
     * forwarded to the next actions
     */
    protected onTerminate(): void {
        this.onFinish();
    }

    /**
     * Clear all listeners, timers, etc here. This method is triggered before resolving an action
     */
    protected clearAction(): void {

    }

    protected addListener(event: string, fn: EventEmitter.EventListener<string, string>): void {
        this._listeners.push({event, fn});
        this.dispatcher.addListener(event, fn, this);
    }

    protected clearListeners(): void {
        for (let i: number = 0; i < this._listeners.length; i++) {
            const listener: Listener = this._listeners[i];
            this.dispatcher.removeListener(listener.event, listener.fn, this);
        }
    }

    /**
     * Final method. It is deprecated to override it.
     *
     * Run this method in the end of your flow.
     * If you want to clear action after it's done please use clearAction() method
     */
    protected onFinish(): void {
        console.log(`%c` + `Action 'finished' -> %c ${this.constructor.name}`, `color:#008ae6;font-weight:bold`);
        this.clearAction();
        this.clearListeners();

        if (!this._finished) {
            this._finished = true;
            this._stateInfo['lastAction'] = this;
            this._mainResolve(this._stateInfo);
        }
    }

    /**
     * Final method. It is deprecated to override it.
     *
     * Method to run current action. Will return the promise and resolves when finished
     *
     * @param stateInfo defines the behabior of action with such properties as {isTerminating}. This parameter
     * forwarded to the next actions
     */
    public run(stateInfo: IStateInfo, callback: Function): void {
        this._stateInfo = stateInfo;

        console.log(`Run action -> %c ${this.constructor.name}`, `color:#44cc33;font-weight:bold`);

        this._finished = false;
        this._mainResolve = callback;
        this.onExecute();
    }

    /**
     * Final method. It is deprecated to override it.
     *
     * Method to initiate quicker end of the action if it is possible
     *
     * @param actionInfo defines the behabior of action with such properties as {isTerminating}. This parameter
     * forwarded to the next actions
     */
    public terminate(): void {
        if (!this._finished && this.isTerminable()) {
            this._stateInfo.isTerminating = true;

            this.onTerminate();
        }
    }

    public get finished(): boolean {
        return this._finished;
    }
}

type Listener = {
    event: string;
    fn: EventEmitter.EventListener<string, string>;
};
