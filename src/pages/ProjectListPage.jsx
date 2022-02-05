import { useState } from "react";
import CreateProjectButton from "../components/ProjectListPage/CreateProjectButton";
import ProjectFilters from "../components/ProjectListPage/ProjectFilters";
import ProjectList from "../components/ProjectListPage/ProjectList";
import SearchBar from "../components/ProjectListPage/SearchBar/SearchBar";

const ProjectListPage = () => {

    const [query, setQuery] = useState("");

    return (
        <div className="project-list-page">
            <div className="create-project-btn-project-search-container">
                <div className="container-item">
                    <CreateProjectButton />
                </div>
                <div className="container-item search-bar-container">
                    <SearchBar query={query} setQuery={setQuery} />
                </div>
            </div>
            <div className="project-list-and-filter-container">
                <div className="container-item">
                    <ProjectFilters />
                </div>
                <div className="container-item">
                    <ProjectList />     
                </div>
            </div>
        </div>
    );
}

export default ProjectListPage;