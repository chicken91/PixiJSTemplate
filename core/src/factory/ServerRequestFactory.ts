import { InitRequestDTO } from "../models/data/server/requestDto/InitRequestDTO";
import { AbstractRequestDTO } from "../models/data/server/requestDto/AbstractRequestDTO";
import { ServerRequestType } from '../types/ServerRequestType';
import { ServerRequestData } from "../models/data/server/ServerRequestData";
import { bind } from "./di/inject";

@bind({singleton: true})
export class ServerRequestFactory {
    public getServerRequestData(request: ServerRequestData): AbstractRequestDTO {
        switch (request.type) {
            case ServerRequestType.INIT:
                return this.createInitRequest();
            default:
                throw new Error("You are trying create request with missing type [" + request.type + "]");
        }
    }

    protected createInitRequest(): InitRequestDTO {
        return new InitRequestDTO();
    }
}
