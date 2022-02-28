const getData = (setIsLoading, endpoint, setData) => {
    setIsLoading(true);
    fetch(endpoint)
        .then(res => res.json())
        .then(data => setData(data))
        .catch(err => console.log(err))
        .finally(() => setIsLoading(false));
}

export default getData;