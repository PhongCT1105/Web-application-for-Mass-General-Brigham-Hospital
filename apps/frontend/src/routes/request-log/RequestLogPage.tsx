import React from "react";
import { Header } from "@/components/blocks/header.tsx";
import { cartItem } from "@/routes/service-request/flower-request-content.tsx";
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { LogPageData } from "@/routes/request-log/log-page-data.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs.tsx";
import { Badge, Biohazard, Calendar, FlowerIcon, PillIcon } from "lucide-react";
import { Medication } from "common/src/interfaces/medicationReq.ts";
import { pillData } from "common/src/testData.ts";
import { DataTable } from "@/routes/service-request/medicine-request/medicationREQ-data-table.tsx";
import { columns } from "@/routes/service-request/medicine-request/columns.tsx";
// import { MedicineContext } from "common/src/interfaces/medicationReq.ts";

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

export const RequestLogPage = () => {
  const [cleanedData, setCleanedData] = useState<requestFormWID[]>([]);
  const [data, setData] = useState<Medication[]>(pillData);

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
        setCleanedData(cleanedData);
        console.log("successfully got data from get request");
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData().then(() => console.log(cleanedData));
  }, [cleanedData]);

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
                        <LogPageData data={cleanedData} />
                      </TabsContent>
                      <TabsContent
                        value="Medicine Request"
                        className=" flex-col border-none p-0 data-[state=active]:flex"
                      >
                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <h2 className="text-2xl font-semibold tracking-tight">
                              Prayer Request
                            </h2>
                            <p className="text-sm text-muted-foreground">
                              By Mina Boktor & Alexander Kraemling
                            </p>
                          </div>
                        </div>
                        <Separator className="my-4" />
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
                        <MedicineContext.Provider value={{ data, setData }}>
                          <DataTable columns={columns} />
                        </MedicineContext.Provider>
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
