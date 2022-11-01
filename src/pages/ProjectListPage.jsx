import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CreateProjectButton from "../components/ProjectListPage/CreateProjectButton";
import ProjectList from "../components/ProjectListPage/ProjectList";
import SearchBar from "../components/ProjectListPage/SearchBar/SearchBar";


const ProjectListPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [listOfProjectData, setListOfProjectData] = useState([]);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 450);
    const isLoggedIn = useSelector((state) => state.userState.isLoggedIn);

    useEffect(() => {
    }, [listOfProjectData]);

    useEffect(() => {
        const reactToWindowResize = () => {
            window.innerWidth <= 450 ? setIsMobile(true) : setIsMobile(false)
        }
        window.addEventListener('resize', reactToWindowResize);
    })

    const sortProjects = (projects) => {
        return projects.sort((a, b) => {
            return new Date(b.duration.created_date) - new Date(a.duration.created_date);
        })
    } 

    return (
        <div className="project-list-page">
            <div className="create-project-btn-project-search-container">
                {
                    isLoggedIn &&  
                    <div className="container-item">
                        <CreateProjectButton isMobile={isMobile}/>
                    </div>
                }

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
                <ProjectList 
                    listOfProjectData={sortProjects(listOfProjectData)} 
                    setListOfProjectData={setListOfProjectData}
                    isLoading={isLoading}
                    setIsLoading={setIsLoading} />     
            </div>
        </div>
    );
}

export default ProjectListPage;