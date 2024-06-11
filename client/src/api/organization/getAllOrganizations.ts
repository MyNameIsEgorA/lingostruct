import {IOrganizationsAPI} from "@/types/Organizations";
import Requests from "@/helpers/requests/authAxiosRequest";

export const getAllOrganizationsList = async (): Promise<{data: IOrganizationsAPI}> => {
    const requestMaker: Requests = new Requests("/task_manager/my_organizations/")
    return await requestMaker.makeRequest()
}