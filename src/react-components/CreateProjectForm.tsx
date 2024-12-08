import * as React from "react";
import { IProject, Project, ProjectStatus, UserRole } from "../class/Project";
import { ProjectsManager } from "../class/ProjectsManager";


interface Props {
    projectsManager: ProjectsManager;
    onCloseForm: () => void;
}

export function CreateProjectForm(props: Props) {

    


    const onFormSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const projectForm = document.getElementById("new-project-form")
        if (!(projectForm && projectForm instanceof HTMLFormElement)) { return }
        
        const formData = new FormData(projectForm)

        const newProjectData: IProject =
        {
            name: formData.get("name") as string,
            description: formData.get("description") as string,
            status: formData.get("status") as ProjectStatus,
            userRole: formData.get("role") as UserRole,
            finishDate: new Date(formData.get("date") as string),
            cost : 0,
            progress: 0,
            toDoList: []
        }
        try {
            console.log(newProjectData)
            const newProject = props.projectsManager.newProject(newProjectData)
            projectForm.reset()
            const modal = document.getElementById("new-project-modal")
            if (!(modal && modal instanceof HTMLDialogElement)) { return }
            modal.close()
            props.onCloseForm()
        }
        catch (error) {
            alert(error)
        }
    }



    const onCancelButtonClick = () => {
        const modal = document.getElementById("new-project-modal")
        if (!(modal && modal instanceof HTMLDialogElement)) { return }
        modal.close()
        props.onCloseForm()
    }


    return (
        <dialog id="new-project-modal">
            <form onSubmit={(e) => { onFormSubmit(e) }} id="new-project-form">
                <h2>New Project</h2>
                <div className="input-list">
                    <div className="form-field-container">
                        <label>
                            <span className="material-icons-round">apartment</span>Name
                        </label>
                        <input
                            name="name"
                            type="text"
                            placeholder="What's the name of your project?"
                        />
                        <p
                            style={{
                                color: "gray",
                                fontSize: "var(--font-sm)",
                                marginTop: 5,
                                fontStyle: "italic"
                            }}
                        >
                            TIP: Give it a short name
                        </p>
                    </div>
                    <div className="form-field-container">
                        <label>
                            <span className="material-icons-round">subject</span>Description
                        </label>
                        <textarea
                            name="description"
                            cols={30}
                            rows={5}
                            placeholder="Give your project a nice description! So people is jealous about it."
                            defaultValue={""}
                        />
                    </div>
                    <div className="form-field-container">
                        <label>
                            <span className="material-icons-round">person</span>Role
                        </label>
                        <select name="role">
                            <option>Architect</option>
                            <option>Engineer</option>
                            <option>Developer</option>
                        </select>
                    </div>
                    <div className="form-field-container">
                        <label>
                            <span className="material-icons-round">not_listed_location</span>
                            Status
                        </label>
                        <select name="status">
                            <option>Pending</option>
                            <option>Active</option>
                            <option>Finished</option>
                        </select>
                    </div>
                    <div className="form-field-container">
                        <label htmlFor="finishDate">
                            <span className="material-icons-round">calendar_month</span>
                            Finish Date
                        </label>
                        <input name="date" type="date" />
                    </div>
                    <div
                        style={{
                            display: "flex",
                            margin: "10px 0px 10px auto",
                            columnGap: 10
                        }}
                    >
                        <button
                            id="form-cancel-button"
                            type="button"
                            style={{ backgroundColor: "transparent" }}
                            onClick={onCancelButtonClick}
                        >
                            Cancel
                        </button>
                        <button type="submit" style={{ backgroundColor: "rgb(18, 145, 18)" }}>
                            Accept
                        </button>
                    </div>
                </div>
            </form>
        </dialog>
    )
}