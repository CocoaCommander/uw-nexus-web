import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CreateProjectButton from "../components/ProjectListPage/CreateProjectButton";
import CreateProjectHeader from '../components/Global/CreateProjectHeader';
import ProjectList from "../components/ProjectListPage/ProjectList";
import SearchBar from "../components/ProjectListPage/SearchBar/SearchBar";
import ProjectFilters from '../components/ProjectFilters/ProjectFilters'

const ProjectListPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [listOfProjectData, setListOfProjectData] = useState([]);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 450);
    const [isFiltersOpen, setIsFiltersOpen] = useState(false);
    const [filters, setFilters] = useState({ size: [], duration: [] });
    const isLoggedIn = useSelector((state) => state.userState.isLoggedIn);

    console.log(listOfProjectData)
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

    
    
    const filterProjects = (projects) => {
        if (filters.duration.length === 0 && filters.size.length === 0) 
            return projects;
    
        return projects.filter(project => {
            const sizeFilter = filters.size.length === 0 || filters.size.includes(project.size);
            const durationFilter = filters.duration.length === 0 || filters.duration.includes(project.duration.length);
            return sizeFilter && durationFilter;
        });
    };

    console.log(isFiltersOpen)

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
                
                <button 
                    type="button"
                    className="filter-projects-button" 
                    onClick={() => {
                        console.log("called")
                        setIsFiltersOpen((p) => !p)
                    }}
                >
                    Filter
                </button>

            </div>
            <div className="project-list-and-filter-container">
                {
                    isFiltersOpen && 
                    <div className="container-item">
                        <ProjectFilters setFilters={setFilters} />
                    </div> 
                }
                <ProjectList 
                    listOfProjectData={sortProjects(filterProjects(listOfProjectData))} 
                    setListOfProjectData={setListOfProjectData}
                    isLoading={isLoading}
                    setIsLoading={setIsLoading} 
                    isLoggedIn={isLoggedIn}/>
            </div>
            {isLoggedIn ? <CreateProjectHeader /> : null}
        </div>
    );
}

export default ProjectListPage;