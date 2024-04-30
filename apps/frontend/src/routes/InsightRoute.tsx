// import "../styles/example.route.css";
// import "../styles/globals.css";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import {
  Badge,
  BarChart4,
  Biohazard,
  Calendar,
  FlowerIcon,
  PillIcon,
} from "lucide-react";
import FlowerInsight from "@/routes/insight-request/FlowerInsight.tsx";
import OverallInsight from "@/routes/insight-request/Overall.tsx";
import SecurityInsight from "./insight-request/SecurityInsight";
import MedicationInsight from "./insight-request/MedicationInsight";
import PatientInsight from "./insight-request/PatientInsight";
import { FlowerForm } from "@/interfaces/flowerReq.ts";
import { MedicationForm } from "@/interfaces/medicationReq.ts";
import { SecurityForm } from "@/interfaces/securityReq.ts";
import { ScheduleForm } from "@/interfaces/roomScheduleReq.ts";
import { SanitationForm } from "@/interfaces/sanitationReq.ts";
import { MaintenanceForm } from "@/interfaces/maintenanceReq.ts";
import { useEffect, useState } from "react";
import axios from "axios";
import MaintenanceInsight from "./insight-request/MaintenanceInsight";
import SanitationInsight from "@/routes/insight-request/SanitationInsight.tsx";
import { GenericForm } from "@/interfaces/genericReq.ts";
import bannerFlowerImage from "@/assets/flower-banner.png";
import bannerMedicationImage from "@/assets/medication-banner.png";
import bannerRequestImage from "@/assets/request-banner.png";

