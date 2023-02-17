import { ServerUtils } from "../../../../utils/ServerUtils";


export abstract class AbstractRequestDTO {
    public id!: number;
    public date!: string;

    constructor() {
        this.id = ServerUtils.getRequestId();
        this.date = new Date().toISOString();
    }
}

