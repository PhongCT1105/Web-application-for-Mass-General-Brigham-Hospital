import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import React from "react";
import { Car, Church, FlowerIcon } from "lucide-react";
// import { Requests } from "../data/requests"

type SidebarProps = React.HTMLAttributes<HTMLDivElement>;

export function Sidebar({ className }: SidebarProps) {
  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-xl font-semibold tracking-tight">
            Service Requests
          </h2>
          <div className="space-y-1">
            <Button variant="ghost" className="w-full justify-start">
              <FlowerIcon className="mr-2 h-4 w-4" />
              Flower Request
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Church className="mr-2 h-4 w-4" />
              Prayer Request
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Car className="mr-2 h-4 w-4" />
              Transportation Request
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
