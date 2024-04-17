import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
// import { DataTable } from "@/components/table/data-table.tsx";
import { NodeDataTable } from "@/routes/map-editor/nodes/nodes-table.tsx";
import { nodeColumns } from "@/routes/map-editor/nodes/nodesData.tsx";
// import {Table} from "@/routes/map-editor/test.tsx";
import { edgeColumns } from "@/routes/map-editor/edges/edgeData.tsx";
import { EdgeDataTable } from "@/routes/map-editor/edges/edge-table.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import { Button } from "@/components/ui/button.tsx";
import { MapIcon } from "lucide-react";

interface MedicineContextType {
  nodes: Node[];
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
  edges: Edge[];
  setEdges: React.Dispatch<React.SetStateAction<Edge[]>>;
}
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
const GraphContext = createContext<MedicineContextType>({
  edges: [],
  nodes: [] as Node[],
  // eslint-disable-next-line no-empty-function
  setEdges: () => {},
  // eslint-disable-next-line no-empty-function
  setNodes: () => {},
});

// eslint-disable-next-line react-refresh/only-export-components
export const useGraphContext = () => useContext(GraphContext);
export const MapEditorTablePage = () => {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const { data: nodeData } = await axios.get(`/api/mapreq/nodes?`);
        const { data: edgeData } = await axios.get(`/api/mapreq/edges?`);

        const updateEdges = edgeData.map((edgeItem: Edge) => ({
          edgeID: edgeItem.edgeID,
          startNode: edgeItem.startNode,
          endNode: edgeItem.endNode,
        }));

        // Accumulate changes in a temporary array
        const updatedNodes = nodeData.map((nodeItem: Node) => ({
          nodeID: nodeItem.nodeID,
          xcoord: nodeItem.xcoord,
          ycoord: nodeItem.ycoord,
          floor: nodeItem.floor,
          building: nodeItem.building,
          nodeType: nodeItem.nodeType,
          longName: nodeItem.longName,
          shortName: nodeItem.shortName,
        }));

        // Set the state once after the loop
        setEdges(updateEdges);
        setNodes(updatedNodes);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    loadData().then(() => console.log("succ"));
  }, []);

  return (
    <GraphContext.Provider value={{ nodes, setNodes, setEdges, edges }}>
      <div className=" pl-4 py-6 lg:pl-6">
        {/*  <div className="space-between flex items-center">*/}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">
              Map Editor
            </h2>
            <p className="text-sm text-muted-foreground">Table View</p>
          </div>
          <div className={"flex items-center"}>
            <Button
              variant={"outline"}
              className={"mr-3"}
              onClick={() => (window.location.href = "/map-editor/map")}
            >
              {/*<p className="text-sm text-muted-foreground"> Map View?</p>*/}
              <MapIcon className={"mr-2"} />
              Map View
            </Button>
          </div>
        </div>
        <Separator className="my-4" />
        <div className={"space-y-5"}>
          <NodeDataTable columns={nodeColumns} />
          <Separator className="my-4" />

          <EdgeDataTable columns={edgeColumns} />
          {/*<Table></Table>*/}
          {/*</div>*/}
        </div>
      </div>
    </GraphContext.Provider>
  );
};
