import { useEffect, useState } from "react";
import getData from "../../logic/getData";
import ProjectListItem from "./ProjectListItem";

const ProjectList = () => {
    const [listOfProjectData, setListOfProjectData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const ALL_PROJECTS = "http://localhost:3100/api/project/allProjects"

    useEffect(() => {
        getData(setIsLoading, ALL_PROJECTS, setListOfProjectData);
    }, []);

    if (isLoading) {
        return <p>Loading...</p>
    }

    return (
        <>
            {
                listOfProjectData.map((project, i) => {
                    return (
                        <ProjectListItem project={project} key={i} isLoading={isLoading} />
                    )
                })
            }
        </>
    )
}

export default ProjectList;