function InsightRoute() {
  const [flowerLog, setFlowerLog] = useState<FlowerForm[]>([]);
  const [medicineLog, setMedicineLog] = useState<MedicationForm[]>([]);
  const [securityLog, setSecurityLog] = useState<SecurityForm[]>([]);
  const [tranportLog, setTransportLog] = useState<ScheduleForm[]>([]);
  const [sanitationLog, setSanitationLog] = useState<SanitationForm[]>([]);
  const [maintenanceLog, setMaintenanceLog] = useState<MaintenanceForm[]>([]);
  const [genericLog, setGenericLog] = useState<GenericForm[]>(
    [] as GenericForm[],
  );

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
        const genericData: GenericForm[] = cleanedData.map((item) => ({
          reqId: "ME" + item.id.toString(),
          name: item.employee,
          location: item.location,
          severity: item.medication[0].priority,
          status: item.medication[0].status,
        }));
        setGenericLog((prevState) => [...prevState, ...genericData]);
        console.log("successfully got data from get request");
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData().then(() => console.log("medicineLog"));
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
        const genericData: GenericForm[] = cleanedData.map((item) => ({
          reqId: "F" + item.reqID.toString(),
          name: item.sender,
          location: item.location,
          severity: item.priority,
          status: item.status,
        }));

        setGenericLog((prevState) => [...prevState, ...genericData]);

        console.log("successfully got data from get request");
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData().then(() => console.log("flowerLog"));
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
            dateSubmitted: item.dateSubmitted,
          }),
        );

        setSecurityLog(cleanedData);
        const genericData: GenericForm[] = cleanedData.map((item) => ({
          reqId: "SE" + item.reqID.toString(),
          name: item.employee,
          location: item.location,
          severity: item.priority,
          status: item.status,
        }));

        setGenericLog((prevState) => [...prevState, ...genericData]);

        console.log("successfully got data from get request");
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData().then(() => console.log("securityLog"));
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
        const genericData: GenericForm[] = cleanedData.map((item) => ({
          reqId: "SA" + item.reqId.toString(),
          name: item.name,
          location: item.location,
          severity: item.severity,
          status: item.status,
        }));

        setGenericLog((prevState) => [...prevState, ...genericData]);
        setSanitationLog(cleanedData);
        console.log("successfully got data from get request");
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData().then(() => console.log("sanitationLog"));
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
            dateSubmitted: item.dateSubmitted,
          }),
        );
        setTransportLog(cleanedData);
        const genericData: GenericForm[] = cleanedData.map((item) => ({
          reqId: "T" + item.reqID.toString(),
          name: item.employeeName,
          location: item.locationFrom,
          severity: item.priority,
          status: item.status,
        }));

        setGenericLog((prevState) => [...prevState, ...genericData]);
        console.log("successfully got data from get request");
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData().then(() => console.log("tranportLog"));
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
            dateSubmitted: item.dateSubmitted,
          }),
        );
        setMaintenanceLog(cleanedData);
        const genericData: GenericForm[] = cleanedData.map((item) => ({
          reqId: "MA" + item.reqId.toString(),
          name: item.name,
          location: item.location,
          severity: item.severity,
          status: item.status,
        }));

        setGenericLog((prevState) => [...prevState, ...genericData]);

        console.log("successfully got data from get request");
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData().then(() => console.log("maintenanceLog"));
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
                    <Tabs defaultValue="Overall" className="h-full space-y-6">
                      <div
                        className="space-between flex items-center"
                        style={{
                          marginLeft: "7.8%",
                          width: "83.5%",
                        }}
                      >
                        <TabsList>
                          <TabsTrigger value="Overall">
                            <BarChart4 className="mr-2 h-4 w-4" />
                            Overall Insight
                          </TabsTrigger>
                          <TabsTrigger value="Flower Insight">
                            <FlowerIcon className="mr-2 h-4 w-4" />
                            Flower Insight
                          </TabsTrigger>
                          <TabsTrigger value="Medication Insight">
                            <PillIcon className="mr-2 h-4 w-4" />
                            Medication Insight
                          </TabsTrigger>
                          <TabsTrigger value="Patient Transport Insight">
                            <Calendar className="mr-2 h-4 w-4" />
                            Patient Transport Insight
                          </TabsTrigger>
                          <TabsTrigger value="Sanitation Insight">
                            <Biohazard className="mr-2 h-4 w-4" />
                            Sanitation Insight
                          </TabsTrigger>
                          <TabsTrigger value="Security Insight">
                            <Badge className="mr-2 h-4 w-4" />
                            Security Insight
                          </TabsTrigger>
                          <TabsTrigger value="Maintenance Insight">
                            <Badge className="mr-2 h-4 w-4" />
                            Maintenance Insight
                          </TabsTrigger>
                        </TabsList>
                      </div>
                      <TabsContent
                        value="Overall"
                        className="border-none p-0 flex-col data-[state=active]:flex "
                      >
                        <div
                          className="flex items-center justify-between"
                          style={{
                            backgroundImage: `url(${bannerRequestImage})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            height: "100px",
                            borderRadius: "10px",
                            width: "83.5%",
                            marginLeft: "8%",
                          }}
                        >
                          <div className="space-y-1">
                            <h2
                              className="text-2xl font-semibold tracking-tight"
                              style={{
                                color: "white",
                                marginLeft: "20px",
                                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
                              }}
                            >
                              Overall Insight
                            </h2>
                          </div>
                        </div>
                        <Separator className="my-4 w-5/6 mx-auto" />
                        <OverallInsight props={genericLog} />
                      </TabsContent>
                      <TabsContent
                        value="Flower Insight"
                        className="border-none p-0 flex-col data-[state=active]:flex "
                        // h-full  ^^^^^
                      >
                        <div
                          className="flex items-center justify-between"
                          style={{
                            backgroundImage: `url(${bannerFlowerImage})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            height: "100px",
                            borderRadius: "10px",
                            width: "83.5%",
                            marginLeft: "8%",
                          }}
                        >
                          <div className="space-y-1">
                            <h2
                              className="text-2xl font-semibold tracking-tight"
                              style={{
                                color: "white",
                                marginLeft: "20px",
                                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
                              }}
                            >
                              Flower Insight
                            </h2>
                          </div>
                        </div>
                        <Separator className="my-4 w-5/6 mx-auto" />
                        <FlowerInsight props={flowerLog} />
                      </TabsContent>
                      <TabsContent
                        value="Medication Insight"
                        className=" flex-col border-none p-0 data-[state=active]:flex"
                      >
                        <div
                          className="flex items-center justify-between"
                          style={{
                            backgroundImage: `url(${bannerMedicationImage})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center 80%",
                            height: "100px",
                            borderRadius: "10px",
                            width: "83.5%",
                            marginLeft: "8%",
                          }}
                        >
                          <div className="space-y-1">
                            <h2
                              className="text-2xl font-semibold tracking-tight"
                              style={{
                                color: "white",
                                marginLeft: "20px",
                                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
                              }}
                            >
                              Medication Insight
                            </h2>
                          </div>
                        </div>
                        <Separator className="my-4 w-5/6 mx-auto" />
                        <MedicationInsight props={medicineLog} />
                      </TabsContent>
                      <TabsContent
                        value="Patient Transport Insight"
                        className="w-full flex-col border-none p-0 data-[state=active]:flex"
                      >
                        <div
                          className="flex items-center justify-between"
                          style={{
                            backgroundImage: `url(${bannerMedicationImage})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center 80%",
                            height: "100px",
                            borderRadius: "10px",
                            width: "83.5%",
                            marginLeft: "8%",
                          }}
                        >
                          <div className="space-y-1">
                            <h2
                              className="text-2xl font-semibold tracking-tight"
                              style={{
                                color: "white",
                                marginLeft: "20px",
                                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
                              }}
                            >
                              Patient Transport Insight
                            </h2>
                          </div>
                        </div>
                        <Separator className="my-4 w-5/6 mx-auto" />
                        <PatientInsight props={tranportLog} />
                      </TabsContent>
                      <TabsContent
                        value={"Sanitation Insight"}
                        className={
                          " w-full flex-col border-none p-0 data-[state=active]:flex"
                        }
                      >
                        <div
                          className="flex items-center justify-between"
                          style={{
                            backgroundImage: `url(${bannerMedicationImage})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center 80%",
                            height: "100px",
                            borderRadius: "10px",
                            width: "83.5%",
                            marginLeft: "8%",
                          }}
                        >
                          <div className="space-y-1">
                            <h2
                              className="text-2xl font-semibold tracking-tight"
                              style={{
                                color: "white",
                                marginLeft: "20px",
                                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
                              }}
                            >
                              Sanitation Insight
                            </h2>
                          </div>
                        </div>
                        <Separator className="my-4 w-5/6 mx-auto" />
                        <SanitationInsight props={sanitationLog} />
                      </TabsContent>
                      <TabsContent
                        value={"Security Insight"}
                        className={
                          " w-full flex-col border-none p-0 data-[state=active]:flex"
                        }
                      >
                        <div
                          className="flex items-center justify-between"
                          style={{
                            backgroundImage: `url(${bannerMedicationImage})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center 80%",
                            height: "100px",
                            borderRadius: "10px",
                            width: "83.5%",
                            marginLeft: "8%",
                          }}
                        >
                          <div className="space-y-1">
                            <h2
                              className="text-2xl font-semibold tracking-tight"
                              style={{
                                color: "white",
                                marginLeft: "20px",
                                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
                              }}
                            >
                              Security Insight
                            </h2>
                          </div>
                        </div>

                        <Separator className="my-4 w-5/6 mx-auto" />
                        <SecurityInsight props={securityLog} />
                      </TabsContent>
                      <TabsContent
                        value={"Maintenance Insight"}
                        className={
                          " w-full flex-col border-none p-0 data-[state=active]:flex"
                        }
                      >
                        <div
                          className="flex items-center justify-between"
                          style={{
                            backgroundImage: `url(${bannerMedicationImage})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center 80%",
                            height: "100px",
                            borderRadius: "10px",
                            width: "83.5%",
                            marginLeft: "8%",
                          }}
                        >
                          <div className="space-y-1">
                            <h2
                              className="text-2xl font-semibold tracking-tight"
                              style={{
                                color: "white",
                                marginLeft: "20px",
                                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
                              }}
                            >
                              Maintenance Insight
                            </h2>
                          </div>
                        </div>

                        <Separator className="my-4 w-5/6 mx-auto" />
                        <MaintenanceInsight props={maintenanceLog} />
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
}

export default InsightRoute;
