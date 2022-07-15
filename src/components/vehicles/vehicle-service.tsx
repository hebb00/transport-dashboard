
import { useState } from 'react'
import info from "../../mock-data.json"


export function vehicleData() {
    const [data, setData] = useState(info);

    return { data, setData };
}



