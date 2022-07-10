import {
    EJ2Instance,
} from "@syncfusion/ej2-react-schedule";
import { Query, DataManager, DataResult, ReturnOption, Predicate } from '@syncfusion/ej2-data';
import { DatePicker } from '@syncfusion/ej2-calendars';
import { GridComponent } from '@syncfusion/ej2-react-grids';
import { scheduleObj } from './schedular'





export function globalSearch(args: KeyboardEvent) {
    let searchString: string = (args.target as HTMLInputElement).value;
    if (searchString !== '') {
        new DataManager(scheduleObj!.getEvents(undefined, undefined, true)).executeQuery(new Query().
            search(searchString, ['Subject', 'Location', 'Description'], undefined, true, true)).then((e: ReturnOption) => {
                if ((e.result as any).length > 0) {
                    showSearchEvents('show', e.result);
                } else {
                    showSearchEvents('hide');
                }
            });
    } else {
        showSearchEvents('hide');
    }
}

export function showSearchEvents(type: string, data?: Record<string, any> | Object | DataManager | DataResult): void {
    if (type === 'show') {
        if (document.getElementById('grid')!.classList.contains('e-grid')) {
            let gridObj: GridComponent = (document.querySelector('#grid') as EJ2Instance).ej2_instances[0] as GridComponent;
            gridObj.dataSource = data
            gridObj.dataBind();
        } else {
            let gridObj: GridComponent = new GridComponent({
                dataSource: data,
                height: 505,
                width: '100%',
                columns: [
                    { field: 'Subject', headerText: 'Subject', width: 120 },
                    { field: 'Location', headerText: 'Location', width: 120 },
                    { field: 'StartTime', headerText: 'StartTime', width: 120, format: { type: 'dateTime', format: 'M/d/y hh:mm a' } },
                    { field: 'EndTime', headerText: 'EndTime', width: 120, format: { type: 'dateTime', format: 'M/d/y hh:mm a' } },
                ]
            });
            gridObj.appendTo(document.querySelector('#grid') as HTMLElement);
            scheduleObj!.element.style.display = 'none';
        }
    } else {
        let gridObj: Record<string, any>[] = (document.querySelector('#grid') as EJ2Instance).ej2_instances;
        if (gridObj && gridObj.length > 0 && !(gridObj[0] as GridComponent).isDestroyed) {
            (gridObj[0] as GridComponent).destroy();
        }
        scheduleObj!.element.style.display = 'block';
    }
}


export function searchOnclick(): void {
    let searchObj: { [key: string]: any }[] = [];
    let startDate: Date;
    let endDate: Date;
    let formElements: HTMLInputElement[] = [].slice.call(document.querySelectorAll('.event-search .search-field'));
    formElements.forEach((node: HTMLInputElement) => {
        let fieldOperator: string;
        let predicateCondition: string;
        let fieldValue: string | Date;
        let fieldInstance: DatePicker;
        if (node.value && node.value !== '' && !node.classList.contains('e-datepicker')) {
            fieldOperator = 'contains';
            predicateCondition = 'or';
            fieldValue = node.value;
            searchObj.push({
                field: node.getAttribute('data-name'), operator: fieldOperator, value: fieldValue, predicate: predicateCondition,
                matchcase: true
            });
        }
        if (node.classList.contains('e-datepicker') && (((node as any) as EJ2Instance).ej2_instances[0] as DatePicker).value) {
            fieldInstance = ((node as any) as EJ2Instance).ej2_instances[0] as DatePicker;
            fieldValue = fieldInstance.value;
            if (node.classList.contains('e-start-time')) {
                fieldOperator = 'greaterthanorequal';
                predicateCondition = 'and';
                startDate = new Date(+fieldValue);
            } else {
                fieldOperator = 'lessthanorequal';
                predicateCondition = 'and';
                let date: Date = new Date(+fieldInstance.value);
                fieldValue = new Date(date.setDate(date.getDate() + 1));
                endDate = fieldValue;
            }
            searchObj.push({
                field: node.getAttribute('data-name'), operator: fieldOperator, value: fieldValue, predicate: predicateCondition,
                matchcase: false
            });
        }
    });
    if (searchObj.length > 0) {
        let filterCondition: { [key: string]: any } = searchObj[0];
        let predicate: Predicate = new Predicate(
            filterCondition.field, filterCondition.operator, filterCondition.value, filterCondition.matchcase);
        for (let i: number = 1; i < searchObj.length; i++) {
            predicate = predicate.and(searchObj[i].field, searchObj[i].operator, searchObj[i].value, searchObj[i].matchcase);
        }
        let result: Record<string, any>[] = new DataManager(scheduleObj.getEvents(startDate, endDate, true)).
            executeLocal(new Query().where(predicate));
        showSearchEvents('show', result);
    } else {
        showSearchEvents('hide');
    }
}

export function clearOnClick(): void {
    document.getElementById('schedule')!.style.display = 'block';
    (document.getElementById('form-search') as HTMLFormElement).reset();
    showSearchEvents('hide');
}

