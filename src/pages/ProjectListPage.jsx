import { useState } from "react";
import CreateProjectButton from "../components/ProjectListPage/CreateProjectButton";
import ProjectFilters from "../components/ProjectListPage/ProjectFilters";
import ProjectList from "../components/ProjectListPage/ProjectList";
import SearchBar from "../components/ProjectListPage/SearchBar/SearchBar";

const ProjectListPage = () => {

    const [query, setQuery] = useState("");

    return (
        <div className="project-list-page">
            <div className="create-project-btn-project-filters-container">
                <div className="container-item">
                    <CreateProjectButton />
                </div>
                <div className="container-item">
                    <ProjectFilters />
                </div>
            </div>
            <div className="search-and-project-list-container">
                <div className="container-item search-bar-container">
                    <SearchBar query={query} setQuery={setQuery} />
                </div>
                <div className="container-item">
                    <ProjectList />     
                </div>
            </div>
        </div>
    );
}

export default ProjectListPage;