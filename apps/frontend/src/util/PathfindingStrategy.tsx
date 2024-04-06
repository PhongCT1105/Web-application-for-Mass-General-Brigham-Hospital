import { Graph } from "@/util/Graph.tsx";
import { Node } from "@/util/Node.tsx";
import { BFS } from "@/util/BFS.tsx";
import { aStar } from "@/util/aStar.tsx";

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
