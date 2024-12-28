//Create the ProjectStatus and the ProjectType types
export type ProjectStatus = "Pending" | "Active" | "Finished"
export type ProjectType = "Infrastructure" | "Housing" | "Private sector"

import { v4 as uuidv4 } from 'uuid'


import { IToDosManager, ToDosManager } from './ToDosManager'

//Project interface
export interface IProject {
    name: string
    description: string
    status: ProjectStatus
    projectType: ProjectType
    finishDate: Date
    cost: number
    progress: number
    toDosManager: IToDosManager
}

//Class
export class Project implements IProject {

    //To satisfy IProject
    name: string
    description: string
    status: ProjectStatus
    projectType: ProjectType
    finishDate: Date
    cost: number = 0
    progress: number = 0
    

    //Class internals
    id: string
    initials: string
    toDosManager: ToDosManager
    color: string
    
    


    constructor(data: IProject, id =uuidv4() ) {
        for (const key in data) {
          this[key] = data[key]
        }

        this.id = id
        this.initials = this.name[0].toUpperCase() + this.name[1].toUpperCase()
        
        this.toDosManager = new ToDosManager()  


      }

}


