import { Graph } from "../util/Graph.ts";
import { Node } from "../util/Node.ts";

import PrismaClient from "../bin/database-connection.ts";
import express, { Router } from "express";

import {
  BFSPathfindingStrategy,
  AStarPathfindingStrategy,
  DFSPathfindingStrategy,
} from "../util/PathfindingStrategy.ts";

const router: Router = express.Router();

router.post("/", async (req, res) => {
  //const { strategy, start, end } = req.body;
  const data: { strategy: string; start: string; end: string } = req.body;
  let searchStrategy;

  console.log(data);

  // Choose the strategy based on the provided parameter
  switch (data.strategy) {
    case "BFS":
      searchStrategy = new BFSPathfindingStrategy();
      break;
    case "AStar":
      searchStrategy = new AStarPathfindingStrategy();
      break;
    case "DFS":
      searchStrategy = new DFSPathfindingStrategy();
      break;
    default:
      return res.status(400).json({ error: "Invalid search strategy" });
  }

  try {
    // create graph from nodes and edges
    // find start and end ID
    const startNode = await PrismaClient.nodes.findFirst({
      where: {
        nodeID: data.start,
      },
    });

    const endNode = await PrismaClient.nodes.findFirst({
      where: {
        nodeID: data.end,
      },
    });

    const startNodeID = startNode!.nodeID;
    const endNodeID = endNode!.nodeID;

    const edges = await PrismaClient.edges.findMany();
    const nodes = await PrismaClient.nodes.findMany();

    const graph: Graph = new Graph();
    for (let i = 0; i < nodes.length; i++) {
      graph.addNode(
        new Node(
          nodes[i].nodeID,
          nodes[i].xcoord,
          nodes[i].ycoord,
          nodes[i].floor,
          nodes[i].building,
          nodes[i].nodeType,
          nodes[i].longName,
          nodes[i].shortName,
          new Set<Node>(),
        ),
      );
    }

    for (let i = 0; i < edges.length; i++) {
      //newGraph.addNeighbors(edgeData[i].startNode, edgeData[i].endNode);
      graph.addEdge(edges[i].startNode, edges[i].endNode);
    }

    // Run the selected search algorithm
    const nodeArray: Node[] = searchStrategy.findPath(
      graph,
      startNodeID,
      endNodeID,
    );

    console.log("Backend response:" + nodeArray);
    res.status(200).json(nodeArray);
  } catch (error) {
    console.error("Error:", error);
    res.status(400).json({ error: "Pathfinding Error" });
  }
});

export default router;
