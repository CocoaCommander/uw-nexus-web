import { useEffect, useState } from "react";
import ProjectListItem from "../components/ProjectListItem";

const PLPColOne = () => {
    return (
        <>
            <button>Create a project</button>
            <div>
                <h3>All Projects</h3>
                <p>Favorites</p>
                <p>Your Projects</p>
            </div>
        </>
    )
}

const PLPColTwo = () => {
    const [projectListData, setProjectListData] = useState([]);

    useEffect(() => {
        fetch("./ProjectListItem_testData.json")
        .then(res => res.json())
        .then(data => {
            setProjectListData(data);
        })
    }, [])

    return (
        <>
            <p>Search Bar</p>
            {projectListData.map(
                element => <ProjectListItem 
                            key={element.id} 
                            id={element.id} 
                            name={element.name}
                            time={element.time}
                            size={element.size}
                            location={element.location}
                            interests={element.interests}
                            positions={element.positions}
                            />
                            )}
        </>
    );
}

const ProjectListPage = () => {


    return (
        <div className="plp-container">
            <div className="plp-col">
                <PLPColOne/>
            </div>
            <div className="plp-col">
                <PLPColTwo />
            </div>
        </div>
    );
}

export default ProjectListPage;