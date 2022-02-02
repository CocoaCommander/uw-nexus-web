import { useEffect, useState } from "react";
import ProjectListItem from "./ProjectListItem";

const ProjectList = () => {
    const [listOfProjectData, setListOfProjectData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        fetch("http://localhost:3100/api/project/allProjects")
            .then(res => res.json())
            .then(data => setListOfProjectData(data))
            .catch(err => console.log(err))
            .finally(() => setIsLoading(false));
    }, []);

    console.log(listOfProjectData)

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