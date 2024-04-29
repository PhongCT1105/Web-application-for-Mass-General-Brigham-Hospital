import React from "react";
// import { DataTable } from "@/components/table/data-table.tsx";
import { NodeDataTable } from "@/routes/map-editor/nodes/nodes-table.tsx";
import { nodeColumns } from "@/routes/map-editor/nodes/nodesData.tsx";
// import {Table} from "@/routes/map-editor/test.tsx";
import { edgeColumns } from "@/routes/map-editor/edges/edgeData.tsx";
import { EdgeDataTable } from "@/routes/map-editor/edges/edge-table.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import { Button } from "@/components/ui/button.tsx";
import { MapIcon } from "lucide-react";
import { InstructionsLink } from "@/routes/InstructionsPage.tsx";
export interface Node {
  nodeID: string;
  xcoord: number;
  ycoord: number;
  floor: string;
  building: string;
  nodeType: string;
  longName: string;
  shortName: string;
}
export interface Edge {
  edgeID: string;
  startNode: string;
  endNode: string;
}

export const MapEditorTablePage = () => {
  return (
    <>
      <div className=" pl-4 py-6 lg:pl-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">
              Map Editor
            </h2>
            <p className="text-sm text-muted-foreground">Table View</p>
          </div>
          <div className={"flex items-center"}>
            <InstructionsLink
              className={"mr-2"}
              location={"editor"}
            ></InstructionsLink>
            <Button
              variant={"outline"}
              className={"mr-3"}
              onClick={() => (window.location.href = "/map-editor/map")}
            >
              <MapIcon className={"mr-2"} />
              Map View
            </Button>
          </div>
        </div>
        <Separator className="my-4" />
        <div className={"space-y-5 mr-4"}>
          <NodeDataTable columns={nodeColumns} />
          <Separator className="my-4" />
          <EdgeDataTable columns={edgeColumns} />
        </div>
      </div>
    </>
  );
};
