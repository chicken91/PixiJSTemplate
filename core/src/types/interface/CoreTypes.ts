import { ServerRequestData } from "../../models/data/server/ServerRequestData";

export interface StringReplacement {
    pattern: RegExp,
    replacement: string
}

export interface IResponse {
    id: number;
    status: string;
}

export interface IExtendedResponse extends IResponse {
    request: ServerRequestData;
}

export interface IStateMachineOptions {
    initialState: Function;
    transitions: IStateMachineTransition[];
}

export interface IStateMachineTransition {
    from: Function[];
    to: Function;
}
