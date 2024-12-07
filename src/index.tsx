import * as React from "react"
import * as ReactDOM from "react-dom/client"

//Components
import { Sidebar } from "./react-components/Sidebar"
import { ProjectsPage } from "./react-components/ProjectsPage"
import { ProjectsManager } from "./class/ProjectsManager"

//Insert the components in the page
const rootElement = document.getElementById("app") as HTMLDivElement
const appRoot = ReactDOM.createRoot(rootElement)


const projectsManager = new ProjectsManager()

appRoot.render(
    <>
        <Sidebar/>
        <ProjectsPage  projectsManager={projectsManager}/>
    </>
)