import * as React from "react";
import * as Router from "react-router-dom";

import { ProjectsManager } from "../class/ProjectsManager";
import { ProjectSummary } from "./ProjectSummary";
import { EditProjectForm } from "./EditProjectForm";
import { ToDoList } from "./ToDoList";
import { NewToDoForm } from "./NewToDoForm";

interface Props {
    projectsManager: ProjectsManager
}

export function ProjectDetailsPage(props: Props) {

    const routeParams = Router.useParams<{ id: string }>()
    if (!routeParams.id) { return (<p> There is no project id</p>) }
    const project = props.projectsManager.getProject(routeParams.id)
    if (!project) { return (<p> Project couldn't be fount</p>) }

    //State for the EditProjectForm and methods for showing it, also for NewToDoForm and EditToDoForm
    const [showEditProjectForm, setEditProjectForm] = React.useState(false);
    const [showNewToDoForm, setNewToDoForm] = React.useState(false);
    const [showEditToDoForm, setEditToDoForm] = React.useState(false);



    const handleCloseEditProjectForm = () => {
        setEditProjectForm(false);
    }


    const onEditProjectClick = () => {
        setEditProjectForm(true);
    }

    React.useEffect(() => {
        if (showEditProjectForm) {
            const modal = document.getElementById("edit-project-modal");
            if (modal && modal instanceof HTMLDialogElement) {
                modal.showModal();
            }
        }
    }, [showEditProjectForm]);





    const handleCloseNewToDoForm = () => {
        setNewToDoForm(false);
        console.log(project)
    };


    const onNewToDoClick = () => {
        setNewToDoForm(true);

    }

    React.useEffect(() => {
        if (showNewToDoForm) {
            const modal = document.getElementById("new-todo-modal");
            if (modal && modal instanceof HTMLDialogElement) {
                modal.showModal();
            }
        }
    }, [showNewToDoForm]);











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
            {showEditProjectForm ? <EditProjectForm project={project}
                projectsManager={props.projectsManager}
                onCloseForm={handleCloseEditProjectForm} /> : <></>}
            {showNewToDoForm ? <NewToDoForm 
                toDosManager={project.toDosManager}
                onCloseForm={handleCloseNewToDoForm} /> : <></>}

            <div className="main-page-content">
                <div style={{ display: "flex", flexDirection: "column", rowGap: 30 }}>
                    <ProjectSummary project={project} projectsManager={props.projectsManager} onOpenForm={onEditProjectClick} />
                    <ToDoList project={project} onOpenForm={onNewToDoClick} />
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
