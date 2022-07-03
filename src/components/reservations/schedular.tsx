import {
  TimelineViews,
  TimelineMonth,
  Resize,
  ScheduleComponent,
  ViewsDirective,
  ViewDirective,
  ResourcesDirective,
  ResourceDirective,
  Inject,
  HeaderRowDirective,
  HeaderRowsDirective,
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
import { EventSettingsModel } from "@syncfusion/ej2-react-schedule";
import reservations from "/home/heba/my_transport/client/src/reservation-data.json"
import {

  Link as RouteLink
} from "react-router-dom";
import { Button } from "@chakra-ui/react"

function Schedular() {
  const [count, setCount] = useState(0)

  let localData: EventSettingsModel = {
    dataSource: [
      {
        Title: 'hey',
        Repeat: 'never',
        Vehicle: 'vehicle',
        Driver: 'nancy',
        Id: 3,
        Subject: 'Testing',
        StartTime: new Date(2022, 8, 29),
        EndTime: new Date(2022, 8, 30),
        IsAllDay: false,
        Location: 'india',
        Description: 'whatever'

      }

    ]
  };


  var roomData = [
    { RoomText: "vehicle 1", Id: 1, RoomColor: "#cb6bb2" },
    { RoomText: "vehicle 2", Id: 2, RoomColor: "#56ca85" },
  ];
  let ownerData = [
    {
      OwnerText: "Nancy",
      Id: 1,
      GroupId: 1,
      OwnerColor: "#ffaa00",
      capacity: 20,
      type: "Conference",
    },
    {
      OwnerText: "Steven",
      Id: 2,
      GroupId: 2,
      OwnerColor: "#f8a398",
      capacity: 20,
      type: "Conference",
    },
    {
      OwnerText: "Michael",
      Id: 3,
      GroupId: 1,
      OwnerColor: "#7499e1",
      capacity: 20,
      type: "Conference",
    },
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

      <Link

        as={RouteLink}
        color='teal.500'
        to="/reservation" >Reservations Table  <ExternalLinkIcon mx='2px' /></Link>
    );
  }

  return (

    <ScheduleComponent
      // popupOpen={onPopupOpen}
      // showQuickInfo={false} its the first event popup
      // eventSettings={
      //   localData
      // fields: {
      //   id: 'Id',
      //   subject: { name: 'Subject', title: 'From' },
      //   location: { name: 'Location', title: 'To' },
      //   // description: { name: 'Description', title: 'Event Description' },
      //   startTime: { name: 'StartTime', title: 'Start Duration' },
      //   endTime: { name: 'EndTime', title: 'End Duration' },

      // },


      // }
      rowAutoHeight={true}
      allowResizing={true}
      width="100%"
      height="550px"
      currentView="TimelineWeek"
      eventSettings={localData}
      group={{ resources: ["Rooms", "Owners"] }}
    >

      <HeaderRowsDirective  >
        <HeaderRowDirective option="Year" template={ViewTable} />

        {/* <HeaderRowDirective option="Week" /> */}
        <HeaderRowDirective option="Date" />

      </HeaderRowsDirective>
      <ViewsDirective>
        {/* <ViewDirective option="TimelineDay" /> */}
        <ViewDirective option="TimelineWeek" />
        <ViewDirective option="TimelineMonth" />
      </ViewsDirective>

      <ResourcesDirective>
        <ResourceDirective
          field="RoomId"
          title="Vehicle"
          name="Rooms"
          dataSource={roomData}
          textField="RoomText"
          idField="Id"
          colorField="RoomColor"
        ></ResourceDirective>
        <ResourceDirective
          field="OwnerId"
          title="Driver"
          name="Owners"
          allowMultiple={true}
          dataSource={ownerData}
          textField="OwnerText"
          idField="Id"
          groupIDField="GroupId"
          colorField="OwnerColor"
        ></ResourceDirective>
      </ResourcesDirective>

      <Inject services={[TimelineViews, TimelineMonth, Resize]} />
    </ScheduleComponent>

  )

}
export default Schedular