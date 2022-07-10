import { useState, useEffect } from "react";

import info from "../../mock-data.json"

export function clientsData() {
    const [data, setData] = useState(info);

    return { data, setData };
}

