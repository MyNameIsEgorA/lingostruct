import {makeAutoObservable, reaction} from "mobx";
import type {IProjectModal} from "@/types/Project";
import {onClientSide} from "@/helpers/decorators/clientSide";
import {startOfToday} from "date-fns";

class ProjectInfoModalStore {

    public ProjectData: IProjectModal = {
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
        this.loadStateFromStorage()
        reaction(() => JSON.stringify(this.ProjectData), (newProjectDataJSON: string): void => {
            if (newProjectDataJSON !== null) {
                this.saveStateToStorage()
            }
            console.log(this.ProjectData)
        })
    }

    @onClientSide
    protected saveStateToStorage(): void {
        sessionStorage.setItem("newProjectData", JSON.stringify(this.ProjectData))
    }

    @onClientSide
    protected loadStateFromStorage(): void {
        const data: string | null = sessionStorage.getItem("newProjectData")
        if (data) {
            const parsedData = JSON.parse(data)
            if (parsedData.startDate) {
                parsedData.startDate = new Date(parsedData.startDate)
            }
            if (parsedData.endDate) {
                parsedData.endDate = new Date(parsedData.endDate)
            }
            this.ProjectData = parsedData
        }
    }

    public get projectName(): string {
        return this.ProjectData.projectName
    }
    public get projectCode(): string {
        return this.ProjectData.projectCode
    }
    public get projectColor(): string {
        return this.ProjectData.projectCode
    }
    public get startDate(): Date {
        return new Date(this.ProjectData.startDate)
    }
    public get endDate(): Date | null {
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

    public setProjectName(name: string): void {
        this.ProjectData.projectName = name
    }
    public setProjectCode(code: string) {
        this.ProjectData.projectCode = code
    }
    public setProjectColor(color: string) {
        this.ProjectData.color = color
    }
    public setStartDate = (date: Date): void => {
        this.ProjectData.startDate = date
        console.log(date)
    }
    public setEndDate = (date: Date): void => {
        console.log(date)
        this.ProjectData.endDate = date
    }
    public setDescription(description: string) {
        this.ProjectData.projectDescription = description
    }
    public setCost(cost: string) {
        this.ProjectData.projectCost = cost
    }
    public setProjectData(data: IProjectModal) {
        this.ProjectData = data;
    }

}


const projectInfoModalStore = new ProjectInfoModalStore()
export default projectInfoModalStore