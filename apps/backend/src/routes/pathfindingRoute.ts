import { Graph } from "../util/Graph.ts";
import { Node } from "../util/Node.ts";

import PrismaClient from "../bin/database-connection.ts";
import express, { Router } from "express";

import { aStar } from "../util/aStar.ts";
import { BFS } from "../util/BFS.ts";
import { DFS } from "../util/DFS.ts";
import { Dijkstra } from "../util/Dijkstra.ts";
import { PathingContext } from "../util/PathfindingTemplate.ts";

const router: Router = express.Router();

router.post("/", async (req, res) => {
  //const { strategy, start, end } = req.body;
  const data: {
    strategy: string;
    start: string;
    end: string;
    accessibility: boolean;
    obstacles: boolean;
  } = req.body;
  let searchStrategy;
  const pathFindingContext: PathingContext = new PathingContext(new aStar());
  console.log(data);

  // Choose the strategy based on the provided parameter
  switch (data.strategy) {
    case "BFS":
      searchStrategy = new BFS();
      break;
    case "AStar":
      pathFindingContext.pathFindingStrategy = new aStar();
      searchStrategy = pathFindingContext.pathFindingStrategy;
      break;
    case "DFS":
      searchStrategy = new DFS();
      break;
    case "Dijkstra":
      pathFindingContext.pathFindingStrategy = new Dijkstra();
      searchStrategy = pathFindingContext.pathFindingStrategy;
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
    const stairs: string[] = [];
    const blocked: string[] = [];

    const graph: Graph = new Graph();
    for (let i = 0; i < nodes.length; i++) {
      const node = new Node(
        nodes[i].nodeID,
        nodes[i].xcoord,
        nodes[i].ycoord,
        nodes[i].floor,
        nodes[i].building,
        nodes[i].nodeType,
        nodes[i].longName,
        nodes[i].shortName,
        new Set<Node>(),
      );

      graph.addNode(node);

      if (nodes[i].obstacle) {
        blocked.push(node.nodeID);
        console.log(nodes[i].obstacle);
      }
      if (node.nodeType == "STAI") stairs.push(node.nodeID);
    }

    for (let i = 0; i < edges.length; i++) {
      if (data.accessibility && data.obstacles) {
        if (
          !stairs.includes(edges[i].startNode) ||
          !stairs.includes(edges[i].endNode) ||
          !blocked.includes(edges[i].startNode) ||
          !blocked.includes(edges[i].endNode)
        ) {
          graph.addEdge(edges[i].startNode, edges[i].endNode);
        }
      } else if (data.accessibility) {
        if (
          !stairs.includes(edges[i].startNode) ||
          !stairs.includes(edges[i].endNode)
        ) {
          graph.addEdge(edges[i].startNode, edges[i].endNode);
        }
      } else if (data.obstacles) {
        if (
          !blocked.includes(edges[i].startNode) ||
          !blocked.includes(edges[i].endNode)
        ) {
          graph.addEdge(edges[i].startNode, edges[i].endNode);
        }
      } else {
        //newGraph.addNeighbors(edgeData[i].startNode, edgeData[i].endNode);
        graph.addEdge(edges[i].startNode, edges[i].endNode);
      }
    }

    console.log(blocked);

    // Run the selected search algorithm
    const nodeArray: Node[] = searchStrategy.findPath(
      graph,
      startNodeID,
      endNodeID,
    );

    //console.log("Backend response:" + nodeArray);
    res.status(200).json(nodeArray);
  } catch (error) {
    console.error("Error:", error);
    res.status(400).json({ error: "Pathfinding Error" });
  }
});

export default router;
