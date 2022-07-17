import { useState } from "react";
import { FormUserInputs, FormUserLogin } from "../../types/react-table-config";

export function fetchData(user: any, path: string) {
    return fetch(
        `http://localhost:9000/users/${path}`,
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
        `http://localhost:9000/users/${path}`,
        {
            method: "GET",
            headers: {
                'Content-type': 'application/json'
            },

        })
}

