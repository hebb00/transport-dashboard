import * as dataSource from '/home/heba/my_transport/client/src/datasource.json';
import { extend } from '@syncfusion/ej2-base';
import { useState } from 'react'

export let serverData: Record<string, any>[] = extend([], (dataSource as Record<string, any>).resourceData.concat((dataSource as Record<string, any>).timelineResourceData), undefined, true) as Record<string, any>[]
export function reservationData() {
    const [data, setData] = useState(serverData);

    return data;
}



