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

function InsightRoute() {
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
                      <div className="space-between flex items-center">
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
                          <TabsTrigger value="Security Insight">
                            <Badge className="mr-2 h-4 w-4" />
                            Maintenance Insight
                          </TabsTrigger>
                        </TabsList>
                      </div>
                      <TabsContent
                        value="Overall"
                        className="border-none p-0 flex-col data-[state=active]:flex "
                      >
                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <h2 className="text-2xl font-semibold tracking-tight">
                              Overall Insight
                            </h2>
                          </div>
                        </div>
                        <Separator className="my-4" />
                        <OverallInsight />
                      </TabsContent>
                      <TabsContent
                        value="Flower Insight"
                        className="border-none p-0 flex-col data-[state=active]:flex "
                        // h-full  ^^^^^
                      >
                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <h2 className="text-2xl font-semibold tracking-tight">
                              Flower Insight
                            </h2>
                          </div>
                        </div>
                        <Separator className="my-4" />
                        <FlowerInsight />
                      </TabsContent>
                      <TabsContent
                        value="Medication Insight"
                        className=" flex-col border-none p-0 data-[state=active]:flex"
                      >
                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <h2 className="text-2xl font-semibold tracking-tight">
                              Medication Insight
                            </h2>
                          </div>
                        </div>
                        <Separator className="my-4" />
                        <MedicationInsight />
                      </TabsContent>
                      <TabsContent
                        value="Patient Transport Insight"
                        className="w-full flex-col border-none p-0 data-[state=active]:flex"
                      >
                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <h2 className="text-2xl font-semibold tracking-tight">
                              Patient Transport Insight
                            </h2>
                          </div>
                        </div>
                        <Separator className="my-4" />
                        <PatientInsight />
                      </TabsContent>
                      <TabsContent
                        value={"Sanitation Insight"}
                        className={
                          " w-full flex-col border-none p-0 data-[state=active]:flex"
                        }
                      >
                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <h2 className="text-2xl font-semibold tracking-tight">
                              Sanitation Insight
                            </h2>
                          </div>
                        </div>
                        <Separator className="my-4" />
                        <SecurityInsight />
                      </TabsContent>
                      <TabsContent
                        value={"Security Insight"}
                        className={
                          " w-full flex-col border-none p-0 data-[state=active]:flex"
                        }
                      >
                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <h2 className="text-2xl font-semibold tracking-tight">
                              Security Insight
                            </h2>
                          </div>
                        </div>

                        <Separator className="my-4" />
                        <SecurityInsight />
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
