import * as React from "react";
import { IProject, Project, ProjectStatus, UserRole } from "../class/Project";
import { ProjectsManager } from "../class/ProjectsManager";
import { ProjectCard } from "./ProjectCard"


interface Props {
    projectsManager: ProjectsManager
}

export function ProjectsPage(props: Props) {

    //Create the ProjectMan

    props.projectsManager.defaultProject()
    const [projects, setProjects] = React.useState<Project[]>(props.projectsManager.list)

    props.projectsManager.onProjectCreated = () => {
        setProjects([...props.projectsManager.list])
    }

    props.projectsManager.onProjectDeleted = () => {
        setProjects([...props.projectsManager.list])
    }


    const projectCards = projects.map((project) => {
        return (
            <ProjectCard project={project} />
        )

    })

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
                    }}
                >
                    <button id="download">
                        <span className="material-icons-round">download</span>
                    </button>
                    <button id="upload">
                        <span className="material-icons-round">file_upload</span>
                    </button>
                    <button id="new-project">
                        <span className="material-icons-round">add</span>New Project
                    </button>
                </div>
            </header>
            {
                projects.length > 0 ? <div id="projects-list">{projectCards}</div> : <p> There are no projects to display</p>
            }

        </div>

    )
}