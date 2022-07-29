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
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { HStack, Link, Box, Flex } from '@chakra-ui/react';

import { fetchData, getData } from "./reservation-service";
import { getData as vehiclesInfo } from "../vehicles/vehicle-service";
import { getData as driversInfo } from "../drivers/driver-service"
import { getData as clientsInfo } from "../clients/client-service"

import ReactDOM from "react-dom";
import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";

export let scheduleObj: ScheduleComponent | null;

function Schedular() {
  const [cookies, setCookie] = useCookies()
  var [vehicles, setVehicles] = useState<any>([]);
  var [drivers, setDrivers] = useState<any>([]);
  const [data, setData] = useState<any>([{
    Id: 3,
    Subject: "collage trip",
    StartTime: "2022-08-10T04:30:00.000Z",
    EndTime: "2022-08-10T07:00:00.000Z",
    IsAllDay: false,
    vehicle_id: 2,
    driver_id: 4
  }]);
  var [client, setClients] = useState<any>([{ text: "test", value: 1 }]);
  useEffect(() => {

    clientsInfo("client").then(async res => {
      if (res.status == 200) {
        var clients = await res.json();
        console.log("on popup clients", clients);

        setClients([
          { text: `${clients[0]?.firstname}`, value: clients[0]?.id },
          { text: `${clients[1]?.firstname}`, value: clients[1]?.id },
          { text: `${clients[2]?.firstname}`, value: clients[2]?.id },
        ])
        console.log("on popup otpipns", client);
      } else {
        console.log(" error inside getClient: ", res.status);

      }
    })

  }, [])
  useEffect(() => {
    getData('reservation').then(async res => {
      if (res.status == 200) {
        const book = await res.json();
        setData(book)
        console.log(" books: ", book);
      } else {
        console.log(" error inside books: ", res.status);
      }
    })
  }, []);

  useEffect(() => {
    vehiclesInfo('vehicle').then(async res => {
      if (res.status == 200) {
        const cars = await res.json();
        setVehicles(cars)
        console.log(" vehicles inside getvehicles: ", cars);
      } else {
        console.log(" error inside getvehicles: ", res.status);
      }

    })
  }, []);

  var vehiclesData: Record<string, any>[] = [];
  var colors = ['#cb6bb2', '#56ca85', '#df5286']
  for (var i = 0; i < vehicles.length; i++) {
    vehiclesData[i] = {
      text: `${vehicles[i]?.plate_num}`, id: vehicles[i]?.id, color: colors[i]
    }
  }
  useEffect(() => {
    driversInfo('driver').then(async res => {
      if (res.status == 200) {
        const person = await res.json();
        setDrivers(person)
        console.log(" driver inside driverInfo: ", person);
      } else {
        console.log(" error inside Driverinfo: ", res.status);
      }

    })
  }, []);
  var driversData: Record<string, any>[] = [];
  var colors = ['#df5286', '#7fa900', '#ea7a57', '#5978ee'];
  var group = [vehicles[0]?.id, vehicles[0]?.id, vehicles[1]?.id, vehicles[1]?.id]
  for (let j = 0; j < drivers.length; j++) {
    driversData[j] = {
      text: `${drivers[j]?.firstname}`, id: drivers[j]?.id, groupId: group[j], color: colors[j]
    }
  }



  const onPopupOpen = (args: any) => {


    if (args.type === 'Editor') {
      if (!args.element.querySelector('.custom-field-row')) {
        let row = createElement('div', { className: 'custom-field-row' })
        let formElement = args.element.querySelector('.e-schedule-form');
        formElement.firstChild.insertBefore(row, formElement.firstChild.firstChild);
        let container0 = createElement('div', { className: 'custom-field-container' });


        let _container = createElement('div', { className: "e-float-input e-control-wrapper" })
        let _inputEle = createElement('input', {
          className: 'e-field', attrs: { name: 'price', type: 'number' }
        });
        let _label = createElement('label', {
          className: '  e-float-text e-label-top',
          innerHTML: "Price", attrs: { id: "label_Subject" }
        });
        _container.appendChild(_inputEle);
        _container.appendChild(_label);
        container0.appendChild(_container);
        row.appendChild(container0);

        let _input = createElement('input', {
          className: 'e-field', attrs: { name: 'source' }
        });
        let _labe = createElement('label', {
          className: '  e-float-text e-label-top',
          innerHTML: "source", attrs: { id: "label_Subject" }
        });
        let containe = createElement('div', { className: "e-float-input e-control-wrapper" })
        let containe0 = createElement('div', { className: 'custom-field-container' });
        containe.appendChild(_input);
        containe.appendChild(_labe);
        containe0.appendChild(containe);
        row.appendChild(containe0);
        let Row: HTMLElement = createElement('div', { className: 'custom-field-row' });
        let FormElement: HTMLElement = args.element.querySelector('.e-schedule-form');
        FormElement.firstChild!.insertBefore(Row, FormElement.firstChild!.firstChild);
        let Container: HTMLElement = createElement('div', { className: 'custom-field-container' });
        let InputEle: HTMLInputElement = createElement('input', {
          className: 'e-field', attrs: { name: 'client_id' }
        }) as HTMLInputElement;
        Container.appendChild(InputEle);
        Row.appendChild(Container);
        let dropDownList: DropDownList = new DropDownList({
          dataSource: client,
          fields: { text: 'text', value: 'value' },
          value: args.data.EventType as string,
          floatLabelType: 'Always', placeholder: 'client'
        });
        dropDownList.appendTo(InputEle);
        InputEle.setAttribute('name', 'client_id');

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
  function onActionComplete(e: any) {
    var userId = cookies.user.id;
    console.log(e, "on action complete")
    if (e.requestType == "eventCreated") {
      let reservation = e.data[0];
      fetchData(reservation, `reservation/${userId}`).then(async res => {
        if (res.status == 200) {
          const result = await res.json();
          console.log("result is ", result)
        } else {
          console.log("error ", res.status)
        }
      });
    }
    if (e.requestType == "eventRemoved") {
      const id = e.data[0].Id;
      console.log(id, "event id")
      getData(`delete-reservation/${id}`).then(async res => {
        if (res.status == 200) {
          const result = await res.json();
          console.log("result is ", result)
        } else {
          console.log("error ", res.status)
        }
      });
    }
    if (e.requestType == "eventChanged") {
      let reservation = e.data[0];
      let resId = e.data[0].Id
      fetchData(reservation, `modify-reservation/${resId}/${userId}`).then(async res => {
        if (res.status == 200) {
          const result = await res.json();
          console.log("result is ", result)
        } else {
          console.log("error ", res.status)
        }
      });
    }
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
        allowResizing={false}
        actionComplete={onActionComplete}
        width='100%' height='650px'
        currentView="TimelineWeek"
        group={{ resources: ['vehicles', 'drivers'] }}
      >
        <ResourcesDirective>
          <ResourceDirective field='vehicle_id' title='Choose vehicle' name='vehicles' allowMultiple={false}
            dataSource={vehiclesData} textField='text' idField='id' colorField='color'>
          </ResourceDirective>
          <ResourceDirective field='driver_id' title='driver' name='drivers' allowMultiple={true}
            dataSource={driversData} textField='text' idField='id' groupIDField='groupId' colorField='color'>
          </ResourceDirective>
        </ResourcesDirective>
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
        <Inject services={[TimelineViews, TimelineMonth, Agenda, Resize]} />
      </ ScheduleComponent>
      <div id="grid"></div>
    </>
  )
}
export default Schedular