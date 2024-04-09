/**
 * This class uses two node IDs as start and end points to generate an Edge.
 */

import { Node } from "./Node.tsx";

export class Edge {
  startNode: Node;
  endNode: Node;
  startNodeID: string;
  endNodeID: string;

  constructor(startNode: Node, endNode: Node) {
    this.startNode = startNode;
    this.endNode = endNode;
    this.startNodeID = startNode.nodeID;
    this.endNodeID = endNode.nodeID;
  }
}
