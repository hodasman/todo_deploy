import React from "react";
import { Link } from "react-router-dom";


const ProjectItem = ({ project, deleteProject }) => {
    return (
        <tr>
            <td>{project.name}</td>
            <td>{project.authors}</td>
            <td>{project.repository}</td>
            <td><button onClick={()=>deleteProject(project.id)} type='button'>Delete</button></td>
        </tr>
    )
}

const ProjectList = ({ projects, deleteProject }) => {
    return (
        <div>
        <table border="1">
            <tr>
                <th>Name</th>
                <th>Authors</th>
                <th>Repository</th>
                <th></th>
            </tr>
            {projects.map((project) => <ProjectItem project={project} deleteProject={deleteProject}/>)}
        </table>
        <Link to='projects/create'>Create</Link>
        </div>
    )
}
export default ProjectList
