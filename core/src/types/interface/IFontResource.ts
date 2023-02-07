import { IBaseResource } from "./IBaseResource";

export interface IFontResource extends IBaseResource {
    family: string;
    fontUrl: string
}