import { Graph } from "./Graph.tsx";
import { Node } from "./Node.tsx";
import { Queue } from "queue-typescript";

export class BFS {
  static run(graph: Graph, startNodeID: string, endNodeID: string) {
    console.log(graph);
    console.log(startNodeID);
    console.log(endNodeID);
    // setting up queue, visited, distance, and parent
    const visited: Set<string> = new Set();
    const queue = new Queue<{ nodeID: string; distance: number }>();
    const distanceMap = new Map<string, number>();
    const parentMap = new Map<string, string>();
    //let dist = 0; // starting distance is 0

    // add startNode and set initial distance
    queue.enqueue({ nodeID: startNodeID, distance: 0 });
    distanceMap.set(startNodeID, 0);

    let pathFound = false; // flag to track if the end node is found

    //iterating through nodes until queue is empty
    while (queue.length > 0) {
      const { nodeID, distance } = queue.dequeue(); // inspecting
      const currNode = graph.nodes.get(nodeID)!;

      // if (nodeID == endNodeID) {
      //     return this.reconstructPath(parentMap,distanceMap, startNodeID, endNodeID, graph);
      // }

      visited.add(nodeID); //add current node to visited

      if (nodeID === endNodeID) {
        pathFound = true;
        // continue; // uncomment this line if you want to stop when end node is found
      }

      for (const neighbor of currNode.neighbors) {
        if (!visited.has(neighbor.nodeID)) {
          parentMap.set(neighbor.nodeID, nodeID); // setting the neighbor as a parent
          const newDistance = distanceMap.get(nodeID)! + 1;
          if (
            !distanceMap.has(neighbor.nodeID) ||
            newDistance < distanceMap.get(neighbor.nodeID)!
          ) {
            distanceMap.set(neighbor.nodeID, distance + 1);
            queue.enqueue({ nodeID: neighbor.nodeID, distance: distance + 1 }); //adding curr's neighbors to queue
          }
        }
      }
    }
    // Check if the endNodeID was reached during BFS traversal
    if (!pathFound) {
      console.log("No path found");
      return []; // Return an empty array to indicate that the path does not exist
    }

    //console.log("No path found");
    return this.reconstructPath(
      parentMap,
      distanceMap,
      startNodeID,
      endNodeID,
      graph,
    );
  }

  static reconstructPath(
    parentMap: Map<string, string>,
    distanceMap: Map<string, number>,
    startNodeID: string,
    endNodeID: string,
    graph: Graph,
  ): Node[] {
    const path: Node[] = []; // returning an array of Nodes
    let currentNodeID = endNodeID;

    while (currentNodeID != startNodeID) {
      const node = graph.nodes.get(currentNodeID);
      if (node) {
        path.push(node);
      }
      currentNodeID = parentMap.get(currentNodeID)!;
    }

    // add start node to the path
    const startNode = graph.nodes.get(startNodeID);
    if (startNode) {
      path.push(startNode);
    }

    return path.reverse();
  }
}
