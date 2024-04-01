import { Graph } from "./graph.tsx";
import { Queue } from "queue-typescript";

export class BFS {
  static run(graph: Graph, startNodeID: string, endNodeID: string) {
    //setting up visited, queue, priority, costs
    const visited: Array<string> = [];
    const queue = new Queue<string>();
    const distance = new Map<string, number>();
    const par = new Map<string, string>();
    let distNum = 0;

    //finding startNode exists, error if not
    if (graph.nodes.get(startNodeID) == null) {
      console.log("error! no starting node :(");
      return;
    }

    //finding node with id
    distance.set(startNodeID, distNum);
    par.set(startNodeID, "nada");

    //populating queue
    queue.enqueue(startNodeID);

    //iterating through nodes
    while (queue.length != 0) {
      const currNodeID = queue.dequeue(); //next node in queue
      const currNode = graph.nodes.get(currNodeID)!;
      const prevNodeID = par.get(currNodeID)!;
      distNum++;

      if (currNodeID != endNodeID) {
        for (const neighbor of currNode.neighbors) {
          if (!visited.includes(neighbor)) {
            par.set(neighbor, currNodeID);
            distance.set(neighbor, distNum);
            queue.enqueue(neighbor); //adding curr's neighbors to queue
          }
        }
        visited.push(currNodeID); //add curr to visited
      } else if (currNodeID == endNodeID) {
        visited.push(currNodeID);
        par.set(endNodeID, prevNodeID);
        distance.set(currNodeID, distNum);
        const short = BFS.shortPath(par, distance, startNodeID, endNodeID);
        console.log(`Here is the shortest path: \n'${short}'`);
        return;
      }
    }
  }

  static shortPath(
    par: Map<string, string>,
    dist: Map<string, number>,
    startNodeID: string,
    endNodeID: string,
  ): Array<string> {
    const path: Array<string> = [];

    let currNodeID = endNodeID;
    let nextNodeID = "";

    if (dist.get(currNodeID) == Infinity) {
      console.log(`Whoops! Error!`);
      return path;
    }

    while (par.get(currNodeID)! != null) {
      path.push(currNodeID);
      nextNodeID = par.get(currNodeID)!;
      currNodeID = nextNodeID;
    }

    return path;
  }
}
