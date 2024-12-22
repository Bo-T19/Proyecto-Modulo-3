import * as React from "react"

interface Props {
    onChange: (value: string) => void
    typeOfSearchBox: "project" | "task"
}

export function SearchBox(props: Props) {

    const placeholderText =
        props.typeOfSearchBox === "project"
            ? "Search project by name"
            : "Search task by description";

    const containerWidth = props.typeOfSearchBox === "project" ? "40%" : "100%";
    return (
        <div style={{
            display: "flex", alignItems: "center", columnGap: 10,
            width: containerWidth
        }}>
            <input
                onChange={(e) => { props.onChange(e.target.value) }}
                type="text"
                placeholder={props.typeOfSearchBox == "project" ? "Search project by name" : "Search task by description"}
                style={{ width: "100%", height: "20px", backgroundColor: "white" , color: "black"}} />
        </div>
    )

}