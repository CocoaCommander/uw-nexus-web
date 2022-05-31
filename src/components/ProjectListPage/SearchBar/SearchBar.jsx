import { useEffect } from "react";
import getData from "../../../logic/getData";

const SearchBar = ({
    setListOfProjectData,
    setIsLoading
}) => {

    const SEARCH_ENDPOINT = `${process.env.REACT_APP_API_URL}/api/project/search?search_term=`;


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
            <input 
            id="SearchBar" 
            placeholder="Search projects..." 
            className="search-bar"/>
            {/* <div className="search-filter-icon">
                <FilterIcon />
            </div> */}
            
        </>
    )
}

export default SearchBar;
