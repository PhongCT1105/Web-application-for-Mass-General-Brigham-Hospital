import React from "react";
import { Header } from "@/components/blocks/header.tsx";
import { cartItem } from "@/routes/service-request/flower-request-content.tsx";
import { useEffect, useState } from "react";
import axios from "axios";
import { FlowerLogPage } from "@/routes/request-log/flowerLogPage.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs.tsx";
import { Badge, Biohazard, Calendar, FlowerIcon, PillIcon } from "lucide-react";
import { MedicationForm } from "common/src/interfaces/medicationReq.ts";
import { MedicineFormLogTable } from "@/routes/request-log/medicineLogPage.tsx";
import { SecurityFormLogTable } from "@/routes/request-log/securityLogPage.tsx";
import { columnsMedicationFormLog } from "@/routes/service-request/medicine-request/medicineColumns.tsx";
import { columnsSecurityFormLog } from "@/routes/service-request/securityColumns.tsx";
import { SecurityForm } from "common/src/interfaces/securityReq.ts";
export interface requestFormWID {
  reqID: number;
  cartItems: cartItem[];
  sender: string;
  recipient: string;
  location: string;
  message?: string;
  total: number;
}
interface CartItem {
  name: string;
  cost: number;
}
function parseCartItems(input: string): CartItem[] {
  const items: CartItem[] = [];
  const parts = input.split(",");

  for (let i = 0; i < parts.length; i += 2) {
    const name = parts[i];
    const cost = parseFloat(parts[i + 1]);

    if (!isNaN(cost)) {
      items.push({ name, cost });
    }
  }
  return items;
}

export interface RequestFormWID {
  reqID: number;
  cartItems: CartItem[];
  sender: string;
  recipient: string;
  location: string;
  message?: string;
  total: number;
}

interface securityRequest {
  reqID: number;
  ename: string;
  location: string;
  situation: string;
  call: boolean;
  status: string;
  priority: string;
}

export const RequestLogPage = () => {
  const [flowerLog, setFlowerLog] = useState<requestFormWID[]>([]);
  const [medicineLog, setMedicineLog] = useState<MedicationForm[]>([]);
  const [securityLog, setSecurityLog] = useState<SecurityForm[]>([]);

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
    fetchData().then(() => console.log(medicineLog));
  }, [medicineLog]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get("/api/flowerReq");
        const rawData = res.data;
        /* eslint-disable */
        const cleanedData: RequestFormWID[] = rawData.map(
          (item: {
            reqID: number;
            cartItems: any;
            sender: string;
            recipient: string;
            location: string;
            message: string;
            total: number;
          }) => ({
            reqID: item.reqID,
            cartItems: parseCartItems(item.cartItems),
            sender: item.sender,
            recipient: item.recipient,
            location: item.location,
            message: item.message,
            total: item.total,
          }),
        );
        /* eslint-enable */
        setFlowerLog(cleanedData);
        console.log("successfully got data from get request");
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData().then(() => console.log(flowerLog));
  }, [flowerLog]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get("/api/securityReq");
        const rawData = res.data;

        const cleanedData: securityRequest[] = rawData.map(
          (item: securityRequest) => ({
            reqID: item.reqID,
            ename: item.ename,
            location: item.location,
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
    fetchData().then(() => console.log(securityLog));
  }, [securityLog]);

  return (
    <div className={" scrollbar-hide"}>
      <Header />
      <div className="hidden md:block">
        <div className="border-t">
          <div className="bg-background">
            <div className="grid lg:grid-cols-5">
              {/*<Sidebar className="hidden lg:block"/>*/}
              <div className="col-span-4 lg:col-span-5 lg:border-l overflow-x-auto">
                <div className="col-span-5 lg:col-span-5 lg:border-l overflow-x-auto">
                  <div className=" pl-4 py-6 lg:pl-6">
                    <Tabs
                      defaultValue="Flower Request"
                      className="h-full space-y-6"
                    >
                      <div className="space-between flex items-center">
                        <TabsList>
                          <TabsTrigger value="Flower Request">
                            <FlowerIcon className="mr-2 h-4 w-4" />
                            Flower Request
                          </TabsTrigger>
                          <TabsTrigger value="Medication Request">
                            <PillIcon className="mr-2 h-4 w-4" />
                            Medication Request
                          </TabsTrigger>
                          <TabsTrigger value="Patient Transport Request">
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
                        </TabsList>
                      </div>
                      <TabsContent
                        value="Flower Request"
                        className="border-none p-0 flex-col data-[state=active]:flex "
                        // h-full  ^^^^^
                      >
                        <FlowerLogPage data={flowerLog} />
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
