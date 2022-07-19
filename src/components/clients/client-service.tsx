

export function fetchData(user: any, path: string) {
    return fetch(
        `http://localhost:9000/clients/${path}`,
        {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
}

export function getData(path: string) {
    return fetch(
        `http://localhost:9000/clients/${path}`,
        {
            method: "GET",
            headers: {
                'Content-type': 'application/json'
            },

        })
}
