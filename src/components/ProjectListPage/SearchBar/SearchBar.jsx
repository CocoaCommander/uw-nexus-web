import { useEffect } from "react"

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
            <input id="SearchBar" placeholder="Search projects..." />
        </>
    )
}

export default SearchBar;
