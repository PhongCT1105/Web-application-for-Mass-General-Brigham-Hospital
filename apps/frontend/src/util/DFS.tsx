import { Graph } from "./Graph";
import { Node } from "@/util/Node.tsx";

export class DFS {
  static run(graph: Graph, startNodeID: string, endNodeID: string) {
    console.log(graph);
    console.log(startNodeID);
    console.log(endNodeID);

    // setting up
    let visited: Node[] = [];
    const back: Node[] = [];
    let pathFound = false;
    const startNode = graph.nodes.get(startNodeID)!;
    const endNode = graph.nodes.get(endNodeID)!;

    // recursion method here!
    if (startNode && endNode) {
      //console.log(visited);
      visited = this.dfsRecursive(startNode, endNode, visited, back);
      pathFound = true;
    }

    if (!pathFound) {
      console.log("No path found");
      return visited; // Return an empty array to indicate that the path does not exist
    }

    return visited;
  }

  static dfsRecursive(
    startNode: Node,
    endNode: Node,
    visited: Node[],
    back: Node[],
  ): Node[] {
    if (visited.includes(endNode)) return visited;

    visited.push(startNode);
    if (startNode != endNode) {
      for (const neighNode of startNode.neighbors) {
        if (!visited.includes(neighNode)) {
          // back.push(startNode);
          this.dfsRecursive(neighNode, endNode, visited, back);
        }
      }
    }

    return visited;
  }
}
