import { useEffect } from "react"
import { ReactComponent as FilterIcon } from '../../../assets/filter-icon.svg'

const SearchBar = ({
    setQuery
}) => {

    useEffect(() => {
        const handleSearchInput = e => {
            setQuery(e.target.value);
        }
        const searchBarElement = document.getElementById("SearchBar");
        searchBarElement.addEventListener('input', handleSearchInput);
    }, [setQuery]);

    return (
        <>
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
