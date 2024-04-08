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

      for (const neighNode of curr.neighbors!) {
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
//
// import { Graph } from "./Graph.tsx";
// import { Node } from "@/util/Node.tsx";
// //import { Node } from "./Node.tsx";
// //import { Queue } from "queue-typescript";
//
// export class aStar {
//     // run will perform all the logic of the A* implementation
//     static run(graph: Graph, startNodeID: string, endNodeID: string) {
//         console.log(graph);
//         console.log(startNodeID);
//         console.log(endNodeID);
//
//         // translating nodes
//         const startNode = graph.nodes.get(startNodeID)!;
//         const endNode = graph.nodes.get(endNodeID)!;
//
//         // setting up open, cameFrom, costs
//         const open: Node[] = [startNode];
//         const cameFrom = new Map<string, string>();
//         const gCost = new Map<Node, number>();
//         const fCost = new Map<Node, number>();
//
//         // initializing startNodeID, path is not found
//         graph.nodes.forEach((node) => {
//             gCost.set(node, Infinity);
//             fCost.set(node, Infinity);
//         });
//         let aStarFound = false;
//
//         gCost.set(startNode, 0); // dist from origin
//         fCost.set(startNode, this.calcDist(startNode, endNode)); // dist to goal
//
//         while (open.length != 0) {
//             const curr = open.reduce((minNode, node) =>
//                 fCost.get(node)! < fCost.get(minNode)! ? node : minNode,
//             ); // thanks chatgpt
//
//             if (curr === endNode) {
//                 aStarFound = true;
//             }
//
//             open.splice(open.indexOf(curr), 1);
//
//             for (const neighNode of curr.neighbors) {
//                 const newCost = gCost.get(curr)! + this.calcDist(curr, neighNode);
//
//                 if (newCost < gCost.get(neighNode)! ?? Infinity) {
//                     gCost.set(neighNode, newCost);
//                     fCost.set(neighNode, newCost + this.calcDist(neighNode, endNode));
//                     cameFrom.set(neighNode.nodeID, curr.nodeID);
//                 }
//             }
//         }
//
//         if (!aStarFound) {
//             console.log("No path found");
//             return []; // Return an empty array to indicate that the path does not exist
//         }
//
//         //return this.reconstructPath(); // fix later
//     }
//
//     static calcDist(currNode: Node, goalNode: Node): number {
//         return Math.hypot(
//             goalNode.xcoord - currNode.xcoord,
//             goalNode.ycoord - currNode.ycoord,
//         );
//     }
//
//     // reconstructPath will take in relevant parameters and return an array of Nodes
//     // static reconstructPath(
//     //     cameFrom: Map<string, string>,
//     //     startNodeID: string,
//     //     endNodeID: string,
//     //     graph: Graph,
//     // ): Node[] {
//     //     const path: Node[] = []; // returning an array of Nodes
//     //     return path;
//     // }
// }
