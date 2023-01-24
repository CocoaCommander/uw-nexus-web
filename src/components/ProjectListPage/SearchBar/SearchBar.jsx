import { useEffect } from "react";
import getData from "../../../logic/getData";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import "./searchBar.css";

const SearchBar = ({
    setListOfProjectData,
    setIsLoading
}) => {

    const SEARCH_ENDPOINT = `/api/project/search?search_term=`;


    useEffect(() => {
        const searchBarElement = document.getElementById("SearchBar");
        searchBarElement.addEventListener('keydown', e => {
            if (e.code === 'Enter') {
                const searchTerm = SEARCH_ENDPOINT + searchBarElement.value;
                console.log(searchTerm);
                getData(setIsLoading, searchTerm, setListOfProjectData);
            }
        })
    }, [SEARCH_ENDPOINT, setIsLoading, setListOfProjectData])

    return (
        <>
            {/* <i className="search-icon">
                <SearchIcon />
            </i> */}
            <div class="search-container">
                <FontAwesomeIcon class="search-icon" icon={faMagnifyingGlass} />
                <input
                id="SearchBar"
                placeholder="Search projects..."
                className="search-bar"/>
            </div>
            {/* <div className="search-filter-icon">
                <FilterIcon />
            </div> */}

        </>
    )
}

export default SearchBar;
