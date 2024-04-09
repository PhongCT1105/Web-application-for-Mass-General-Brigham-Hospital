import { Graph } from "./Graph.tsx";
import { Node } from "./Node.tsx";

export class Dijkstra {
  static run(graph: Graph, startNodeID: string, endNodeID: string): Node[] {
    console.log(graph);
    console.log(startNodeID);
    console.log(endNodeID);
    const distanceMap = new Map<string, number>();
    const parentMap = new Map<string, string>();

    distanceMap.set(startNodeID, 0);

    while (distanceMap.size > 0) {
      let closestNode: string | null = null;
      let shortestDistance = Infinity;

      // Find the closest unvisited node
      for (const [nodeID, distance] of distanceMap) {
        if (!closestNode || distance < shortestDistance) {
          if (!distanceMap.has(nodeID)) continue;
          closestNode = nodeID;
          shortestDistance = distance;
        }
      }

      // If all nodes have been visited or there's no path to the end node, break
      if (!closestNode || closestNode === endNodeID) break;

      // Update distances to neighbors of the closest node
      const closestNodeObj = graph.nodes.get(closestNode);
      if (closestNodeObj) {
        for (const neighbor of closestNodeObj.neighbors) {
          const distanceToNeighbor = shortestDistance + 1; // Assuming unweighted graph
          if (
            !distanceMap.has(neighbor.nodeID) ||
            distanceToNeighbor < distanceMap.get(neighbor.nodeID)!
          ) {
            distanceMap.set(neighbor.nodeID, distanceToNeighbor);
            parentMap.set(neighbor.nodeID, closestNode);
          }
        }
      }

      // Mark closest node as visited
      distanceMap.delete(closestNode);
    }

    return this.reconstructPath(parentMap, startNodeID, endNodeID, graph);
  }

  static getDistance(
    startNodeID: string,
    endNodeID: string,
    graph: Graph,
  ): number {
    const nodeA: Node = graph.nodes.get(startNodeID)!;
    const nodeB: Node = graph.nodes.get(endNodeID)!;
    // Euclidean distance between two nodes based on their (x, y) coordinates
    const dx = nodeA.xcoord - nodeB.xcoord;
    const dy = nodeA.ycoord - nodeB.ycoord;
    return Math.sqrt(dx * dx + dy * dy);
  }

  static reconstructPath(
    parentMap: Map<string, string>,
    startNodeID: string,
    endNodeID: string,
    graph: Graph,
  ): Node[] {
    const path: Node[] = [];
    let currentNodeID = endNodeID;

    while (currentNodeID !== startNodeID) {
      const node = graph.nodes.get(currentNodeID);
      if (node) {
        path.push(node);
      }
      currentNodeID = parentMap.get(currentNodeID)!;
    }

    const startNode = graph.nodes.get(startNodeID);
    if (startNode) {
      path.push(startNode);
    }

    return path.reverse();
  }
}
