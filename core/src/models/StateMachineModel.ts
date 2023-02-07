import { bind } from "../factory/di/inject";

@bind({singleton: true})
export class StateMachineModel {
    protected _activeState!: string;

    public setActiveState(currentState: string): void {
        this._activeState = currentState;
    }

    public get activeState(): string {
        return this._activeState;
    }
}