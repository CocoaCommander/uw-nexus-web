import { useEffect, useState } from "react";
import { ReactComponent as FilterIcon } from '../../../assets/filter-icon.svg';
import { ReactComponent as SearchIcon } from '../../../assets/icons/search.svg';

const SearchBar = ({
    setQuery
}) => {

    const [searchBarInFocus, setSearchBarInFocus] = useState(false);

    useEffect(() => {
        const handleSearchInput = e => {
            setQuery(e.target.value);
        }
        const searchBarElement = document.getElementById("SearchBar");
        searchBarElement.addEventListener('input', handleSearchInput);
    }, [setQuery]);

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
