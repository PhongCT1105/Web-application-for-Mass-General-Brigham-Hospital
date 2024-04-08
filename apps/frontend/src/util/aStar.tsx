import { Graph } from "./Graph.tsx";
import { Node } from "@/util/Node.tsx";
//import { Node } from "./Node.tsx";
//import { Queue } from "queue-typescript";

export class aStar {
  // run will perform all the logic of the A* implementation
  static run(graph: Graph, startNodeID: string, endNodeID: string) {
    console.log(graph);
    console.log(startNodeID);
    console.log(endNodeID);

    // translating nodes
    const startNode = graph.nodes.get(startNodeID)!;
    const endNode = graph.nodes.get(endNodeID)!;

    // setting up open, cameFrom, costs
    const open: Node[] = [];
    const cameFrom = new Map<string, string>();
    const gCost = new Map<Node, number>();
    const fCost = new Map<Node, number>();
    open.push(startNode);

    // initializing startNodeID, path is not found
    graph.nodes.forEach((node) => {
      gCost.set(node, Infinity);
      fCost.set(node, Infinity);
    });
    let aStarFound = false;

    gCost.set(startNode, 0); // dist from origin
    fCost.set(startNode, this.calcDist(startNode, endNode)); // dist to goal

    while (open.length != 0) {
      const curr = open.reduce((minNode, node) =>
        fCost.get(node)! < fCost.get(minNode)! ? node : minNode,
      );

      console.log(curr);

      if (curr === endNode) {
        aStarFound = true;
      }

      console.log(open);
      open.splice(open.indexOf(curr), 1);
      console.log(open);

      for (const neighNode of curr.neighbors) {
        const newCost = gCost.get(curr)! + this.calcDist(curr, neighNode);
        console.log(newCost);

        if (newCost < gCost.get(neighNode)! ?? Infinity) {
          gCost.set(neighNode, newCost);
          fCost.set(neighNode, newCost + this.calcDist(neighNode, endNode));
          cameFrom.set(neighNode.nodeID, curr.nodeID);
          console.log("added node");
        }
      }
    }

    if (!aStarFound) {
      console.log("No path found");
      return []; // Return an empty array to indicate that the path does not exist
    }

    return this.reconstructPath(cameFrom, endNodeID, graph);
  }

  static calcDist(currNode: Node, goalNode: Node): number {
    return Math.hypot(
      goalNode.xcoord - currNode.xcoord,
      goalNode.ycoord - currNode.ycoord,
    );
  }

  // reconstructPath will take in relevant parameters and return an array of Nodes
  static reconstructPath(
    cameFrom: Map<string, string>,
    endNodeID: string,
    graph: Graph,
  ): Node[] {
    const path: Node[] = []; // returning an array of Nodes
    let node: Node | null = graph.nodes.get(endNodeID)!;

    while (node != null) {
      path.unshift(node);
      node = graph.nodes.get(cameFrom.get(node.nodeID)!)!;
    }
    return path;
  }
}
