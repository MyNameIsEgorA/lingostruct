import Requests, { RequestTypes } from "@/helpers/requests/authAxiosRequest"
import { AxiosResponse } from "axios";

export const resetPassword = async (password: string, newPassword: string, repeatPassword: string): Promise<boolean> => {
    const requestsMaker: Requests = new Requests("/profile/set_new_password/1/", RequestTypes.PATCH, {password, repeatPassword, newPassword}) // TODO: Fix when api will be changed
    const res: AxiosResponse = await requestsMaker.makeRequest()
    console.log(res)
    return res.status === 200;
}

