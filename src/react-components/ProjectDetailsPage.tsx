import * as React from "react";
import * as Router from "react-router-dom";
import { ProjectsManager } from "../class/ProjectsManager";

interface Props {
    projectsManager: ProjectsManager
}

export function ProjectDetailsPage(props: Props) {

    const routeParams = Router.useParams<{id: string}>()
    if (!routeParams.id) {return (<p> There is no project id</p>)}  
    const project = props.projectsManager.getProject(routeParams.id)
    if (!project) {return (<p> Project couldn't be fount</p>)} 

    return(
        <div className="page" id="project-details" >
        <header>
            <div>
                <h2 data-project-info="name">{project.name}</h2>
                <p data-project-info="description" style={{ color: "#969696" }}>
                    {project.description}
                </p>
            </div>
        </header>
        <div className="main-page-content">
            <div style={{ display: "flex", flexDirection: "column", rowGap: 30 }}>
                <div className="dashboard-card" style={{ padding: "30px 0" }}>
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
                                backgroundColor: `${project.color}`,
                                aspectRatio: 1,
                                borderRadius: "100%",
                                padding: 12
                            }}
                        >
                            {project.initials}
                        </p>
                        <button id="edit-project" className="btn-secondary">
                            <p style={{ width: "100%" }}>Edit</p>
                        </button>
                    </div>
                    <div style={{ padding: "0 30px" }}>
                        <div>
                            <h5 data-project-info="name">{project.name}</h5>
                            <p data-project-info="description">
                                {project.description}
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
                                <p data-project-info="status">{project.status}</p>
                            </div>
                            <div>
                                <p style={{ color: "#969696", fontSize: "var(--font-sm)" }}>
                                    Cost
                                </p>
                                <p data-project-info="cost">$ {project.cost}</p>
                            </div>
                            <div>
                                <p style={{ color: "#969696", fontSize: "var(--font-sm)" }}>
                                    Role
                                </p>
                                <p data-project-info="role"> {project.userRole}</p>
                            </div>
                            <div>
                                <p style={{ color: "#969696", fontSize: "var(--font-sm)" }}>
                                    Finish Date
                                </p>
                                <p data-project-info="finish-date">{project.finishDate.toDateString()}</p>
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
                                    width: `${project.progress}%`,
                                    backgroundColor: "green",
                                    padding: "4px 0",
                                    textAlign: "center"
                                }}
                            >
                                {project.progress}%
                            </div>
                        </div>
                    </div>
                </div>
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
                            <span id="add-todo" className="material-icons-round">
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
                    ></div>
                </div>
            </div>
            <div
                id="viewer-container"
                style={{ minWidth: 0 }}
                className="dashboard-card"
            >
            </div>
        </div>
    </div>
    )
}
