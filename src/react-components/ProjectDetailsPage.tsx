import * as React from "react";
import * as Router from "react-router-dom";

import { ProjectsManager } from "../class/ProjectsManager";

import { ProjectSummary } from "./ProjectSummary";
import { Project } from "../class/Project";
import { EditProjectForm } from "./EditProjectForm";

interface Props {
    projectsManager: ProjectsManager
}

export function ProjectDetailsPage(props: Props) {

    const routeParams = Router.useParams<{ id: string }>()
    if (!routeParams.id) { return (<p> There is no project id</p>) }
    const project = props.projectsManager.getProject(routeParams.id)
    if (!project) { return (<p> Project couldn't be fount</p>) }

    //State for the EditProjectForm and methods for showing it
    const [showEditProjectForm, setEditProjectForm] = React.useState(false);

    const handleCloseEditProjectForm = () => {
        setEditProjectForm(false);
    };


    const onEditProjectClick = () => {
        setEditProjectForm(true);
        console.log(showEditProjectForm)
    }

    React.useEffect(() => {
        if (showEditProjectForm) {
            const modal = document.getElementById("edit-project-modal");
            if (modal && modal instanceof HTMLDialogElement) {
                modal.showModal();
            }
        }
    }, [showEditProjectForm]);



    return (
        <div className="page" id="project-details" >
            <header>
                <div>
                    <h2 data-project-info="name">{project.name}</h2>
                    <p data-project-info="description" style={{ color: "#969696" }}>
                        {project.description}
                    </p>
                </div>
            </header>
            {showEditProjectForm? <EditProjectForm project={project} 
                            projectsManager={props.projectsManager} 
                            onCloseForm={handleCloseEditProjectForm} /> : <></>}

            <div className="main-page-content">
                <div style={{ display: "flex", flexDirection: "column", rowGap: 30 }}>
                    <ProjectSummary project={project} projectsManager={props.projectsManager} onOpenForm={onEditProjectClick}/>
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
