import {
  EJ2Instance,
  GroupModel,
  Day,
  TimelineViews,
  TimelineMonth,
  Month,
  Agenda,
  View,
  Resize,
  ScheduleComponent,
  ViewsDirective,
  ViewDirective,
  ResourcesDirective,
  ResourceDirective,
  Inject,
  HeaderRowDirective,
  HeaderRowsDirective,
  EventRenderedArgs
} from "@syncfusion/ej2-react-schedule";
import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import "@syncfusion/ej2-base/styles/tailwind.css"
import "@syncfusion/ej2-buttons/styles/tailwind.css"
import "@syncfusion/ej2-calendars/styles/tailwind.css"
import "@syncfusion/ej2-dropdowns/styles/tailwind.css"
import "@syncfusion/ej2-inputs/styles/tailwind.css"
import "@syncfusion/ej2-lists/styles/tailwind.css"
import "@syncfusion/ej2-navigations/styles/tailwind.css"
import "@syncfusion/ej2-popups/styles/tailwind.css"
import "@syncfusion/ej2-splitbuttons/styles/tailwind.css"
import "@syncfusion/ej2-schedule/styles/tailwind.css"
import { createElement } from '@syncfusion/ej2-base';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { Link } from '@chakra-ui/react'
import reservations from "/home/heba/my_transport/client/src/reservation-data.json"
import { Link as RouteLink } from "react-router-dom";
import { reservationData } from "./reservation-service"
import { Query, DataManager, ReturnOption, Predicate } from '@syncfusion/ej2-data';
import { DatePickerComponent } from '@syncfusion/ej2-react-calendars';
import { GridComponent } from '@syncfusion/ej2-react-grids';


