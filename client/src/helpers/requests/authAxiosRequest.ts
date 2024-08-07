import axios, {Axios, AxiosError, AxiosInstance, AxiosResponse} from "axios";
import {onClientSide} from "@/helpers/decorators/clientSide";


const baseURL: string = "http://45.89.189.236/api/"


export enum RequestTypes {
    GET = 1,
    POST,
    PATCH,
    PUT,
    DELETE,
    OPTIONS,
}


class Requests {

    private accessToken: string = ""
    private refreshToken: string = ""
    private readonly URL: string = ""
    private readonly body: {} = {}
    private readonly header: {} = {}
    private readonly type: RequestTypes = RequestTypes.GET;
    private depth: number = 0

    private instance: AxiosInstance = axios.create({
        baseURL: baseURL,
        timeout: 3000,
        headers: {},
    })

    constructor(url: string, type?: RequestTypes, body?: {}, header?: {}) {
        this.URL = url;
        if (body) {
            this.body = body;
        }
        if (header) {
            this.header = header;
        }
        if (type) {
            this.type = type
        }
        this.getUserToken()
    }

    @onClientSide
    private getUserToken(): void | false {
        const token: string | null = sessionStorage.getItem("UserToken")
        if (token === null) {
            window.location.href = '/login'
            return;
        }
        const tokenData = JSON.parse(token)
        this.accessToken = tokenData.access
        this.refreshToken = tokenData.refresh
        this.instance.defaults.headers.common["Authorization"] = `JWT ${this.accessToken}`
    }

    @onClientSide
    private refreshSessionStorage(): void {
        sessionStorage.setItem("UserToken", JSON.stringify(
            {
                refresh: this.refreshToken,
                access: this.accessToken}
        ))
    }

    @onClientSide
    private async refreshUserToken(): Promise<void> {
        try {
            const newToken: AxiosResponse<any, any> = await axios.post(baseURL + "token/refresh/", {
                refresh: this.refreshToken
            }, { headers: { "Content-Type": "application/json" } })
            this.accessToken = newToken.data.access;
            this.instance.defaults.headers.common["Authorization"] = `JWT ${this.accessToken}`;
            this.refreshSessionStorage();
        } catch (e) {
            window.location.href = "/login";
        }
    }

    public async makeRequest(): Promise<any> {
        try {
            let response: AxiosResponse;
            switch (this.type) {
                case RequestTypes.GET:
                    response = await this.instance.get(this.URL);
                    this.depth = 0;
                    return response
                case RequestTypes.POST:
                    response = await this.instance.post(this.URL, this.body);
                    console.log(response.status)
                    this.depth = 0;
        }}
        catch (e: any) {
            if (e.response.status !== 401) {
                return e.response.status
            }
            if (e.response && e.response.status === 401 && this.depth < 2) {
                await this.refreshUserToken();
                this.depth++;
                return this.makeRequest();
            } else {
                    window.location.href = "/login"
            }
        }
    }
}

export default Requests