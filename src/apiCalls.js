export const loginUser = async credentials => {
    console.log(JSON.stringify(credentials));
    return fetch('http://localhost:3100/api/auth/signIn', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
      .then(data => data.json())
}