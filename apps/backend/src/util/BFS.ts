import { Graph } from "./Graph.tsx";
import { Node } from "./Node.tsx";
import { Queue } from "queue-typescript";
import { PathfindingStrategy } from "./PathfindingStrategy.ts";

export class BFS implements PathfindingStrategy {
  findPath(graph: Graph, startNodeID: string, endNodeID: string): Node[] {
    return this.run(graph, startNodeID, endNodeID);
  }

  run(graph: Graph, startNodeID: string, endNodeID: string) {
    // setting up queue, visited, and parent
    const visited: Set<Node> = new Set();
    const queue = new Queue<Node>();
    const parentMap = new Map<Node, Node>();
    const startingNode = graph.nodes.get(startNodeID);
    const endingNode = graph.nodes.get(endNodeID);

    // add startNodeID to queue
    queue.enqueue(startingNode!);
    //visited.add(startNodeID);

    let pathFound = false; // flag to track if the end node is found

    //iterating through nodes until queue is empty
    while (queue.length > 0) {
      const current = queue.dequeue(); // inspecting current

      if (!visited.has(current)) {
        visited.add(current);
      } //add current node to visited

      // terminate loop
      if (current === endingNode) {
        pathFound = true;
        console.log("Found path!");
        break;
        // continue; // uncomment this line if you want to stop when end node is found
      }

      for (const edge of graph.edges) {
        if (edge.startNode === current && !visited.has(edge.endNode)) {
          console.log("Found as starting");
          parentMap.set(edge.endNode, current);
          queue.enqueue(edge.endNode);
          visited.add(edge.endNode);
        } else if (edge.endNode === current && !visited.has(edge.startNode)) {
          console.log("Found as ending");
          parentMap.set(edge.startNode, current);
          queue.enqueue(edge.startNode);
          visited.add(edge.startNode);
        }
      }
    }
    // Check if the endNodeID was reached during BFS traversal
    if (!pathFound) {
      console.log("No path found");
      return []; // Return an empty array to indicate that the path does not exist
    }

    return this.reconstructPath(parentMap, startNodeID, endNodeID, graph);
  }

  reconstructPath(
    parentMap: Map<Node, Node>,
    startNodeID: string,
    endNodeID: string,
    graph: Graph,
  ): Node[] {
    const path: Node[] = []; // returning an array of Nodes
    let currentNode: Node = graph.nodes.get(endNodeID)!;
    const startNode = graph.nodes.get(startNodeID);

    while (currentNode && currentNode !== startNode) {
      path.push(currentNode);
      currentNode = parentMap.get(currentNode)!;
    }

    if (!currentNode) {
      console.log("Invalid parent map or end node");
      return [];
    }

    // add start node to the path
    path.push(startNode!);

    return path.reverse();
  }
}
