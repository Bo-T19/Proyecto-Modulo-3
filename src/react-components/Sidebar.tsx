import * as React from "react";


export function Sidebar() {
    return (
      <aside id="sidebar">
        <img id="company-logo" src="./assets/be-bop-tools-logo.jpg" alt="Be-bop Tools" />
        <ul id="nav-buttons">
            <li><span className="material-icons-round">people</span>Users</li>
            <li id="home button"><span className="material-icons-round">apartment</span>Projects</li>
        </ul>
      </aside>
    )
  }