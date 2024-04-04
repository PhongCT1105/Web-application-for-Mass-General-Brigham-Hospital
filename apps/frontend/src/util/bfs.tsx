import { Graph } from "./graph.tsx";
import { Node } from "./node.tsx";
import { Queue } from "queue-typescript";

export class BFS {
  static run(graph: Graph, startNodeID: string, endNodeID: string) {
    // setting up queue, visited, distance, and parent
    const visited: Array<string> = [];
    const queue = new Queue<string>();
    const distance = new Map<string, number>();
    const par = new Map<string, string>();
    let dist = 0; // starting distance is 0
    const nodeArray: Node[] = []; // returning an array of Nodes

    //finding startNode exists, error if not
    if (graph.nodes.get(startNodeID) == null) {
      console.log("error! no starting node :(");
      return nodeArray;
    }

    //finding node with id
    distance.set(startNodeID, dist);
    par.set(startNodeID, "No Parent");

    //populating queue with starting Node
    queue.enqueue(startNodeID);

    //iterating through nodes until queue is empty
    while (queue.length != 0) {
      const currNodeID = queue.dequeue(); // inspecting
      const currNode = graph.nodes.get(currNodeID)!;
      dist++;

      for (const neighbor of currNode.neighbors) {
        if (!visited.includes(neighbor.nodeID)) {
          par.set(neighbor.nodeID, currNodeID); // setting the neighbor as a parent
          distance.set(neighbor.nodeID, dist);
          queue.enqueue(neighbor.nodeID); //adding curr's neighbors to queue
        }
      }
      visited.push(currNodeID); //add curr to visited
    }

    let currNodeID = endNodeID;
    let nextNodeID = "";

    // while we can keep traversing parents
    while (par.get(currNodeID)! != null) {
      if (graph.nodes.get(currNodeID) != undefined) {
        const node: Node = graph.nodes.get(currNodeID)!;
        nodeArray.push(node); // add node to array if not undefined
      }
      // shift next and current
      nextNodeID = par.get(currNodeID)!;
      currNodeID = nextNodeID;
    }
    console.log(nodeArray.reverse());
    return nodeArray.reverse();
  }
}
