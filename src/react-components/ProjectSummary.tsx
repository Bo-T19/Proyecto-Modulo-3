import * as React from "react";

import { Project } from "../class/Project";
import { ProjectsManager } from "../class/ProjectsManager";

interface Props {
    project: Project
    projectsManager : ProjectsManager
    onOpenForm: () => void;
}

export function ProjectSummary(props: Props) {

    return (<div className="dashboard-card" style={{ padding: "30px 0" }}>
        <div
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "0px 30px",
                marginBottom: 30
            }}
        >
            <p
                data-project-info="name-initials"
                style={{
                    fontSize: 20,
                    backgroundColor: `${props.project.color}`,
                    aspectRatio: 1,
                    borderRadius: "100%",
                    padding: 12
                }}
            >
                {props.project.initials}
            </p>
            <button onClick = {props.onOpenForm} id="edit-project" className="btn-secondary">
                <p style={{ width: "100%" }}>Edit</p>
            </button>
        </div>
        <div style={{ padding: "0 30px" }}>
            <div>
                <h5 data-project-info="name">{props.project.name}</h5>
                <p data-project-info="description">
                    {props.project.description}
                </p>
            </div>
            <div
                style={{
                    display: "flex",
                    columnGap: 30,
                    padding: "30px 0px",
                    justifyContent: "space-between"
                }}
            >
                <div>
                    <p style={{ color: "#969696", fontSize: "var(--font-sm)" }}>
                        Status
                    </p>
                    <p data-project-info="status">{props.project.status}</p>
                </div>
                <div>
                    <p style={{ color: "#969696", fontSize: "var(--font-sm)" }}>
                        Cost
                    </p>
                    <p data-project-info="cost">$ {props.project.cost}</p>
                </div>
                <div>
                    <p style={{ color: "#969696", fontSize: "var(--font-sm)" }}>
                        Role
                    </p>
                    <p data-project-info="role"> {props.project.userRole}</p>
                </div>
                <div>
                    <p style={{ color: "#969696", fontSize: "var(--font-sm)" }}>
                        Finish Date
                    </p>
                    <p data-project-info="finish-date">{props.project.finishDate.toDateString()}</p>
                </div>
            </div>
            <div
                data-project-info="progress"
                style={{
                    backgroundColor: "#404040",
                    borderRadius: 9999,
                    overflow: "auto"
                }}
            >
                <div
                    style={{
                        width: `${props.project.progress}%`,
                        backgroundColor: "green",
                        padding: "4px 0",
                        textAlign: "center"
                    }}
                >
                    {props.project.progress}%
                </div>
            </div>
        </div>
    </div>)

}