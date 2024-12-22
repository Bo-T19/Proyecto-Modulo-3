import * as React from "react";
import * as Router from "react-router-dom";

import { Project } from "../class/Project";
import { ProjectsManager } from "../class/ProjectsManager";
import { ProjectCard } from "./ProjectCard"
import { CreateProjectForm } from "./CreateProjectForm";
import { SearchBox } from "./SearchBox";

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
            <Router.Link to={`/project/${project.id}`} key={project.id} >
                <ProjectCard project={project} />
            </Router.Link>)
    })

    //Show or close the New Project Form
    const handleCloseForm = () => {
        setShowProjectForm(false);
    };



    const onNewProjectClick = () => {
        setShowProjectForm(true);
    }

    React.useEffect(() => {
        if (showProjectForm) {
            const modal = document.getElementById("new-project-modal");
            if (modal && modal instanceof HTMLDialogElement) {
                modal.showModal();
            }
        }
    }, [showProjectForm]);



    //Download the projects or upload
    const onDownloadProjectsClick = () => {
        props.projectsManager.exportToJSON()
    }


    //Download the projects or upload
    const onUploadProjectsClick = () => {
        props.projectsManager.importFromJSON()
    }


    //For the searchbox
    const onProjectSearch = (value: string) => {
        const filteredProjects = props.projectsManager.list.filter((project) => {
            return project.name.includes(value)
        })
        setProjects(filteredProjects)
    }


    return (
        <div className="page" id="projects-page" style={{ display: "flex" }}>
            <header>
                <h2>Projects</h2>

                <SearchBox onChange={(value) => onProjectSearch(value)} typeOfSearchBox="project"/>


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
                    <button onClick={onUploadProjectsClick} id="upload">
                        <span className="material-icons-round">file_upload</span>
                    </button>
                    <button onClick={onNewProjectClick} id="new-project">
                        <span className="material-icons-round">add</span>New Project
                    </button>
                </div>
            </header>
            {showProjectForm ? <CreateProjectForm projectsManager={props.projectsManager} onCloseForm={handleCloseForm} /> : <></>}
            {projects.length > 0 ? <div id="projects-list" style={{overflowY: "auto", height: "98vh"}}>{projectCards}</div> : <p> There are no projects to display</p>}

        </div>

    )
}
