/**
 * This interface shows the parameters contained in the Node class.
 */

export interface Node {
  nodeID: string;
  xcoord: number;
  ycoord: number;
  floor: string;
  building: string;
  nodeType: string;
  longName: string;
  shortName: string;
  neighbors: Set<string>;
}
