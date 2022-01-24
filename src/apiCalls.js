const handleErrors = response => {
    if (!response.ok) {
        console.log(response)
        throw Error(response.message);
    }
    return response;
}
export const loginUser = async credentials => {
    console.log(JSON.stringify(credentials));
    return fetch('http://localhost:3100/api/auth/signIn', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
    .catch(res => handleErrors(res))
    .then(data => data.json())
}