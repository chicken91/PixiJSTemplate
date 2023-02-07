export class AssetsGroupData {
    private _assetsCount = 0;
    private _onLoadCallbackList: Array<Function> = [];

    public addLoadCallback(onLoadCallback: Function): void {
        this._onLoadCallbackList.push(onLoadCallback);
    }

    public increaseAssetsCount(): void {
        this._assetsCount++;
    }

    public decreaseAssetsCount(): void {
        this._assetsCount--;
        if (this._assetsCount === 0) {
            this.executeLoadCallbacks();
        }
    }

    public isGroupLoaded(): boolean {
        return this._assetsCount === 0;
    }

    protected executeLoadCallbacks(): void {
        for (let onLoadCallback of this._onLoadCallbackList) {
            onLoadCallback();
        }
    }

    public get assetsCount(): number {
        return this._assetsCount;
    }
}