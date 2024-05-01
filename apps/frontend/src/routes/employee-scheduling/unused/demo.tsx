// import React, { useEffect, useState } from "react";
// import { DndContext, DragEndEvent, rectIntersection } from "@dnd-kit/core";
// import { EmployeeLane } from "@/routes/employee-scheduling/employeeRowLane.tsx";
// import { Button } from "@/components/ui/button.tsx";
// import { Input } from "@/components/ui/input.tsx";
// import { Card, CardContent } from "@/components/ui/card";
// import { Label } from "@/components/ui/label.tsx";
// import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area.tsx";
// import axios from "axios";
// import { Employee } from "@/interfaces/employeeInterface.ts";
// export interface ECard {
//   title: string;
// }
//
// export const WeekDays = {
//   Unassigned: "Unassigned",
//   Monday: "Monday",
//   Tuesday: "Tuesday",
//   Wednesday: "Wednesday",
//   Thursday: "Thursday",
//   Friday: "Friday",
//   Saturday: "Saturday",
//   Sunday: "Sunday",
// } as const;
//
// export const SchedulingPage = () => {
//   const [dayItems, setDayItems] = useState<{ [key: string]: ECard[] }>({
//     Unassigned: [],
//     Monday: [],
//     Tuesday: [],
//     Wednesday: [],
//     Thursday: [],
//     Friday: [],
//     Saturday: [],
//     Sunday: [],
//   });
//   const [curr, setCurr] = useState<ECard>({} as ECard);
//
//   useEffect(() => {
//     let cleanedData: { employee: string }[];
//     async function fetchData() {
//       try {
//         const res = await axios.get("api/employeeData");
//         const rawData = res.data;
//         cleanedData = rawData.map((item: Employee) => ({
//           employee: `${item.fName} ${item.lName}`,
//         }));
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     }
//     fetchData().then(() => {
//       console.log(cleanedData);
//       // for (const cleanedDatum of cleanedData) addNewCard(cleanedDatum.employee, WeekDays.Unassigned);
//     });
//   }, []);
//
//   const addNewCard = (title: string, day: keyof typeof WeekDays) => {
//     setDayItems((prevDayItems) => {
//       const updatedItems = { ...prevDayItems };
//       updatedItems[day] = [...prevDayItems[day], { title }];
//       return updatedItems;
//     });
//   };
//
//   const handleDrag = (e: DragEndEvent) => {
//     const container = e.over?.id;
//     const title = e.active.data.current?.title;
//     const index = e.active.data.current?.index;
//     const parent = e.active.data.current?.parent;
//
//     if (parent === container) return;
//
//     const dayToUpdate = Object.keys(dayItems).find(
//       (day) => day === container || day === parent,
//     );
//
//     if (!dayToUpdate) return;
//
//     setDayItems((prevDayItems) => {
//       const updatedItems = { ...prevDayItems };
//       if (container && parent && container !== parent) {
//         // Move card from parent to container
//         updatedItems[container] = [...prevDayItems[container], { title }];
//         updatedItems[parent] = prevDayItems[parent].filter(
//           (_, i) => i !== index,
//         );
//       }
//       return updatedItems;
//     });
//   };
//
//   // @ts-ignore
//   // @ts-ignore
//   return (
//     <DndContext collisionDetection={rectIntersection} onDragEnd={handleDrag}>
//       <Card className={"pt-5 m-10 "}>
//         <CardContent className={"space-y-4"}>
//           <Label>
//             Title
//             <Input
//               onChange={(e) => setCurr({ title: e.target.value })}
//               id={"title"}
//               type={"text"}
//             />
//           </Label>
//           <Button onClick={() => addNewCard(curr.title, WeekDays.Unassigned)}>
//             Add
//           </Button>
//         </CardContent>
//       </Card>
//
//       <div className={"overflow-x-auto y top-0 bg-white z-10 pb-10"}>
//         {/*<EmployeeLane key={WeekDays.Unassigned} title={WeekDays.Unassigned} items={dayItems["Unassigned"]}/>*/}
//         <ScrollArea className={"whitespace-nowrap"}>
//           <div className={"flex flex-row space-x-2 p-5 "}>
//             {Object.keys(WeekDays).map((day) => (
//               // @ts-ignore: this is because blah blah blah
//               <EmployeeLane
//                 key={day}
//                 // @ts-expect-error: this is because blah blahS
//                 title={WeekDays[day]}
//                 items={dayItems[day]}
//               />
//             ))}
//             <ScrollBar orientation={"horizontal"} />
//           </div>
//         </ScrollArea>
//       </div>
//     </DndContext>
//   );
// };
