import React, { createContext, useContext, useEffect, useState } from "react";
// import App from "@/App.tsx";
import axios from "axios";

interface GraphContextType {
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
const GraphContext = createContext<GraphContextType>({
  edges: [],
  nodes: [] as Node[],
  // eslint-disable-next-line no-empty-function
  setEdges: () => {},
  // eslint-disable-next-line no-empty-function
  setNodes: () => {},
});

// eslint-disable-next-line react-refresh/only-export-components
export const useGraphContext = () => useContext(GraphContext);

interface GraphStateProviderProps {
  children: React.ReactNode;
}

export const GraphStateProvider = ({ children }: GraphStateProviderProps) => {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const { data: nodeData } = await axios.get("/api/mapreq/nodes?");
        const { data: edgeData } = await axios.get("/api/mapreq/edges?");

        const updateEdges = edgeData.map((edgeItem: Edge) => ({
          edgeID: edgeItem.edgeID,
          startNode: edgeItem.startNode,
          endNode: edgeItem.endNode,
        }));
        setEdges(updateEdges);
        console.log("Successfully loaded edge data");
        // console.log(edgeData);

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

        setNodes(updatedNodes);
        console.log("Successfully loaded node data");
        // console.log(nodeData);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    loadData().then(() => console.log("Done loading nodes and edges."));
  }, []);

  return (
    <GraphContext.Provider value={{ nodes, setNodes, setEdges, edges }}>
      {children}
    </GraphContext.Provider>
  );
};
