import { IToDo, ToDo, TaskStatus } from './ToDo'


export class ToDosManager {

    //Class internals
    toDosList: IToDo[]

    onToDoCreated = () => {}
    onToDoEdited = () => {}

    constructor(toDosList: IToDo[]) {
        this.toDosList = toDosList
    }

    addToDo(data: IToDo) {

        let color: string

        if (data.date.toDateString() == "Invalid Date") {
            data.date = new Date(2024, 1, 1)
        }

        const toDo = new ToDo(data)

        this.toDosList.push(toDo)
        this.onToDoCreated()
    }


    getTaskByDescription(taskDescription: string) {

        const task = this.toDosList.find((task) => {
            return task.description === taskDescription
        })

        return task
    }

    editTaskStatus(taskDescription: string, newStatus: TaskStatus) {
        this.getTaskByDescription(taskDescription)!.status = newStatus
        this.onToDoEdited()
    
    }

}


