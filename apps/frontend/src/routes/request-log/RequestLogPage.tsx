import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Separator } from "@/components/ui/separator.tsx";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs.tsx";
import {
  Badge,
  Biohazard,
  Calendar,
  FlowerIcon,
  PillIcon,
  Hammer,
  BookOpen,
} from "lucide-react";
import { MedicationForm } from "@/interfaces/medicationReq.ts";
import { MedicineFormLogTable } from "@/routes/request-log/medicineLogPage.tsx";
import { SecurityFormLogTable } from "@/routes/request-log/securityLogPage.tsx";
import { MaintenanceForm } from "@/interfaces/maintenanceReq.ts";
import { columnsMedicationFormLog } from "@/routes/service-request/medicine-request/medicineColumns.tsx";
import { columnsSecurityFormLog } from "@/routes/service-request/securityColumns.tsx";
import { SecurityForm } from "@/interfaces/securityReq.ts";
import { columnsSanitationFormLog } from "@/routes/service-request/SanitationColumns.tsx";
import { SanitationForm } from "@/interfaces/sanitationReq.ts";
import { ScheduleForm } from "@/interfaces/roomScheduleReq.ts";
import { TransportRequestColumns } from "@/routes/service-request/transportResquest/transportTable.tsx";
import { DataTable } from "@/components/table/data-table.tsx";
import { FlowerForm } from "@/interfaces/flowerReq.ts";
import { columnsFlowerFormLog } from "@/routes/service-request/flower-request/flowerFormColumn.tsx";
import { columnsMaintenanceLog } from "@/routes/service-request/MaintenanceColumns.tsx";

