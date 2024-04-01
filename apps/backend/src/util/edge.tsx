/**
 * This class uses two node IDs as start and end points to generate an Edge.
 */

export class Edge {
  startNodeID: string;
  endNodeID: string;

  constructor(startNodeID: string, endNodeID: string) {
    this.startNodeID = startNodeID;
    this.endNodeID = endNodeID;
  }
}
