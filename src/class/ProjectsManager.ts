import { IProject, Project, ProjectStatus, UserRole } from "./Project"
import { ToDo } from './ToDo'

//Class
export class ProjectsManager {

    list: Project[] = []

    onProjectCreated = (project: Project) => { }

    onProjectDeleted = (id) => { }

    projectNames: string[] = []

    //Create new project
    newProject(data: IProject, id?: string) {

        const nameInUse = this.projectNames.includes(data.name)
        if (nameInUse) {
            throw new Error(`A project with name "${data.name}" already exists`)
        }

        if (data.name.length < 5) {
            throw new Error(`The name must have at least 5 characters`)
        }

        if (isNaN(data.finishDate.getDate())) {
            data.finishDate = new Date(2024, 1, 1)
        }

        const project = new Project(data, id)

        this.list.push(project)
        this.projectNames.push(project.name)
        this.onProjectCreated(project)

        console.log(this.projectNames)
        console.log(this.list)
        return project
    }

    //Create a default project (this should be deleted later)
    defaultProject() {
        const defaultData: IProject =
        {
            name: "Default Project",
            description: "A temporary project",
            status: "Active",
            userRole: "Architect",
            finishDate: new Date("2024-12-31"),
            cost: 15000,
            progress: 75,
            toDoList: []
        }

        this.newProject(defaultData)
    }

    //Get a project by name
    getProjectByName(name: string) {
        const project = this.list.find((project) => {
            return project.name === name
        })
        return project
    }

    //Edit project data
    editProject(project: Project, completeData: IProject) {

        const projectNames = this.list.map((project) => {
            return project.name
        })

        const nameInUse = projectNames.includes(completeData.name)
        if (completeData.name) {

            if (nameInUse && completeData.name !== project.name) {
                throw new Error(`A project with name "${completeData.name}" already exists`)
            }

            if (completeData.name.length < 5) {
                throw new Error(`The name must have at least 5 characters`)
            }
        }


        for (const key in completeData) {
            if (project.hasOwnProperty(key) && completeData[key]) {
                project[key] = completeData[key];
            }
        }
    }

    //Import a project from JSON or export a project from JSON

    exportToJSON(fileName: string = "projects") {
        const json = JSON.stringify(this.list, null, 2)
        const blob = new Blob([json], { type: "application/json" })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = fileName
        a.click()
        URL.revokeObjectURL(url)
    }

    importFromJSON() {
        const input = document.createElement('input')
        input.type = 'file'
        input.accept = 'application/json'
        const reader = new FileReader()
        reader.addEventListener("load", () => {
            const json = reader.result
            if (!json) { return }
            const projects: IProject[] = JSON.parse(json as string)


            for (const project of projects) {
                const nameInUse = this.projectNames.includes(project.name)
                if (nameInUse) {
                    try {
                        const updateProjectData: IProject =
                        {
                            name: project.name,
                            userRole: project.userRole,
                            status: project.status,
                            description: project.description,
                            finishDate: new Date(project.finishDate),
                            cost: project.cost,
                            progress: project.progress,
                            toDoList: project.toDoList
                        }

                        this.editProject(this.getProjectByName(project.name)!, updateProjectData)
                    }
                    catch (error) {
                        console.log(error)
                    }
                }
                else {
                    try {
                        const newProjectData: IProject =
                        {
                            name: project.name,
                            userRole: project.userRole,
                            status: project.status,
                            description: project.description,
                            finishDate: new Date(project.finishDate),
                            cost: project.cost,
                            progress: project.progress,
                            toDoList: project.toDoList
                        }
                        this.newProject(newProjectData)
                    } catch (error) {

                    }
                }
            }
        })

        input.addEventListener('change', () => {
            const filesList = input.files
            if (!filesList) { return }
            reader.readAsText(filesList[0])

        })
        input.click()
    }

    //GetProject by ID
    getProject(id: string) {
        const project = this.list.find((project) => {
            return project.id === id
        })
        return project
    }

}