import { useState } from "react";
import { FormUserInputs, FormUserLogin } from "../../types/react-table-config";

export function userData() {
    const [newUser, setNewUser] = useState(
        {
            firstName: "",
            lastName: "",
            userName: "",
            password: "",
            phoneNumber: "",
        }
    );
    return { newUser, setNewUser };
};


export function fetchData(user: FormUserInputs | FormUserLogin, path: string) {
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
