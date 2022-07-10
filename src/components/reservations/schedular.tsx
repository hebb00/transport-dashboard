import { Link as RouteLink } from "react-router-dom";

import {
  TimelineViews,
  TimelineMonth,
  Agenda,
  Resize,
  ScheduleComponent,
  ViewsDirective,
  ViewDirective,
  ResourceDetails,
  ResourcesDirective,
  ResourceDirective,
  Inject,
  HeaderRowDirective,
  HeaderRowsDirective,
  EventRenderedArgs
} from "@syncfusion/ej2-react-schedule";
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
import "@syncfusion/ej2-grids/styles/tailwind.css";
import './timeline-resources.css';

import { createElement } from '@syncfusion/ej2-base';

import { ExternalLinkIcon } from '@chakra-ui/icons';
import { HStack, Link, Box, Flex } from '@chakra-ui/react'

import { reservationData } from "./reservation-service"
import { clearOnClick, searchOnclick, globalSearch } from "./search"
import SearchEvent from "./SearchEvent";



export let scheduleObj: ScheduleComponent | null;

function Schedular() {
  let { data, setData } = reservationData();
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
      <HStack>
        <Box>
          <Link
            as={RouteLink}
            color='teal.500'
            to="/reservation" >Reservations Table  <ExternalLinkIcon mx='2px' /></Link>
        </Box>

      </HStack>


    );
  }

  return (
    <>

      <ScheduleComponent
        cssClass='timeline-resource'
        id='schedule'
        ref={schedule => scheduleObj = schedule}
        workHours={{ start: '08:00', end: '18:00' }}
        timeScale={{ interval: 60, slotCount: 1 }}
        popupOpen={onPopupOpen}
        showQuickInfo={false}// its the first event popup
        eventSettings={{ dataSource: data }}
        rowAutoHeight={true}
        allowResizing={true}
        width='100%' height='650px'
        currentView="TimelineWeek"
        group={{ resources: ['Projects', 'Categories'] }}
      >
        <HeaderRowsDirective  >
          <HeaderRowDirective option="Year" template={ViewTable} />
          <HeaderRowDirective option="Date" />
          <HeaderRowDirective option="Hour" />
        </HeaderRowsDirective>
        <ViewsDirective>
          <ViewDirective option='TimelineDay' />
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
        <Inject services={[TimelineViews, TimelineMonth, Agenda, Resize]} />
      </ ScheduleComponent>
      <div id="grid"></div>
      {/* <Flex>
        <SearchEvent
          clearOnClick={clearOnClick}
          searchOnclick={searchOnclick}
          globalSearch={globalSearch}
        ></SearchEvent>
      </Flex> */}


    </>
  )

}
export default Schedular