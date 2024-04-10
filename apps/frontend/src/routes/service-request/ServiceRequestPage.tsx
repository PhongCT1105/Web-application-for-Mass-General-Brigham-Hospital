// "use client";

import "../../styles/globals.css";
import { Header } from "@/components/blocks/header.tsx";
import { Separator } from "@/components/ui/separator.tsx";
// import { Sidebar } from "@/components/blocks/sidebar.tsx";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs.tsx";

import { Badge, FlowerIcon, PillIcon, Calendar, Biohazard } from "lucide-react";
import { FlowerContent } from "@/routes/service-request/flower-request-content.tsx";
import { Sanitation } from "@/routes/service-request/SanitationRequestPage.tsx";
import { SecurityForm } from "@/routes/service-request/SecurityRequestPage.tsx";
import { DataTable } from "@/routes/service-request/medicine-request/medicationREQ-data-table.tsx";
import { columns } from "@/routes/service-request/medicine-request/columns.tsx";
import { Medication } from "common/src/interfaces/medicationReq.ts";
import { pillData } from "common/src/testData.ts";
import React, { createContext, useContext, useState } from "react";
import { SheduleContent } from "@/routes/service-request/RoomScheduleRequestPage.tsx";

// const items = [15, 15, 15, 15, 20, 20, 20, 25, 50, 75];
// const randomItem = items[Math.floor(Math.random() * items.length)];

interface MedicineContextType {
  data: Medication[];
  setData: React.Dispatch<React.SetStateAction<Medication[]>>;
}

const MedicineContext = createContext<MedicineContextType>({
  data: [],
  // eslint-disable-next-line no-empty-function
  setData: () => {}, // A dummy function
});

// eslint-disable-next-line react-refresh/only-export-components
export const useMedicineData = () => useContext(MedicineContext);

export default function ServiceRequestPage() {
  const [data, setData] = useState<Medication[]>(pillData);

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
                        <FlowerContent />
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
                        <div className={"p-3"}>
                          <MedicineContext.Provider value={{ data, setData }}>
                            <div className={"space-y-4"}>
                              <DataTable columns={columns} />
                            </div>
                          </MedicineContext.Provider>
                        </div>
                      </TabsContent>
                      <TabsContent
                        value="Patient Transport Request"
                        className="w-full flex-col border-none p-0 data-[state=active]:flex"
                      >
                        <SheduleContent />
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
                        <Sanitation />
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
                        <SecurityForm />
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