export const RequestLogPage = () => {
  const [flowerLog, setFlowerLog] = useState<FlowerForm[]>([]);
  const [medicineLog, setMedicineLog] = useState<MedicationForm[]>([]);
  const [securityLog, setSecurityLog] = useState<SecurityForm[]>([]);
  const [tranportLog, setTransportLog] = useState<ScheduleForm[]>([]);
  const [sanitationLog, setSanitationLog] = useState<SanitationForm[]>([]);
  const [maintenanceLog, setMaintenanceLog] = useState<MaintenanceForm[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get("/api/medicationReq");
        const rawData = res.data;
        const cleanedData: MedicationForm[] = rawData.map(
          (item: MedicationForm) => ({
            id: item.id,
            medication: item.medication,
            employee: item.employee,
            location: item.location,
            patient: item.patient,
            dateSubmitted: item.dateSubmitted,
          }),
        );
        setMedicineLog(cleanedData);
        console.log("successfully got data from get request");
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData().then();
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get("/api/flowerReq");
        const rawData = res.data;

        const cleanedData: FlowerForm[] = rawData.map((item: FlowerForm) => ({
          reqID: item.reqID,
          cartItems: item.cartItems,
          sender: item.sender,
          recipient: item.recipient,
          location: item.location,
          message: item.message,
          total: item.total,
          dateSubmitted: item.dateSubmitted,
          priority: item.priority,
          status: item.status,
        }));
        setFlowerLog(cleanedData);
        console.log("successfully got data from get request");
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData().then();
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get("/api/securityReq");
        const rawData = res.data;

        const cleanedData: SecurityForm[] = rawData.map(
          (item: SecurityForm) => ({
            reqID: item.reqID,
            ename: item.ename,
            location: item.location,
            employee: item.employee,
            situation: item.situation,
            call: item.call.toString(),
            status: item.status,
            priority: item.priority,
          }),
        );

        setSecurityLog(cleanedData);
        console.log("successfully got data from get request");
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData().then();
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get("/api/sanitationReq");
        const rawData = res.data;
        const cleanedData: SanitationForm[] = rawData.map(
          (item: SanitationForm) => ({
            reqId: item.reqId,
            name: item.name,
            location: item.location,
            time: item.time,
            typeOfIssue: item.typeOfIssue,
            severity: item.severity,
            status: item.status,
            description: item.description,
            comments: item.comments,
          }),
        );
        setSanitationLog(cleanedData);
        console.log("successfully got data from get request");
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData().then();
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get("/api/transport");
        const rawData = res.data;
        const cleanedData: ScheduleForm[] = rawData.map(
          (item: ScheduleForm) => ({
            reqID: item.reqID,
            employeeName: item.employeeName,
            patientName: item.patientName,
            locationFrom: item.locationFrom,
            locationTo: item.locationTo,
            reason: item.reason,
            time: item.time,
            priority: item.priority,
            status: item.status,
            note: item.note,
            date: item.date,
          }),
        );
        setTransportLog(cleanedData);
        console.log("successfully got data from get request");
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData().then();
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get("/api/maintenanceReq");
        const rawData = res.data;
        const cleanedData: MaintenanceForm[] = rawData.map(
          (item: MaintenanceForm) => ({
            reqId: item.reqId,
            name: item.name,
            location: item.location,
            typeOfIssue: item.typeOfIssue,
            severity: item.severity,
            status: item.status,
            description: item.description,
          }),
        );
        setMaintenanceLog(cleanedData);
        console.log("successfully got data from get request");
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData().then();
  }, []);

  return (
    <div className={" scrollbar-hide"}>
      <div className="hidden md:block">
        <div className="border-t">
          <div className="bg-background">
            <div className="grid lg:grid-cols-5">
              {/*<Sidebar className="hidden lg:block"/>*/}
              <div className="col-span-4 lg:col-span-5 lg:border-l overflow-x-auto">
                <div className="col-span-5 lg:col-span-5 lg:border-l overflow-x-auto">
                  <div className=" pl-4 py-6 lg:pl-6">
                    <Tabs
                      defaultValue="All Requests"
                      className="h-full space-y-6"
                    >
                      <div className="space-between flex items-center">
                        <TabsList>
                          <TabsTrigger value="All Requests">
                            <BookOpen className="mr-2 h-4 w-4" />
                            All Requests
                          </TabsTrigger>
                          <TabsTrigger value="Flower Request">
                            <FlowerIcon className="mr-2 h-4 w-4" />
                            Flower Request
                          </TabsTrigger>
                          <TabsTrigger value="Medication Request">
                            <PillIcon className="mr-2 h-4 w-4" />
                            Medication Request
                          </TabsTrigger>
                          <TabsTrigger value="Transportation Request">
                            <Calendar className="mr-2 h-4 w-4" />
                            Patient Transport Request
                          </TabsTrigger>
                          <TabsTrigger value="Sanitation Request">
                            <Biohazard className="mr-2 h-4 w-4" />
                            Sanitation Request
                          </TabsTrigger>
                          <TabsTrigger value="Security Request">
                            <Badge className="mr-2 h-4 w-4" />
                            Security Request
                          </TabsTrigger>
                          <TabsTrigger value="Maintenance Request">
                            <Hammer className="mr-2 h-4 w-4" />
                            Maintenance Request
                          </TabsTrigger>
                        </TabsList>
                      </div>
                      <TabsContent
                        value="All Requests"
                        className="border-none p-0 flex-col data-[state=active]:flex "
                        // h-full  ^^^^^
                      >
                        <DataTable
                          data={flowerLog}
                          columns={columnsFlowerFormLog}
                        />
                      </TabsContent>
                      <TabsContent
                        value="Flower Request"
                        className="border-none p-0 flex-col data-[state=active]:flex "
                      >
                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <h2 className="text-2xl font-semibold tracking-tight">
                              Flower Request
                            </h2>
                            <p className="text-sm text-muted-foreground">
                              By Mina Boktor & Alexander Kraemling
                            </p>
                          </div>
                        </div>
                        <DataTable
                          data={flowerLog}
                          columns={columnsFlowerFormLog}
                        />
                      </TabsContent>
                      <TabsContent
                        value="Medication Request"
                        className=" flex-col border-none p-0 data-[state=active]:flex"
                      >
                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <h2 className="text-2xl font-semibold tracking-tight">
                              Medication Request
                            </h2>
                            <p className="text-sm text-muted-foreground">
                              By Mina Boktor & Alexander Kraemling
                            </p>
                          </div>
                        </div>
                        <Separator className="my-4" />
                        <MedicineFormLogTable
                          columns={columnsMedicationFormLog}
                          data={medicineLog}
                        />
                      </TabsContent>
                      <TabsContent
                        value={"Transportation Request"}
                        className={
                          " w-full flex-col border-none p-0 data-[state=active]:flex"
                        }
                      >
                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <h2 className="text-2xl font-semibold tracking-tight">
                              Transportation Request
                            </h2>
                            <p className="text-sm text-muted-foreground">
                              Get transportation to a local drop-off point.
                            </p>
                          </div>
                        </div>

                        <Separator className="my-4" />
                        <DataTable
                          searchBar={{
                            title: "employee name",
                            columnId: "employeeName",
                          }}
                          data={tranportLog}
                          columns={TransportRequestColumns}
                        />
                      </TabsContent>
                      <TabsContent
                        value={"Sanitation Request"}
                        className={
                          " w-full flex-col border-none p-0 data-[state=active]:flex"
                        }
                      >
                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <h2 className="text-2xl font-semibold tracking-tight">
                              Sanitation Request
                            </h2>
                            <p className="text-sm text-muted-foreground">
                              Get sanitation services for an Issue.
                            </p>
                          </div>
                        </div>
                        <Separator className="my-4" />
                        <DataTable
                          searchBar={{
                            title: "employee name",
                            columnId: "name",
                          }}
                          columns={columnsSanitationFormLog}
                          data={sanitationLog}
                        />
                      </TabsContent>
                      <TabsContent
                        value={"Security Request"}
                        className={
                          " w-full flex-col border-none p-0 data-[state=active]:flex"
                        }
                      >
                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <h2 className="text-2xl font-semibold tracking-tight">
                              Security Request
                            </h2>
                            <p className="text-sm text-muted-foreground">
                              Request Security services and optionally call 911.
                            </p>
                          </div>
                        </div>
                        <Separator className="my-4" />
                        <SecurityFormLogTable
                          columns={columnsSecurityFormLog}
                          data={securityLog}
                        />
                      </TabsContent>
                      <TabsContent
                        value={"Maintenance Request"}
                        className={
                          " w-full flex-col border-none p-0 data-[state=active]:flex"
                        }
                      >
                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <h2 className="text-2xl font-semibold tracking-tight">
                              Maintenance Request
                            </h2>
                            <p className="text-sm text-muted-foreground">
                              Get maintenance services for an Issue.
                            </p>
                          </div>
                        </div>
                        <Separator className="my-4" />
                        <DataTable
                          searchBar={{
                            title: "employee name",
                            columnId: "name",
                          }}
                          columns={columnsMaintenanceLog}
                          data={maintenanceLog}
                        />
                      </TabsContent>
                    </Tabs>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default RequestLogPage;
