import Requests from "@/helpers/requests/authAxiosRequest";
import {IUserProfile} from "@/types/User";

export const getUserProfile = async (): Promise<IUserProfile> => {
    const requestMaker: Requests = new Requests("/profile/my_profile/")
    const result = await requestMaker.makeRequest()
    return result.data.user
}