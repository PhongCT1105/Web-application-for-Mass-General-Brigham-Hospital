import axios from "axios";
import { useEffect, useState } from "react";
import { DataTable } from "@/components/table/data-table.tsx";
import { edgeColumns, nodeColumns } from "@/routes/map-editor/columns.tsx";

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

export const MapEditorPage = () => {
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
    <div className={"p-10 space-y-10"}>
      <DataTable data={nodes} columns={nodeColumns} />
      <DataTable data={edges} columns={edgeColumns} />
    </div>
  );
};
