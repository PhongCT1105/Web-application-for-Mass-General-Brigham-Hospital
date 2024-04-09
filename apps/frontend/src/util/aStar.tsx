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
    return this.reconstructPath();
  }

  // reconstructPath will take in relevant parameters and return an array of Nodes
  static reconstructPath(): Node[] {
    const path: Node[] = []; // returning an array of Nodes
    return path;
  }
}
