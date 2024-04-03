/**
 * Class that will handle logic for printing out paths discovered by path finding
 * algorithms. This class may be removed if not needed in future iterations.
 */
import { Node } from "./node.tsx";

export class pathGenerator {
  nodePath: Node[];

  constructor(path: Node[]) {
    this.nodePath = path;
  }

  // returns an array of coordinates
  getPathCoordinates() {
    const coordinates: { x: number; y: number }[] = [];

    // Iterate over the array of Node objects
    for (const node of this.nodePath) {
      // Extract the x and y coordinates from the current node
      const { xcoord, ycoord } = node; // Assuming the properties are named xcoord and ycoord

      // Add the coordinates to the coordinates array
      coordinates.push({ x: xcoord, y: ycoord });
    }

    // Return the array of coordinates
    return coordinates;
  }

  getShortPathName() {
    const shortNames: string[] = [];

    // Iterate over the array of Node objects
    for (const node of this.nodePath) {
      // Extract the short name from the current node
      const { shortName } = node;

      // Add the coordinates to the coordinates array
      shortNames.push(shortName);
    }

    // Return the array of names
    return shortNames;
  }

  getLongPathName() {
    const shortNames: string[] = [];

    // Iterate over the array of Node objects
    for (const node of this.nodePath) {
      // Extract the short name from the current node
      const { shortName } = node;

      // Add the coordinates to the coordinates array
      shortNames.push(shortName);
    }

    // Return the array of names
    return shortNames;
  }
}
