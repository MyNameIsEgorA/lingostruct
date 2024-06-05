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

    constructor(url: string, type: RequestTypes, body?: {}, header?: {}) {

    }

    @onClientSide
    getUserToken(): void | false {
        const token: string | null = sessionStorage.getItem("UserToken")
        if (token === null) {
            window.location.href = '/login'
            return;
        }
        console.log(JSON.parse(token))
        this.accessToken = JSON.parse(token)
    }

    // async authAxiosRequest(): Promise<false | AxiosInstance> {
    //
    //
    // }
}

export default Requests