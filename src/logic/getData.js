export const getData = (setIsLoading, endpoint, setData) => {
    setIsLoading(true);
    fetch(endpoint)
        .then(res => res.json())
        .then(data => setData(data))
        .catch(err => console.log(err))
        .finally(() => setIsLoading(false));
}

export const postData = (setIsLoading, setData, url, data) => {
    const body = {
        "search_term": data
    }
    setIsLoading(true)
    const options = {
        method: 'POST', 
        mode: 'cors', 
        cache: 'no-cache', 
        credentials: 'same-origin', 
        headers: {
          'Content-Type': 'application/json'
        },
        redirect: 'follow', 
        referrerPolicy: 'no-referrer', 
        body: JSON.stringify(body) 
    }
    console.log(options);
    fetch(url, options)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            setData(data);
        })
        .catch(err => console.log(err))
        .finally(setIsLoading(false));
  }
  

export default getData;