export class ServerUtils {
    private static _ngsRequestId: number = 0;

    public static getRequestId(): number {
        this._ngsRequestId++;
        return this._ngsRequestId;
    }

    public static parseConfiguration(value: string): any {
        if (value === "true") {
            return true;
        } else if (value === "false") {
            return false;
        } else if (!isNaN(parseInt(value))) {
            return parseInt(value);
        } else {
            return value;
        }
    }
}