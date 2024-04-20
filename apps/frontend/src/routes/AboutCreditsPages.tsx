// "use client";

import "../styles/globals.css";
// import { Sidebar } from "@/components/blocks/sidebar.tsx";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs.tsx";
import React from "react";
import { FileText, MessageSquareText } from "lucide-react";
import AboutMePage from "@/routes/AboutUsPage.tsx";
import CreditsPage from "@/routes/CreditsPage.tsx";

// const items = [15, 15, 15, 15, 20, 20, 20, 25, 50, 75];
// const randomItem = items[Math.floor(Math.random() * items.length)];

export default function AboutCreditsPages() {
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
                      defaultValue="About Us"
                      className="h-full space-y-6 mx-auto"
                    >
                      <div className="space-between flex items-center">
                        <TabsList>
                          <TabsTrigger value="About Us">
                            <MessageSquareText className="mr-2 h-4 w-4" />
                            About Us
                          </TabsTrigger>
                          <TabsTrigger value="Credits">
                            <FileText className="mr-2 h-4 w-4" />
                            Credits
                          </TabsTrigger>
                        </TabsList>
                      </div>
                      <TabsContent
                        value="About Us"
                        className="border-none p-0 flex-col data-[state=active]:flex "
                        // h-full  ^^^^^
                      >
                        <AboutMePage />
                      </TabsContent>
                      <TabsContent
                        value="Credits"
                        className=" flex-col border-none p-0 data-[state=active]:flex"
                      >
                        <CreditsPage />
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
