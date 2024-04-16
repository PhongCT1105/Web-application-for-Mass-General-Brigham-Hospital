import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScheduleForm } from "common/src/interfaces/roomScheduleReq.ts";
import { format } from "date-fns";
import React from "react";
import { Button } from "@/components/ui/button.tsx";
import { CircleEllipsis } from "lucide-react";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu.tsx";
// import { Button } from "@/components/ui/button.tsx";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover.tsx";
// import { MoreHorizontal } from "lucide-react";
interface props {
  data: ScheduleForm[];
}

export const TranportRequestTable = ({ data }: props) => {
  return (
    <div className={"my-10 mx-10 border-2 rounded-xl text-nowrap"}>
      <Table>
        <TableHeader>
          <TableRow className={""}>
            <TableHead>Invoice ID</TableHead>
            <TableHead className="">Patient Name</TableHead>
            <TableHead className="">From</TableHead>
            <TableHead className="">To</TableHead>
            <TableHead className="">Date</TableHead>
            <TableHead className="">Time</TableHead>
            <TableHead className="">Priority</TableHead>
            <TableHead className="">Status</TableHead>
            <TableHead className="">Detail</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((request) => {
            return (
              <TableRow>
                <TableCell>{request.reqID}</TableCell>
                <TableCell>{request.name}</TableCell>
                <TableCell>{request.locationFrom}</TableCell>
                <TableCell>{request.locationTo}</TableCell>
                <TableCell>{format(request.date, "MMMM do, yyyy")}</TableCell>
                <TableCell>{request.time}</TableCell>
                <TableCell>{request.priority}</TableCell>
                <TableCell>{request.status}</TableCell>
                <TableCell className="items-end w-[100px] text-right">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="ghost"
                        className={"mr-3 hover:bg-transparent"}
                      >
                        <CircleEllipsis></CircleEllipsis>
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[1000px]">
                      <DialogHeader>
                        <DialogTitle>Request Information</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-6 mt-6">
                        <div>
                          <h1 className="text-2xl font-bold">Patient Name:</h1>
                          <h2>{request.name}</h2>
                        </div>
                        <div className="flex">
                          <div className="w-1/4">
                            <h1 className="text-2xl font-bold">
                              Priority Level:
                            </h1>
                            <h2>{request.priority}</h2>
                          </div>
                          <div className="w-1/3 mr-2">
                            <h1 className="text-2xl font-bold">Location:</h1>
                            <div className="grid gap-2">
                              <h2 className="text-m">From:</h2>
                              <h2>{request.locationFrom}</h2>
                              <h2 className="text-m">To:</h2>
                              <h2>{request.locationTo}</h2>
                            </div>
                          </div>
                          <div className="w-1/6">
                            <h1 className="text-2xl font-bold">Time:</h1>
                            <h2>{request.time}</h2>
                            <h1 className="mt-3 text-2xl font-bold">Date:</h1>
                            <h2>{format(request.date, "MMMM do, yyyy")}</h2>
                          </div>
                          <div className="w-1/4 ml-12">
                            <h1 className="text-2xl font-bold">Status:</h1>
                            <h2>{request.status}</h2>
                          </div>
                        </div>
                        <div>
                          <h1 className="text-2xl font-bold">Reason:</h1>
                          <h2>{request.reason}</h2>
                        </div>
                        <div>
                          <h1 className="text-2xl font-bold">Note:</h1>
                          <h2>{request.note}</h2>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                  {/*<DropdownMenu>*/}
                  {/*  <DropdownMenuTrigger asChild>*/}
                  {/*    <Button variant="ghost" className="h-8 w-8 p-0">*/}
                  {/*      <span className="sr-only">Open menu</span>*/}
                  {/*      <MoreHorizontal className="h-4 w-4" />*/}
                  {/*    </Button>*/}
                  {/*  </DropdownMenuTrigger>*/}
                  {/*  <DropdownMenuContent align="end">*/}
                  {/*    <DropdownMenuLabel>Actions:</DropdownMenuLabel>*/}
                  {/*    <DropdownMenuSeparator />*/}
                  {/*    <div className={""}>*/}
                  {/*      <Popover>*/}
                  {/*        <PopoverTrigger>*/}
                  {/*          <Button variant={"ghost"} className={""}>*/}
                  {/*            Order Info*/}
                  {/*          </Button>*/}
                  {/*        </PopoverTrigger>*/}
                  {/*        <PopoverContent className={"w-[500px] "}>*/}
                  {/*          <Table>*/}
                  {/*            <TableHeader>*/}
                  {/*              <TableRow>*/}
                  {/*                <TableHead className="">*/}
                  {/*                  Patient Name*/}
                  {/*                </TableHead>*/}
                  {/*                <TableHead className="">From</TableHead>*/}
                  {/*                <TableHead className="">To</TableHead>*/}
                  {/*                <TableHead className="">Date</TableHead>*/}
                  {/*                <TableHead className="">Time</TableHead>*/}
                  {/*                <TableHead className="">Reason</TableHead>*/}
                  {/*                <TableHead className="">Note</TableHead>*/}
                  {/*                <TableHead className="">Priority</TableHead>*/}
                  {/*                <TableHead className="">Status</TableHead>*/}
                  {/*              </TableRow>*/}
                  {/*            </TableHeader>*/}
                  {/*            <TableBody>*/}
                  {/*              <TableRow key={request.id}>*/}
                  {/*                <TableCell*/}
                  {/*                  className={"text-nowrap font-medium"}*/}
                  {/*                >*/}
                  {/*                  {request.name}*/}
                  {/*                </TableCell>*/}
                  {/*                <TableCell className="">*/}
                  {/*                  {request.locationFrom}*/}
                  {/*                </TableCell>*/}
                  {/*                <TableCell className="text-right items-end">*/}
                  {/*                  {request.locationTo}*/}
                  {/*                </TableCell>*/}
                  {/*                <TableCell className="text-right items-end">*/}
                  {/*                  {format(request.date, "MMMM do, yyyy")}*/}
                  {/*                </TableCell>*/}
                  {/*                <TableCell className="text-right items-end">*/}
                  {/*                  {request.reason}*/}
                  {/*                </TableCell>*/}
                  {/*                <TableCell className="text-right items-end">*/}
                  {/*                  {request.note}*/}
                  {/*                </TableCell>*/}
                  {/*                <TableCell className="text-right items-end">*/}
                  {/*                  {request.priority}*/}
                  {/*                </TableCell>*/}
                  {/*                <TableCell className="text-right items-end">*/}
                  {/*                  {request.status}*/}
                  {/*                </TableCell>*/}
                  {/*              </TableRow>*/}
                  {/*            </TableBody>*/}
                  {/*          </Table>*/}
                  {/*        </PopoverContent>*/}
                  {/*      </Popover>*/}
                  {/*    </div>*/}
                  {/*  </DropdownMenuContent>*/}
                  {/*</DropdownMenu>*/}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={8}>Total Entries</TableCell>
            <TableCell className="font-bold text-right">
              {data.length}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};
