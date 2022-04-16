import { useEffect, useState } from "react";
import CreateProjectButton from "../components/ProjectListPage/CreateProjectButton";
import ProjectFilters from "../components/ProjectListPage/ProjectFilters";
import ProjectList from "../components/ProjectListPage/ProjectList";
import SearchBar from "../components/ProjectListPage/SearchBar/SearchBar";

const ProjectListPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [listOfProjectData, setListOfProjectData] = useState([]);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 450);

    useEffect(() => {
        const reactToWindowResize = () => {
            window.innerWidth <= 450 ? setIsMobile(true) : setIsMobile(false)
        }
        window.addEventListener('resize', reactToWindowResize);
    });

    useEffect(() => {
        console.log(listOfProjectData);
    }, [listOfProjectData]);

    useEffect(() => {
        const reactToWindowResize = () => {
            window.innerWidth <= 450 ? setIsMobile(true) : setIsMobile(false)
        }
        window.addEventListener('resize', reactToWindowResize);
    })

    return (
        <div className="project-list-page">
            <div className="create-project-btn-project-search-container">
                <div className="container-item">
                    <CreateProjectButton isMobile={isMobile}/>
                </div>
                {/* <div className="container-item search-bar-container"> */}
                    <SearchBar 
                        setListOfProjectData={setListOfProjectData}
                        setIsLoading={setIsLoading} />
                {/* </div> */}
            </div>
            <div className="project-list-and-filter-container">
                {/* {
                    !isMobile && 
                <div className="container-item">
                    <ProjectFilters />
                </div>
                } */}

                <div className="container-item">
                    <ProjectList 
                        listOfProjectData={listOfProjectData} 
                        setListOfProjectData={setListOfProjectData}
                        isLoading={isLoading}
                        setIsLoading={setIsLoading} />     
                </div>
            </div>
        </div>
    );
}

export default ProjectListPage;