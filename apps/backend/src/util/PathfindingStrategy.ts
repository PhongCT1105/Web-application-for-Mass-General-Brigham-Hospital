import { Graph } from "./Graph.ts";
import { Node } from "./Node.ts";
import { BFS } from "./BFS.ts";
import { aStar } from "./aStar.ts";
//import { Dijkstra } from "./Dijkstra.ts";

// Define PathfindingStrategy interface
export interface PathfindingStrategy {
  findPath(graph: Graph, startNodeID: string, endNodeID: string): Node[];
}

// Implement BFSPathfindingStrategy
export class BFSPathfindingStrategy implements PathfindingStrategy {
  findPath(graph: Graph, startNodeID: string, endNodeID: string): Node[] {
    return BFS.run(graph, startNodeID, endNodeID);
  }
}

export class AStarPathfindingStrategy implements PathfindingStrategy {
  findPath(graph: Graph, startNodeID: string, endNodeID: string): Node[] {
    return aStar.run(graph, startNodeID, endNodeID);
  }
}

// export class DijkstraPathfindingStrategy implements PathfindingStrategy {
//     findPath(graph: Graph, startNodeID: string, endNodeID: string): Node[] {
//         return Dijkstra.run(graph, startNodeID, endNodeID);
//     }
// }
