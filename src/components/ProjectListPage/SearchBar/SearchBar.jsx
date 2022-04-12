import Query from "airtable/lib/query";
import { useEffect, useState } from "react";
import { ReactComponent as FilterIcon } from '../../../assets/filter-icon.svg';
import { ReactComponent as SearchIcon } from '../../../assets/icons/search.svg';
import { postData } from "../../../logic/getData";

const SearchBar = ({
    setListOfProjectData,
    setIsLoading
}) => {

search-bar-logic
    const SEARCH_ENDPOINT = "http://localhost:3100/api/project/search"


    useEffect(() => {
        const searchBarElement = document.getElementById("SearchBar");
        searchBarElement.addEventListener('keydown', e => {
            if (e.code === 'Enter') {
                postData(setIsLoading, setListOfProjectData, SEARCH_ENDPOINT, searchBarElement.value);
            }
        })
    }, [])

    return (
        <>
            <i className="search-icon">
                <SearchIcon />
            </i>
            <input 
            id="SearchBar" 
            placeholder="Search projects..." 
            className="search-bar"/>
            <div className="search-filter-icon">
                <FilterIcon />
            </div>
            
        </>
    )
}

export default SearchBar;
