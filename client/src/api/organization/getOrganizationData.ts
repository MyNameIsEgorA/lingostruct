import Requests from "@/helpers/requests/authAxiosRequest";

import {IOrganizationPage} from "@/types/Organizations";

export const getOrganizationData = async (id: number): Promise<IOrganizationPage> => {
    const RequestMaker = new Requests(`/task_manager/organization/${id}/`)
    const response: {data: IOrganizationPage} = await RequestMaker.makeRequest()
    return response.data
}