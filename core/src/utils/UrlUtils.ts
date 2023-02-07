export class UrlUtils {
    private static _url: URL = new URL(window.location.href);

    public static getParameter(parameter: string): string | null {
        return this._url.searchParams.get(parameter);
    }
}