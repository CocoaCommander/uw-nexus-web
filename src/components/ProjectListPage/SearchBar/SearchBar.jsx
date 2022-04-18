import { useEffect } from "react";
import { ReactComponent as FilterIcon } from '../../../assets/filter-icon.svg';
import { ReactComponent as SearchIcon } from '../../../assets/icons/search.svg';
import getData, { postData } from "../../../logic/getData";

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
    }, [])

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
