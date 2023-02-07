import { IBaseResource } from "../../types/interface/IBaseResource";

export abstract class AbstractLoaderProvider {
    public abstract load(): Promise<any>;

    public abstract prepare(data: IBaseResource): void;

    public abstract get type(): string;
}