function Schedular() {
  let serverData = reservationData();
  const [count, setCount] = useState(0)
  let scheduleObj!: ScheduleComponent;

  function onEventRendered(args: EventRenderedArgs): void {

    let categoryColor: string = args.data.CategoryColor as string;
    console.log(categoryColor)
    if (!args.element || !categoryColor) {
      return;
    }
    if (scheduleObj.currentView === 'Agenda') {
      (args.element.firstChild as HTMLElement).style.borderLeftColor = categoryColor;
    } else {
      args.element.style.backgroundColor = categoryColor;
    }
  }

  // function globalSearch(args: KeyboardEvent) {
  //   let searchString: string = (args.target as HTMLInputElement).value;
  //   if (searchString !== '') {
  //     new DataManager(scheduleObj.getEvents(undefined, undefined, true)).executeQuery(new Query().
  //       search(searchString, ['Subject', 'Location', 'Description'], undefined, true, true)).then((e: ReturnOption) => {
  //         if ((e.result as any).length > 0) {
  //           showSearchEvents('show', e.result);
  //         } else {
  //           showSearchEvents('hide');
  //         }
  //       });
  //   } else {
  //     showSearchEvents('hide');
  //   }
  // }

  // function showSearchEvents(type: string, data?: Record<string, any>): void {
  //   if (type === 'show') {
  //     if (document.getElementById('grid').classList.contains('e-grid')) {
  //       let gridObj: GridComponent = (document.querySelector('#grid') as EJ2Instance).ej2_instances[0] as GridComponent;
  //       gridObj.dataSource = data
  //       gridObj.dataBind();
  //     } else {
  //       let gridObj: GridComponent = new GridComponent({
  //         dataSource: data,
  //         height: 505,
  //         width: 'auto',
  //         columns: [
  //           { field: 'Subject', headerText: 'Subject', width: 120 },
  //           { field: 'Location', headerText: 'Location', width: 120 },
  //           { field: 'StartTime', headerText: 'StartTime', width: 120, format: { type: 'dateTime', format: 'M/d/y hh:mm a' } },
  //           { field: 'EndTime', headerText: 'EndTime', width: 120, format: { type: 'dateTime', format: 'M/d/y hh:mm a' } },
  //         ]
  //       });
  //       gridObj.appendTo(document.querySelector('#grid') as HTMLElement);
  //       scheduleObj.element.style.display = 'none';
  //     }
  //   } else {
  //     let gridObj: Record<string, any>[] = (document.querySelector('#grid') as EJ2Instance).ej2_instances;
  //     if (gridObj && gridObj.length > 0 && !(gridObj[0] as GridComponent).isDestroyed) {
  //       (gridObj[0] as GridComponent).destroy();
  //     }
  //     scheduleObj.element.style.display = 'block';
  //   }
  // }

  let projectData: Record<string, any>[] = [
    { text: 'Vehicle 1', id: 1, color: '#cb6bb2' },
    { text: 'Vehicle 2', id: 2, color: '#56ca85' },
    { text: 'Vehicle 3', id: 3, color: '#df5286' }
  ];
  let categoryData: Record<string, any>[] = [
    { text: 'Nancy', id: 1, groupId: 1, color: '#df5286' },
    { text: 'Steven', id: 2, groupId: 1, color: '#7fa900' },
    { text: 'Robert', id: 3, groupId: 2, color: '#ea7a57' },
    { text: 'Smith', id: 4, groupId: 2, color: '#5978ee' },
    { text: 'Michael', id: 5, groupId: 3, color: '#df5286' },
    { text: 'Root', id: 6, groupId: 3, color: '#00bdae' }
  ];
  // let group: GroupModel = { resources: ['Projects', 'Categories'] };

  const onPopupOpen = (args: any) => {
    if (args.type === 'Editor') {
      if (!args.element.querySelector('.custom-field-row')) {
        let row = createElement('div', { className: 'custom-field-row' });
        let formElement = args.element.querySelector('.e-schedule-form');
        formElement.firstChild.insertBefore(row, formElement.firstChild.firstChild);
        let container = createElement('div', { className: 'custom-field-container' });
        let container0 = createElement('div', { className: 'custom-field-container' });

        let cont = createElement('div', { className: "e-float-input e-control-wrapper" })
        let inputEle = createElement('input', {
          className: 'e-field', attrs: { name: 'clientName' }
        });
        let label = createElement('label', {
          className: '  e-float-text e-label-top',
          innerHTML: "Client Name", attrs: { id: "label_Subject" }
        });


        let _container = createElement('div', { className: "e-float-input e-control-wrapper" })
        let _inputEle = createElement('input', {
          className: 'e-field', attrs: { name: 'price' }
        });
        let _label = createElement('label', {
          className: '  e-float-text e-label-top',
          innerHTML: "Price", attrs: { id: "label_Subject" }
        });


        _container.appendChild(_inputEle);
        _container.appendChild(_label);
        container0.appendChild(_container);

        cont.appendChild(inputEle);
        cont.appendChild(label);
        container.appendChild(cont);

        row.appendChild(container);
        row.appendChild(container0)

      }
    }
  }

  function ViewTable() {
    return (

      <Link

        as={RouteLink}
        color='teal.500'
        to="/reservation" >Reservations Table  <ExternalLinkIcon mx='2px' /></Link>
    );
  }

  return (

    <ScheduleComponent
      // ref={schedule => scheduleObj = schedule}
      popupOpen={onPopupOpen}
      showQuickInfo={false}// its the first event popup
      eventSettings={{ dataSource: serverData }}
      rowAutoHeight={true}
      allowResizing={true}
      width='100%' height='650px'
      currentView="TimelineWeek"
      group={{ resources: ['Projects', 'Categories'] }}
    // eventRendered={onEventRendered}
    >

      <HeaderRowsDirective  >
        <HeaderRowDirective option="Year" template={ViewTable} />
        <HeaderRowDirective option="Date" />
        {/* <HeaderRowDirective option="Hour" /> */}


      </HeaderRowsDirective>
      <ViewsDirective>
        <ViewDirective option='Day' />
        <ViewDirective option='TimelineWeek' />
        <ViewDirective option='TimelineMonth' />
        <ViewDirective option='Agenda' />

      </ViewsDirective>

      <ResourcesDirective>
        <ResourceDirective field='ProjectId' title='Choose Project' name='Projects' allowMultiple={false}
          dataSource={projectData} textField='text' idField='id' colorField='color'>
        </ResourceDirective>
        <ResourceDirective field='TaskId' title='Category' name='Categories' allowMultiple={true}
          dataSource={categoryData} textField='text' idField='id' groupIDField='groupId' colorField='color'>
        </ResourceDirective>
      </ResourcesDirective>
      <Inject services={[TimelineViews, TimelineMonth, Agenda, Resize, Day]} />
    </ ScheduleComponent>

  )

}
export default Schedular