import { Graph } from "./Graph.tsx";
import { Node } from "./Node.tsx";
import { BFS } from "./BFS.ts";
import { aStar } from "./aStar.ts";
import { Dijkstra } from "./Dijkstra.ts";
import { DFS } from "./DFS.ts";

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

// Implement A*PathfindingStrategy
export class AStarPathfindingStrategy implements PathfindingStrategy {
  findPath(graph: Graph, startNodeID: string, endNodeID: string): Node[] {
    return aStar.run(graph, startNodeID, endNodeID);
  }
}

// Implement DFSPathfindingStrategy
export class DFSPathfindingStrategy implements PathfindingStrategy {
  findPath(graph: Graph, startNodeID: string, endNodeID: string): Node[] {
    return DFS.run(graph, startNodeID, endNodeID);
  }
}

export class DijkstraPathfindingStrategy implements PathfindingStrategy {
  findPath(graph: Graph, startNodeID: string, endNodeID: string): Node[] {
    console.log("I made it here");
    return Dijkstra.run(graph, startNodeID, endNodeID);
  }
}
