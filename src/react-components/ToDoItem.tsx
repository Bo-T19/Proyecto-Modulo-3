import * as React from "react";
import { IToDo, ToDo } from "../class/ToDo";



interface Props {
    toDo: ToDo
    onOpenEditForm : () => void;
    sendId: (id: string) => void;
}

export function ToDoItem(props: Props) {

    const handleClick = () =>
    {
        props.sendId(props.toDo.id)
        props.onOpenEditForm()
    }

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: props.toDo.color,
                padding: "10px",
                borderRadius: "10px",
                margin: "10px"
            }}
            onClick={handleClick}
        >
            <div style={{ display: "flex", columnGap: 15, alignItems: "center"}}>
                <span
                    className="material-icons-round"
                    style={{ padding: 10,  borderRadius: 10 }}
                >
                    construction
                </span>
                <p data-project-info="todo-description">
                    {props.toDo.description}
                </p>
            </div>
            <p style={{ textWrap: "nowrap", marginLeft: 10 }}>
                {props.toDo.date.toLocaleDateString("es-ES")}
            </p>
        </div>

    )
}
