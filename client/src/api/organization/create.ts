import {IFullOrganizationInfo} from "@/types/Organizations";
import Requests, {RequestTypes} from "@/helpers/requests/authAxiosRequest";

export const createOrganization = async (data: IFullOrganizationInfo): Promise<number> => {
    console.log(data)
    const requestMaker: Requests = new Requests("/task_manager/organization/create/", RequestTypes.POST, data)
    return await requestMaker.makeRequest()
}