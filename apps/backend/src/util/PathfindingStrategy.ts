import { Graph } from "./Graph.tsx";
import { Node } from "./Node.tsx";

// Define PathfindingStrategy interface
export interface PathfindingStrategy {
  findPath(graph: Graph, startNodeID: string, endNodeID: string): Node[];
}
