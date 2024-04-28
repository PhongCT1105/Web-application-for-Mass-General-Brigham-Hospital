/**
 * This interface shows the parameters contained in the Node class.
 */

export class Node {
  nodeID: string;
  xcoord: number;
  ycoord: number;
  floor: string;
  building: string;
  nodeType: string;
  longName: string;
  shortName: string;
  obstacle: boolean;
  neighbors: Set<Node>;

  constructor(
    nodeID: string,
    xcoord: number,
    ycoord: number,
    floor: string,
    building: string,
    nodeType: string,
    longName: string,
    shortName: string,
    obstacle: boolean,
    neighbors: Set<Node>,
  ) {
    this.nodeID = nodeID;
    this.xcoord = xcoord;
    this.ycoord = ycoord;
    this.floor = floor;
    this.building = building;
    this.nodeType = nodeType;
    this.longName = longName;
    this.shortName = shortName;
    this.neighbors = neighbors;
    this.obstacle = obstacle;
  }
}
