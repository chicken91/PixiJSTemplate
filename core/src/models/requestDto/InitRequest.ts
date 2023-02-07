import { AbstractRequest } from "./AbstractRequest";

export class InitRequest extends AbstractRequest {
    public init: boolean;

    constructor() {
        super();
        this.init = true;
    }
}