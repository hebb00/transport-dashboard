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

import { Button } from "@chakra-ui/react"

function Schedular() {
  const [count, setCount] = useState(0)

  let resourceData = [
    {

      StartTime: new Date(2022, 1, 15, 10, 0),
    },
    {

      EndTime: new Date(2022, 1, 15, 12, 30),
    },
  ];

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


  // const editorWindowTemplate = (props: any): any => {
  //   return (
  //     <Table className="custom-event-editor">
  //       <Tbody>

  //         <Tr>
  //           <Td className="e-text-label">
  //             Client Name

  //           </Td>
  //           <Td>
  //             <Input id="client-name" className="e-field" name="subject" type="text" />
  //           </Td>
  //         </Tr>

  //         <Tr>
  //           <Td className="e-text-label">
  //             From
  //           </Td>
  //           <Td>
  //             <Input className="e-field" id="from" name="from" />
  //           </Td>
  //         </Tr>

  //         <Tr>
  //           <Td className="e-text-label">
  //             To
  //           </Td>
  //           <Td>
  //             <Input className="e-field" id="to" name="to" />
  //           </Td>
  //         </Tr>

  //         <Tr>
  //           <Td className="e-text-label">
  //             Start Time
  //           </Td>
  //           <Td>
  //             <DateTimePickerComponent className="e-field" id="StartTime" data-name="StartTime"
  //               value={new Date(props.startTime || props.StartTime)}
  //               format="dd/mm/yy hh:mm a"

  //             />
  //           </Td>
  //         </Tr>
  //         <Tr>
  //           <Td className="e-text-label">
  //             End Time
  //           </Td>
  //           <Td>
  //             <DateTimePickerComponent className="e-field" id="EndTime" data-name="EndTime"
  //               value={new Date(props.endTime || props.EndTime)}
  //               format="dd/mm/yy hh:mm a"

  //             />
  //           </Td>

  //         </Tr>
  //         <Tr>
  //           <Td className="e-text-label">
  //             Price
  //           </Td>
  //           <Td>
  //             <Input className="e-field" id="price" name="price" />
  //           </Td>
  //         </Tr>
  //       </Tbody>



  //     </Table>

  //   );



  // }


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

  return (

    <ScheduleComponent
      popupOpen={onPopupOpen}
      // editorTemplate={editorWindowTemplate}
      // showQuickInfo={false} its the first event popup
      eventSettings={{
        dataSource: resourceData,
        fields: {
          id: 'Id',
          subject: { name: 'Subject', title: 'From' },
          location: { name: 'Location', title: 'To' },
          description: { name: 'Description', title: 'Event Description' },
          startTime: { name: 'StartTime', title: 'Start Duration' },
          endTime: { name: 'EndTime', title: 'End Duration' },

        }
      }}
      rowAutoHeight={true}
      allowResizing={true}
      width="100%"
      height="550px"
      currentView="TimelineWeek"
      selectedDate={new Date(2022, 3, 1)}
      // eventSettings={{ dataSource: data }}
      group={{ resources: ["Rooms", "Owners"] }}
    >

      <HeaderRowsDirective  >
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