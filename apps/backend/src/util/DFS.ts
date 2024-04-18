import { Graph } from "./Graph";
import { Node } from "./Node.ts";
import { PathfindingStrategy } from "./PathfindingStrategy.ts";

export class DFS implements PathfindingStrategy {
  findPath(graph: Graph, startNodeID: string, endNodeID: string): Node[] {
    return this.run(graph, startNodeID, endNodeID);
  }

  run(graph: Graph, startNodeID: string, endNodeID: string) {
    // setting up
    let visited: Node[] = [];
    let pathFound = false;
    const startNode = graph.nodes.get(startNodeID)!;
    const endNode = graph.nodes.get(endNodeID)!;

    // recursion method here!
    if (startNode && endNode) {
      visited = this.dfsRecursive(startNode, endNode, visited);
      if (visited.length > 0) pathFound = true;
    }

    if (!pathFound) {
      console.log("No path found");
      return []; // Return an empty array to indicate that the path does not exist
    }

    return visited;
  }

  dfsRecursive(currentNode: Node, endNode: Node, visited: Node[]): Node[] {
    visited.push(currentNode);

    if (currentNode === endNode) {
      return visited;
    }

    for (const neighbor of currentNode.neighbors) {
      if (!visited.includes(neighbor)) {
        const path = this.dfsRecursive(neighbor, endNode, visited.slice());
        if (path.length > 0 && path[path.length - 1] === endNode) {
          return path;
        }
      }
    }

    return [];
  }
}

// import { Graph } from "./Graph";
// import { Node } from "./Node.ts";
//
// export class DFS {
//   static run(graph: Graph, startNodeID: string, endNodeID: string) {
//
//     // setting up
//     let visited: Node[] = [];
//     const back: Node[] = [];
//     let pathFound = false;
//     const startNode = graph.nodes.get(startNodeID)!;
//     const endNode = graph.nodes.get(endNodeID)!;
//
//     // recursion method here!
//     if (startNode && endNode) {
//       //console.log(visited);
//       visited = this.dfsRecursive(startNode, endNode, visited, back);
//       pathFound = true;
//     }
//
//     if (!pathFound) {
//       console.log("No path found");
//       return visited; // Return an empty array to indicate that the path does not exist
//     }
//
//     return visited;
//   }
//
//   static dfsRecursive(
//     startNode: Node,
//     endNode: Node,
//     visited: Node[],
//     back: Node[],
//   ): Node[] {
//     if (visited.includes(endNode)) return visited;
//
//     visited.push(startNode);
//     if (startNode != endNode) {
//       for (const neighNode of startNode.neighbors) {
//         if (!visited.includes(neighNode)) {
//           // back.push(startNode);
//           this.dfsRecursive(neighNode, endNode, visited, back);
//         }
//       }
//     }
//
//     return visited;
//   }
// }
