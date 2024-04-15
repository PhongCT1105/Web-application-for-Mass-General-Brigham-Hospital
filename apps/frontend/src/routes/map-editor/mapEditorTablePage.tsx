import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
// import { DataTable } from "@/components/table/data-table.tsx";
import { NodeDataTable } from "@/routes/map-editor/nodes/nodes-table.tsx";
import { nodeColumns } from "@/routes/map-editor/nodes/nodesData.tsx";
// import {Table} from "@/routes/map-editor/test.tsx";
import { edgeColumns } from "@/routes/map-editor/edges/edgeData.tsx";
import { EdgeDataTable } from "@/routes/map-editor/edges/edge-table.tsx";
import { Header } from "@/components/blocks/header.tsx";

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
      <Header highlighted={"/map-editor"} />
      <div className={"p-10 space-y-20"}>
        <NodeDataTable columns={nodeColumns} />
        <EdgeDataTable columns={edgeColumns} />
        {/*<Table></Table>*/}
      </div>
    </GraphContext.Provider>
  );
};
