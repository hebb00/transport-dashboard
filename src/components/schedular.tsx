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
import { DateTimePickerComponent } from "@syncfusion/ej2-react-calendars";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
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

  return (

    <ScheduleComponent
      // editorTemplate={edit.bind(m)}
      // showQuickInfo={false} its the first event popup
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
          title="Owner"
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