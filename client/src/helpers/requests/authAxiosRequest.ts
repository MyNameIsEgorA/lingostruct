import axios, {AxiosInstance, AxiosResponse} from "axios";
import {onClientSide} from "@/helpers/decorators/clientSide";


enum RequestTypes {
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
        baseURL: "http://api.lingostruct.ru/api",
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
            const newToken: AxiosResponse<any, any> = await axios.post("http://api.lingostruct.ru/api/token/refresh/", {
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
            const response: AxiosResponse = await this.instance.get(this.URL);
            this.depth = 0;
            return response;
        } catch (e: any) {
            if (e.response && e.response.status === 401 && this.depth < 2) {
                await this.refreshUserToken();
                this.depth++;
                return this.makeRequest();
            } else {
                window.location.href = "/login";
            }
        }
    }
}

export default Requests