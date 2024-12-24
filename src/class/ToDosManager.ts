import { IToDo, ToDo, TaskStatus } from './ToDo'

export interface IToDosManager{
    toDosList: ToDo[] 
}

export class ToDosManager {

    //To Satisfy IToDosManager
    toDosList: ToDo[] = []


    //Class internals
    onToDoCreated = () => {}
    onToDoEdited = () => {}


    addToDo(data: IToDo) {

        let color: string

        if (data.date.toDateString() == "Invalid Date") {
            data.date = new Date(2024, 1, 1)
        }

        const toDo = new ToDo(data)

        this.toDosList.push(toDo)
        this.onToDoCreated()
    }


    getTaskById(taskId: string) {

        const task = this.toDosList.find((task) => {
            return task.id === taskId
        })

        return task
    }

    editTask(taskId: string, data: IToDo) {


        const task = this.getTaskById(taskId)!

        if (data.date.toDateString() == "Invalid Date") {
            data.date = new Date(2024, 1, 1)
        }

        for (const key in data) {
            if (task.hasOwnProperty(key) && data[key]) {
                task[key] = data[key];
            }
        }
        task.setColor()
        this.onToDoEdited()
    
    }

}


