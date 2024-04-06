/**
 * The Graph class uses the node and edge CSV files to generate a Graph object.
 */

import { Node } from "./Node.tsx";
import { Edge } from "./Edge.tsx";
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

  getNodeID(longName: string): string | undefined {
    for (const [nodeID, node] of this.nodes) {
      if (node.longName === longName) {
        return nodeID;
      }
    }
    return undefined;
  }

  addEdge(startNode: string, endNode: string) {
    this.edges.push(new Edge(startNode, endNode));
    this.addNeighbors(startNode, endNode);
  }

  // Setting neighbors bidirectionally to a node
  addNeighbors(source: string, target: string) {
    const sourceNode = this.nodes.get(source.trim());
    const targetNode = this.nodes.get(target.trim());

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
}
