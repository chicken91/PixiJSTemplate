export class InjectionUtils {
    private static UNIQUE_ID_ATTRIBUTE_NAME: string = "bindUniqueId";
    private static bindUniqueId: number = 0;

    public static getUniqueAttributeId(constructor: Function): string {
        if (constructor.hasOwnProperty(this.UNIQUE_ID_ATTRIBUTE_NAME)) {
            return constructor[this.UNIQUE_ID_ATTRIBUTE_NAME];
        } else {
            this.bindUniqueId++;
            let uniqueId: string = this.bindUniqueId.toString();
            constructor[this.UNIQUE_ID_ATTRIBUTE_NAME] = uniqueId;
            return uniqueId;
        }
    }
}