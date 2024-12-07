import * as React from "react"
import * as ReactDOM from "react-dom/client"

//Components
import { Sidebar } from "./react-components/Sidebar"


//Insert the components in the page
const rootElement = document.getElementById("app") as HTMLDivElement
const appRoot = ReactDOM.createRoot(rootElement)
appRoot.render(
    <>
        <Sidebar/>
    </>
)