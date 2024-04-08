import { Graph } from "./Graph.tsx";
import { Node } from "./Node.tsx";

export class Dijkstra {
  static run(graph: Graph, startNodeID: string, endNodeID: string): Node[] {
    console.log(graph);
    console.log(startNodeID);
    console.log(endNodeID);
    // const distanceMap = new Map<string, number>();
    // const parentMap = new Map<string, string>();
    //
    // distanceMap.set(startNodeID, 0);
    //
    // while (distanceMap.size > 0) {
    //   let closestNode: string | null = null;
    //   let shortestDistance = Infinity;
    //
    //   // Find the closest unvisited node
    //   for (const [nodeID, distance] of distanceMap) {
    //     if (distance < shortestDistance) {
    //       closestNode = nodeID;
    //       shortestDistance = distance;
    //     }
    //   }
    //
    //   // If all nodes have been visited or there's no path to the end node, break
    //   if (!closestNode || closestNode === endNodeID) break;
    //
    //   // Update distances to neighbors of the closest node
    //   const closestNodeObj = graph.nodes.get(closestNode);
    //   if (closestNodeObj) {
    //     for (const neighbor of closestNodeObj.neighbors) {
    //       const distanceToNeighbor =
    //         shortestDistance +
    //         this.getDistance(closestNode, neighbor.nodeID, graph);
    //       if (
    //         !distanceMap.has(neighbor.nodeID) ||
    //         distanceToNeighbor < distanceMap.get(neighbor.nodeID)!
    //       ) {
    //         distanceMap.set(neighbor.nodeID, distanceToNeighbor);
    //         parentMap.set(neighbor.nodeID, closestNode);
    //       }
    //     }
    //   }
    //
    //   // Mark closest node as visited
    //   distanceMap.delete(closestNode);
    // }
    // console.log(distanceMap);
    // return this.reconstructPath(parentMap, startNodeID, endNodeID, graph);
    return [];
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

    // Traverse back from the end node to the start node using parentMap
    while (currentNodeID !== startNodeID) {
      const node = graph.nodes.get(currentNodeID);
      if (node) {
        path.push(node);
      } else {
        console.error("Error: Node not found for ID:", currentNodeID);
        return []; // Return an empty array to indicate that the path does not exist
      }
      // Get the next node in the path from parentMap
      currentNodeID = parentMap.get(currentNodeID)!;

      // Add a safeguard to prevent infinite loop
      if (!currentNodeID) {
        console.error("Error: Unexpected end of path");
        return []; // Return an empty array to indicate an unexpected end of path
      }
    }

    // Add the start node to the path
    const startNode = graph.nodes.get(startNodeID);
    if (startNode) {
      path.push(startNode);
    } else {
      console.error("Error: Start node not found for ID:", startNodeID);
      return []; // Return an empty array to indicate that the start node is not found
    }

    return path.reverse(); // Reverse the path to get it from start to end
  }
}
