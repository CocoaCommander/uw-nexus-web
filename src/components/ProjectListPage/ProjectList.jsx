import { useEffect, useState } from "react";
import getData from "../../logic/getData";
import ProjectListItem from "./ProjectListItem";
import "./ProjectList.css";

const ProjectList = ({
    listOfProjectData,
    setListOfProjectData,
    isLoading,
    setIsLoading
}) => {

    const ALL_PROJECTS = `/api/project/allProjects`;
    const PROJECTS_PER_PAGE = 5;

    const [page, setPage] = useState(1);

    console.log(ALL_PROJECTS);

    useEffect(() => {
        getData(setIsLoading, ALL_PROJECTS, setListOfProjectData);
    }, [setIsLoading, ALL_PROJECTS, setListOfProjectData]);

    if (isLoading) {
        return <p>Loading...</p>
    }

    if (listOfProjectData.length === 0) {
        return (
            <div>
                No Projects Found.
            </div>
        )
    }

    let numProjects = listOfProjectData.length;
    let numPages = Math.ceil(numProjects / PROJECTS_PER_PAGE);

    function increasePage() {
        setPage(page + 1);
        console.log("button working");
    }

    function decreasePage() {
        setPage(page - 1);
        console.log("button working");
    }

    // function checkInRange(i) {
    //     if i > (PROJECTS_PER_PAGE * (page - 1)) && i <= (PROJECTS_PER_PAGE * page) {
    //         print(i + " is in range");
    //     }
    // }

    return (
        <div className="project-list">
            {
                listOfProjectData.map((project, i) => {
                    if (i > (PROJECTS_PER_PAGE * (page - 1)) && i <= (PROJECTS_PER_PAGE * page)) {
                        return (
                            <ProjectListItem project={project} key={i} isLoading={isLoading} />
                        )
                    }
                    
                    // return (
                    //     <ProjectListItem project={project} key={i} isLoading={isLoading} />
                    // )
                })
            }
            <div className="navigation-buttons">
                <button className="prev-btn" onClick={decreasePage}>Previous</button>
                <p className="current-page-text">{page} of {numPages}</p>
                <button className="next-btn" onClick={increasePage}>Next</button>
            </div>
        </div>
    )
}

export default ProjectList;
