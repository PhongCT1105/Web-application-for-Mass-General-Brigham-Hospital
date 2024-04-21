import { Graph } from "./Graph.ts";
import { Node } from "./Node.ts";
import { PathfindingTemplate } from "./PathfindingTemplate.ts";

export class aStar extends PathfindingTemplate {
  // run will perform all the logic of the A* implementation
  run(graph: Graph, startNodeID: string, endNodeID: string) {
    // translating nodes
    const startNode = graph.nodes.get(startNodeID)!;
    const endNode = graph.nodes.get(endNodeID)!;

    // setting up open, cameFrom, costs
    const cameFrom = new Map<string, string>();
    const gCost = new Map<Node, number>();
    const fCost = new Map<Node, number>();
    const open: Node[] = [];
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

      if (curr === endNode) {
        aStarFound = true;
      }

      open.splice(open.indexOf(curr), 1);

      for (const neighNode of curr.neighbors) {
        const newCost = gCost.get(curr)! + this.calcDist(curr, neighNode);

        if (newCost < gCost.get(neighNode)! ?? Infinity) {
          gCost.set(neighNode, newCost);
          fCost.set(neighNode, newCost + this.calcDist(neighNode, endNode));
          cameFrom.set(neighNode.nodeID, curr.nodeID);
          open.push(neighNode);
        }
      }
    }

    if (!aStarFound) {
      console.log("No path found");
      return []; // Return an empty array to indicate that the path does not exist
    }

    return this.reconstructPath(cameFrom, endNodeID, graph);
  }
}
