import {makeAutoObservable} from "mobx";
import {IProjectModal} from "@/types/Project";
import {onClientSide} from "@/helpers/decorators/clientSide";


class ProjectInfoModalStore {

    private ProjectData: IProjectModal = {
        projectName: "",
        projectCode: "",
        color: "#000000",
        startDate: new Date(),
        endDate: new Date(),
        projectDescription: "",
        projectCost: "",
    }

    constructor() {
        makeAutoObservable(this)
        this.getDataFromSessionStorage()
    }

    @onClientSide
    private setDataInSessionStorage(): void {
        sessionStorage.setItem("newProjectData", JSON.stringify(this.ProjectData))
    }

    @onClientSide
    private getDataFromSessionStorage(): void {
        const data: string | null = sessionStorage.getItem("newProjectData")
        if (data) {
            this.ProjectData = JSON.parse(data)
        }
    }

    public get projectName(): string {
        return this.ProjectData.projectName
    }
    public get projectColor(): string {
        return this.ProjectData.projectCode
    }
    public get startDate(): Date {
        return this.ProjectData.startDate
    }
    public get endDate(): Date {
        return this.ProjectData.endDate
    }
    public get projectDescription(): string {
        return this.ProjectData.projectDescription
    }
    public get projectCost(): string {
        return this.ProjectData.projectCost
    }
    public get projectData(): IProjectModal {
        return this.ProjectData
    }
    public set setProjectName(name: string) {
        this.ProjectData.projectName = name
    }
    public set setProjectCode(code: string) {
        this.ProjectData.projectCode = code
    }
    public set setProjectColor(color: string) {
        this.ProjectData.color = color
    }
    public set setStartDate(date: Date) {
        this.ProjectData.startDate = date
    }
    public set setEndDate(date: Date) {
        this.ProjectData.endDate = date
    }
    public set setDescription(description: string) {
        this.ProjectData.color = description
    }
    public set setCost(cost: string) {
        this.ProjectData.projectCost = cost
    }
    public set setProjectData(data: IProjectModal) {
        this.ProjectData = data;
    }

}


const projectInfoModalStore = new ProjectInfoModalStore()
export default projectInfoModalStore