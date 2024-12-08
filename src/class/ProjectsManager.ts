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
defaultProject()
{
    const defaultData: IProject =
    {
        name: "Default Project",
        description: "A temporary project",
        status: "Active",
        userRole: "Architect",
        finishDate: new Date("2024-12-31"),
        cost: 15000,
        progress: 75,
        toDoList : []
    }

    this.newProject(defaultData)

}
}