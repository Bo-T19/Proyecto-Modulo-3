import * as React from "react";


import { Project } from "../class/Project";
import { ToDoItem } from "./ToDoItem";
import { ToDo } from "../class/ToDo";
import { ToDosManager } from "../class/ToDosManager";


interface Props {
    project: Project
    onOpenForm: () => void;
}

export function ToDoList(props: Props) {
    //States
    const [toDosList, setToDosList] = React.useState<ToDo[]>(props.project.toDosManager.toDosList);

    props.project.toDosManager.onToDoCreated = () => {
        setToDosList([...props.project.toDosManager.toDosList])
        console.log(toDosList)
    }

    props.project.toDosManager.onToDoEdited = () => {
        setToDosList([...props.project.toDosManager.toDosList])
    }


    // Update the todos list

    const toDoItems = toDosList.map((toDo) => {
        return (

            <ToDoItem toDo={toDo} key={toDo.id}/>
        )
    })
    return (
        <div className="dashboard-card" style={{ flexGrow: 1 }}>
            <div
                style={{
                    padding: "20px 30px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between"
                }}
            >
                <h4>To-Do</h4>
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "end",
                        columnGap: 20
                    }}
                >
                    <div
                        style={{ display: "flex", alignItems: "center", columnGap: 10 }}
                    >
                        <span className="material-icons-round">search</span>
                        <input
                            type="text"
                            placeholder="Search To-Do's by name"
                            style={{ width: "100%" }}
                        />
                    </div>
                    <span id="add-todo" className="material-icons-round" onClick={props.onOpenForm}>
                        add
                    </span>
                </div>
            </div>
            <div
                id="todo-list"
                style={{
                    display: "flex",
                    flexDirection: "column",
                    padding: "10px 30px",
                    rowGap: 20
                }}
            >
                {props.project.toDosManager.toDosList.length > 0 ? <div id="todos-list">{toDoItems}</div> : <p> There are no tasks</p>}

            </div>
        </div>
    )
}

