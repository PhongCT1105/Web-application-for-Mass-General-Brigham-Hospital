import { Graph } from "./Graph.tsx";
import { Node } from "@/util/Node.tsx";
//import { Node } from "./Node.tsx";
import { Queue } from "queue-typescript";

export class aStar {
  // run will perform all the logic of the A* implementation
  static run(graph: Graph, startNodeID: string, endNodeID: string) {
    console.log(graph);
    console.log(startNodeID);
    console.log(endNodeID);

    // setting up next, cameFrom, cost
    const next = new Queue<{ nodeID: string; distance: number }>();
    const cameFrom = new Map<string, string>();
    const cost = new Map<string, number>();

    // initializing startNodeID, path is not found
    next.enqueue({ nodeID: startNodeID, distance: 0 });
    cost.set(startNodeID, 0);
    let aStarFound = false;

    const endNode = graph.nodes.get(endNodeID)!;

    while (next.length != 0) {
      const { nodeID, distance } = next.dequeue(); // inspecting
      const curr = graph.nodes.get(nodeID)!;

      if (curr.nodeID === endNodeID) {
        aStarFound = true;
      }

      for (const neighNode of curr.neighbors) {
        const x = neighNode.xcoord - curr.xcoord;
        const y = neighNode.ycoord - curr.ycoord;
        const heurX = endNode.xcoord - neighNode.xcoord;
        const heurY = endNode.ycoord - neighNode.ycoord;

        const newCost = cost.get(curr.nodeID)! + Math.hypot(x, y);
        const heur = Math.hypot(heurX, heurY);

        if (
          !cost.has(neighNode.nodeID)! ||
          newCost < cost.get(neighNode.nodeID)!
        ) {
          cost.set(neighNode.nodeID, newCost);
          const priority = newCost + heur + distance; // take dist out later, just for commit
          next.enqueue({ nodeID: neighNode.nodeID, distance: priority });
          cameFrom.set(neighNode.nodeID, curr.nodeID);
        }
      }
    }

    if (!aStarFound) {
      console.log("No path found");
      return []; // Return an empty array to indicate that the path does not exist
    }

    return this.reconstructPath();
  }

  // reconstructPath will take in relevant parameters and return an array of Nodes
  static reconstructPath(): Node[] {
    //const path: Node[] = []; // returning an array of Nodes
    return [];
  }
}
