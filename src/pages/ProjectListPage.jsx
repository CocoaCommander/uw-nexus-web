import { useState } from "react";
import CreateProjectButton from "../components/ProjectListPage/CreateProjectButton";
import ProjectList from "../components/ProjectListPage/ProjectList";
import SearchBar from "../components/ProjectListPage/SearchBar/SearchBar";

const ProjectListPage = () => {

    const [query, setQuery] = useState("");

    return (
        <>
            <div>
                <CreateProjectButton />
                <SearchBar query={query} setQuery={setQuery} />
            </div>
            <div>
                <ProjectList />
            </div>
        </>
    );
}

export default ProjectListPage;