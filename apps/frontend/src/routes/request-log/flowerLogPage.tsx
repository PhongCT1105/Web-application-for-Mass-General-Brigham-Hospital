// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableFooter,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover.tsx";
// import { Button } from "@/components/ui/button.tsx";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { MoreHorizontal } from "lucide-react";
// import { FlowerForm } from "@/interfaces/flowerReq.ts";
// interface props {
//   data: FlowerForm[];
// }
//
// export const FlowerLogPage = ({ data }: props) => {
//   return (
//     <div className={"my-10 mx-10 border-2 rounded-xl text-nowrap"}>
//       <Table>
//         <TableHeader>
//           <TableRow className={""}>
//             <TableHead className="">Invoice ID</TableHead>
//             <TableHead className="">Location</TableHead>
//             <TableHead className="">Total Cost</TableHead>
//             <TableHead className="text-right">Action</TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {data.map((item) => {
//             return (
//               <TableRow key={item.reqID}>
//                 <TableCell className="font-medium">#{item.reqID}</TableCell>
//                 <TableCell>{item.location}</TableCell>
//                 <TableCell>${item.total}</TableCell>
//                 <TableCell className="items-end w-[100px] text-right">
//                   <DropdownMenu>
//                     <DropdownMenuTrigger asChild>
//                       <Button variant="ghost" className="h-8 w-8 p-0">
//                         <span className="sr-only">Open menu</span>
//                         <MoreHorizontal className="h-4 w-4" />
//                       </Button>
//                     </DropdownMenuTrigger>
//                     <DropdownMenuContent align="end">
//                       <DropdownMenuLabel>Actions:</DropdownMenuLabel>
//                       <DropdownMenuSeparator />
//                       <div className={""}>
//                         <Popover>
//                           <PopoverTrigger>
//                             <Button variant={"ghost"} className={""}>
//                               Order Info
//                             </Button>
//                           </PopoverTrigger>
//                           <PopoverContent className={"w-[500px] "}>
//                             <Table>
//                               <TableHeader>
//                                 <TableRow>
//                                   <TableHead className="w-[100px]">
//                                     Sender
//                                   </TableHead>
//                                   <TableHead className="">Recipient</TableHead>
//                                   <TableHead className="text-right">
//                                     Message
//                                   </TableHead>
//                                 </TableRow>
//                               </TableHeader>
//                               <TableBody>
//                                 <TableRow key={item.reqID}>
//                                   <TableCell
//                                     className={"text-nowrap font-medium"}
//                                   >
//                                     {item.sender}
//                                   </TableCell>
//                                   <TableCell className="">
//                                     {item.recipient}
//                                   </TableCell>
//                                   <TableCell className="text-right items-end">
//                                     {item.message}
//                                   </TableCell>
//                                 </TableRow>
//                               </TableBody>
//                             </Table>
//                           </PopoverContent>
//                         </Popover>
//                         <Popover>
//                           <PopoverTrigger>
//                             <Button variant={"ghost"} className={""}>
//                               View Contents
//                             </Button>
//                           </PopoverTrigger>
//                           <PopoverContent>
//                             <Table>
//                               <TableHeader>
//                                 <TableRow>
//                                   <TableHead className="">Item Name</TableHead>
//                                   <TableHead className="text-right">
//                                     Item Cost
//                                   </TableHead>
//                                 </TableRow>
//                               </TableHeader>
//                               <TableBody>
//                                 {item.flowers.map((item) => (
//                                   <TableRow key={item.name}>
//                                     <TableCell
//                                       className={"text-nowrap font-medium"}
//                                     >
//                                       {item.name}
//                                     </TableCell>
//                                     <TableCell className="text-right">
//                                       ${item.cost}
//                                     </TableCell>
//                                   </TableRow>
//                                 ))}
//                               </TableBody>
//                             </Table>
//                           </PopoverContent>
//                         </Popover>
//                       </div>
//                     </DropdownMenuContent>
//                   </DropdownMenu>
//                 </TableCell>
//               </TableRow>
//             );
//           })}
//         </TableBody>
//         <TableFooter>
//           <TableRow>
//             <TableCell colSpan={3}>Total Entries</TableCell>
//             <TableCell className="font-bold text-right">
//               {data.length}
//             </TableCell>
//           </TableRow>
//         </TableFooter>
//       </Table>
//     </div>
//   );
// };
