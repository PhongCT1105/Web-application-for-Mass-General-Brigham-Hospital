/**
 * This class uses two node IDs as start and end points to generate an Edge.
 */

export class Edge {
  startNode: string;
  endNode: string;

  constructor(startNode: string, endNode: string) {
    this.startNode = startNode;
    this.endNode = endNode;
  }
}
