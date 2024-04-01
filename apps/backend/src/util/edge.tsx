/**
 * This class uses two node IDs as start and end points to generate an Edge.
 */

import { Node } from "./node.tsx";

export class Edge {
  startNode: Node;
  endNode: Node;

  constructor(startNode: Node, endNode: Node) {
    this.startNode = startNode;
    this.endNode = endNode;
  }
}
