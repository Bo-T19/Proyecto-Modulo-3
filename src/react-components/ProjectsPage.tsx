import * as React from "react";
import { IProject, Project, ProjectStatus, UserRole } from "../class/Project";
import { ProjectsManager } from "../class/ProjectsManager";
import { ProjectCard } from "./ProjectCard"
import { CreateProjectForm } from "./CreateProjectForm";


interface Props {
    projectsManager: ProjectsManager
}

export function ProjectsPage(props: Props) {

    //States
    const [projects, setProjects] = React.useState<Project[]>(props.projectsManager.list)
    const [showProjectForm, setShowProjectForm] = React.useState(false);


    props.projectsManager.onProjectCreated = () => {
        setProjects([...props.projectsManager.list])
    }

    props.projectsManager.onProjectDeleted = () => {
        setProjects([...props.projectsManager.list])
    }


    //Update the project cards
    const projectCards = projects.map((project) => {
        return (
            <ProjectCard project={project} key={project.id} />
        )

    })

    //Show or close the New Project Form
    const handleCloseForm = () => {
        setShowProjectForm(false);
    };



    const onNewProjectClick = () => {
        setShowProjectForm(true);
    }


    //Download the projects or upload
    const onDownloadProjectsClick =() =>{
        props.projectsManager.exportToJSON()
    }


    //Download the projects or upload
    const onUploadProjectsClick =() =>{
        props.projectsManager.importFromJSON()
    }


    React.useEffect(() => {
        if (showProjectForm) {
            const modal = document.getElementById("new-project-modal");
            if (modal && modal instanceof HTMLDialogElement) {
                modal.showModal();
            }
        }
    }, [showProjectForm]);


    return (
        <div className="page" id="projects-page" style={{ display: "flex" }}>
            <header>
                <h2>Projects</h2>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 20
                    }}>
                    <button onClick={onDownloadProjectsClick} id="download">
                        <span className="material-icons-round">download</span>
                    </button>
                    <button   onClick={onUploadProjectsClick} id="upload">
                        <span className="material-icons-round">file_upload</span>
                    </button>
                    <button onClick={onNewProjectClick} id="new-project">
                        <span className="material-icons-round">add</span>New Project
                    </button>
                </div>
            </header>
            {showProjectForm ? <CreateProjectForm projectsManager={props.projectsManager} onCloseForm={handleCloseForm} /> : <></>}
            {projects.length > 0 ? <div id="projects-list">{projectCards}</div> : <p> There are no projects to display</p>}

        </div>

    )
}
