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
interface props {
  data: ScheduleForm[];
}

export const TranportRequestTable = ({ data }: props) => {
  return (
    <div className={"my-10 mx-10 border-2 rounded-xl text-nowrap"}>
      <Table>
        <TableHeader>
          <TableRow className={""}>
            <TableHead className="">Patient Name</TableHead>
            <TableHead className="">From</TableHead>
            <TableHead className="">To</TableHead>
            <TableHead className="">Date</TableHead>
            <TableHead className="">Time</TableHead>
            <TableHead className="">Reason</TableHead>
            <TableHead className="">Note</TableHead>
            <TableHead className="">Priority</TableHead>
            <TableHead className="">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((request) => {
            return (
              <TableRow>
                <TableCell>{request.name}</TableCell>
                <TableCell>{request.locationFrom}</TableCell>
                <TableCell>{request.locationTo}</TableCell>
                <TableCell>{format(request.date, "MMMM do, yyyy")}</TableCell>
                <TableCell>{request.time}</TableCell>
                <TableCell>{request.reason}</TableCell>
                <TableCell>{request.note}</TableCell>
                <TableCell>{request.priority}</TableCell>
                <TableCell>{request.status}</TableCell>
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
