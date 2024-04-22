import { Graph } from "./Graph.ts";
import { Node } from "./Node.ts";
import { PathfindingStrategy } from "./PathfindingStrategy.ts";

export abstract class PathfindingTemplate implements PathfindingStrategy {
  findPath(graph: Graph, startNodeID: string, endNodeID: string): Node[] {
    return this.run(graph, startNodeID, endNodeID);
  }

  // run will perform all the logic of the Dijkstra implementation
  abstract run(graph: Graph, startNodeID: string, endNodeID: string): Node[];

  calcDist(currNode: Node, goalNode: Node): number {
    return Math.hypot(
      goalNode.xcoord - currNode.xcoord,
      goalNode.ycoord - currNode.ycoord,
    );
  }

  // reconstructPath will take in relevant parameters and return an array of Nodes
  reconstructPath(
    cameFrom: Map<string, string>,
    endNodeID: string,
    graph: Graph,
  ): Node[] {
    const path: Node[] = []; // returning an array of Nodes
    let node: Node | null = graph.nodes.get(endNodeID)!;

    while (node != null) {
      path.unshift(node);
      node = graph.nodes.get(cameFrom.get(node.nodeID)!)!;
    }
    return path;
  }
}

export class PathingContext {
  private _pathFindingTemplate: PathfindingTemplate;

  constructor(_pathFindingTemplate: PathfindingTemplate) {
    this._pathFindingTemplate = _pathFindingTemplate;
  }
  get pathFindingStrategy(): PathfindingTemplate {
    return this._pathFindingTemplate;
  }

  set pathFindingStrategy(value: PathfindingTemplate) {
    this._pathFindingTemplate = value;
  }

  run(graph: Graph, startNodeID: string, endNodeID: string): Node[] {
    return this._pathFindingTemplate.run(graph, startNodeID, endNodeID);
  }
}
