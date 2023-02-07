import { EventDispatcher } from "./EventDispatcher";
import { bind, inject } from "../factory/di/inject";
import { ServerRequestFactory } from "../factory/ServerRequestFactory";
import { CoreEvents } from "../types/CoreEvents";
import { AbstractRequest } from "../models/requestDto/AbstractRequest";
import { ServerRequestData } from "../models/data/ServerRequestData";
import { IExtendedResponse, IResponse } from '../types/interface/CoreTypes';
import { GameModel } from "../models/GameModel";
import { CreationPriority } from "../factory/di/CreationPriority";

@bind({singleton: true, priority: CreationPriority.HIGH})
export class ServerService {
    protected dispatcher: EventDispatcher = inject(EventDispatcher);
    protected gameModel: GameModel = inject(GameModel);
    protected serverRequestFactory: ServerRequestFactory = inject(ServerRequestFactory);
    protected requestMap: { [requestId: number]: ServerRequestData } = {};
    protected currentRequest: AbstractRequest | undefined;
    protected requestQueue: Array<AbstractRequest> = [];

    constructor() {
        this.addListeners();
    }

    protected addListeners(): void {
        this.dispatcher.addListener(CoreEvents.SERVER_REQUEST, this.onServerRequest.bind(this));
        // this.serverApi.observeEvent("ServerResponseEventName", this.onServerResponse.bind(this));
    }

    protected onServerResponse(data: IResponse): void {
        console.log(`%c` + `[ServerManager] get with data bellow:`, `color:#008ae6;font-weight:bold`);
        console.log(data);

        const extendedResponse = this.updateResponse(data);
        this.parseResponse(extendedResponse);
        this.invokeRequestCallback(data);
        this.checkServerError(data);

        this.currentRequest = undefined;
        this.sendRequestFromQueue();
    }

    protected onServerRequest(serverRequestData: ServerRequestData): void {
        let request: AbstractRequest = this.getRequestData(serverRequestData);
        this.addRequestCallback(request.id, serverRequestData);
        this.requestQueue.push(request);
        this.sendRequestFromQueue();
    }

    protected sendRequestFromQueue(): void {
        if (this.currentRequest == null) {
            this.currentRequest = this.requestQueue.shift();
            if (this.currentRequest) {
                // this.serverApi.sendEvent("TempRequestEventName", this.currentRequest);
            }
        }
    }

    protected onConnectionLost(data: IResponse): void {
        this.checkServerError(data);
        this.dispatcher.dispatch(CoreEvents.LOST_CONNECTION);
    }

    protected checkServerError(response: IResponse): void {
        if (response.status === "ERROR") {
            console.log(`%c` + ` ERROR COMING FROM THE SERVER `, `color:#ff4000;font-weight:bold`);
            this.dispatcher.dispatch(CoreEvents.SERVER_ERROR, response);
        }
    }

    protected updateResponse(data: IResponse): IExtendedResponse {
        const updatedResponse = data as IExtendedResponse;
        updatedResponse.request = this.requestMap[data.id];
        return updatedResponse;
    }

    protected parseResponse(data: IExtendedResponse): void {

    }

    protected getRequestData(serverRequest: ServerRequestData): AbstractRequest {
        const data = this.serverRequestFactory.getServerRequestData(serverRequest);
        return data;
    }

    protected invokeRequestCallback(response: IResponse): void {
        const request = this.requestMap[response.id];
        if (request) {
            delete this.requestMap[response.id];
            if (request.callBack) {
                request.callBack();
            }
        }
    }

    protected addRequestCallback(requestId: number, serverRequestData: ServerRequestData): void {
        if (serverRequestData) {
            this.requestMap[requestId] = serverRequestData;
        }
    }
}
