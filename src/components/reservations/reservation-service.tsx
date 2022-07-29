import * as dataSource from '../../datasource.json';
import { extend } from '@syncfusion/ej2-base';
import { useState } from 'react'




export function fetchData(user: any, path: string) {
    return fetch(
        `http://localhost:9000/reservations/${path}`,
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
        `http://localhost:9000/reservations/${path}`,
        {
            method: "GET",
            headers: {
                'Content-type': 'application/json'
            },

        })
}


