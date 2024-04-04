/**
 * The Graph class uses the node and edge CSV files to generate a Graph object.
 */

import { Node } from "./node.tsx";
import { Edge } from "./edge.tsx";
//import * as fs from "fs";

export class Graph {
  nodes: Map<string, Node>;
  edges: Edge[];

  constructor() {
    this.nodes = new Map();
    this.edges = [];
  }

  addNode(node: Node) {
    this.nodes.set(node.nodeID, node);
  }

  addEdge(startNode: string, endNode: string) {
    this.addNeighbors(startNode, endNode);
  }

  // Setting neighbors bidirectionally to a node
  addNeighbors(source: string, target: string) {
    const sourceNode = this.nodes.get(source);
    const targetNode = this.nodes.get(target);

    // testing if node is valid before adding
    if (!sourceNode) {
      console.log(
        `Failed to add edge: Source node '${source}' does not exist.`,
      );
      return;
    }

    if (!targetNode) {
      console.log(
        `Failed to add edge: Target node '${target}' does not exist.`,
      );
      return;
    }

    // neighbor to both source and target to show no direction
    sourceNode.neighbors.add(targetNode);
    targetNode.neighbors.add(sourceNode);
  }

  // // Method to read nodes from CSV
  // readNodesFromCSV(filePath: string) {
  //   const data = fs.readFileSync(filePath, "utf-8");
  //   const lines = data.split("\n").slice(1); // Assuming first line is header
  //
  //   lines.forEach((line) => {
  //     // Skip empty or whitespace-only lines
  //     if (line.trim() === "") {
  //       return;
  //     }
  //     const [
  //       nodeID,
  //       xcoord,
  //       ycoord,
  //       floor,
  //       building,
  //       nodeType,
  //       longName,
  //       shortName /* other properties */,
  //     ] = line.split(",").map((value) => value.trim());
  //     const node: Node = {
  //       nodeID,
  //       xcoord: parseFloat(xcoord),
  //       ycoord: parseFloat(ycoord),
  //       floor,
  //       building,
  //       nodeType,
  //       longName: longName,
  //       shortName: shortName,
  //       neighbors: new Set(),
  //     };
  //     this.addNode(node);
  //   });
  // }
  //
  // // Method to read edges from CSV, creating Edge objects based on source and target Nodes.
  // readEdgesFromCSV(filePath: string) {
  //   const data = fs.readFileSync(filePath, "utf-8");
  //   const lines = data.split("\n").slice(1); // Assuming first line is header
  //
  //   lines.forEach((line) => {
  //     // Skip empty or whitespace-only lines
  //     if (line.trim() === "") {
  //       return;
  //     }
  //     const [source, target] = line.split(",").map((id) => id.trim());
  //     this.addNeighbors(source, target);
  //     const sourceNode = this.nodes.get(source);
  //     const targetNode = this.nodes.get(target);
  //     if (sourceNode == undefined || targetNode == undefined) {
  //       console.log("Error retrieving node");
  //     } else {
  //       const edge = new Edge(sourceNode, targetNode);
  //       this.addEdge(edge);
  //     }
  //   });
  // }
  //
  // // Method to print nodes and their neighbors
  // printNodesWithNeighbors(
  //   property: "nodeID" | "longName" | "shortName" = "nodeID",
  // ) {
  //   let index = 0;
  //   this.nodes.forEach((node) => {
  //     console.log("Neighbor: " + index++);
  //     if (node.neighbors.size > 0) {
  //       const nodeName = node[property];
  //       console.log(`${nodeName} Neighbors:`);
  //       node.neighbors.forEach((neighborId) => {
  //         const neighbor = this.nodes.get(neighborId);
  //         if (neighbor) {
  //           console.log(neighbor[property]);
  //         } else {
  //           console.log(`Neighbor with ID '${neighborId}' not found.`);
  //         }
  //       });
  //     }
  //     console.log(); // Add a blank line for separation
  //   });
  // }
  //
  // printNeighborsXandY() {
  //   this.nodes.forEach((node) => {
  //     const xCoord = node["xcoord"];
  //     const yCoord = node["ycoord"];
  //     console.log(`${xCoord} , ${yCoord} Neighbors:`);
  //     node.neighbors.forEach((neighborId) => {
  //       const neighbor = this.nodes.get(neighborId);
  //       if (neighbor) {
  //         const neighborX = neighbor["xcoord"];
  //         const neighborY = neighbor["ycoord"];
  //         console.log(`- (${neighborX} , ${neighborY})`);
  //       } else {
  //         console.log(`Neighbor with ID '${neighborId}' not found.`);
  //       }
  //     });
  //     console.log(); // Add a blank line for separation
  //   });
  // }
}
