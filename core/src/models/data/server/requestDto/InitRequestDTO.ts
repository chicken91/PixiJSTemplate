import { AbstractRequestDTO } from "./AbstractRequestDTO";

export class InitRequestDTO extends AbstractRequestDTO {
    public init: boolean;

    constructor() {
        super();
        this.init = true;
    }
}
