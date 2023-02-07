export class LoadUtils {

    public static loadFile(url: string, isText: boolean = false): Promise<any> {
        return new Promise((resolve, reject) => {
            fetch(this.appendHostUrl(url)).then(response => {
                if (!response.ok) {
                    reject(response);
                } else if (isText) {
                    response.text()
                        .then(resolve)
                        .catch(reject);
                } else {
                    response.json()
                        .then(resolve)
                        .catch(reject);
                }
            }).catch(reject);
        });
    }

    public static appendHostUrl(path: string): string {
        return `.${path}`;
    }
}
