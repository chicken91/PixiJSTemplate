import { IBaseResource } from "./IBaseResource";

export interface IImageResource extends IBaseResource {
    atlas: string,
    src: string
}