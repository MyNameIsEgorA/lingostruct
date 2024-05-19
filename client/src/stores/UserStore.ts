import {makeAutoObservable} from "mobx";

import {IUserNavBar} from "@/types/User";
import {IOrganizationLink} from "@/types/Organizations";

class UserStore {

    status: string = "initial"
    activeOrganization: string = ""

    constructor() {
        makeAutoObservable(this)
    }

    getNavBarData = async (): Promise<IUserNavBar | undefined> => {
        const organizationsList: IOrganizationLink[] = [{title: "Strabag", URL:"123"}, {title: "HH.RU", URL:"234"}, {title: "avito", URL:"2345"}]
        try {
            this.activeOrganization = organizationsList[0].title;
            return {
                organizations: organizationsList,
                email: "eanahin8v@mail.ru",
                activities: 99,
                name: "Anakhin Egor",
                projects: ["Постройка дома", "Постройка дачи"],
            }
        } catch (e) {
            return undefined
        }
    }
}


const userStore: UserStore = new UserStore()
export default userStore;