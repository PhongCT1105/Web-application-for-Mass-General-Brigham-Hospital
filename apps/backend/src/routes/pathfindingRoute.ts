import { Graph } from "../util/Graph.ts";
import { Node } from "../util/Node.ts";

import PrismaClient from "../bin/database-connection.ts";
import express, { Router, Request, Response } from "express";

import { aStar } from "../util/aStar.ts";
import { BFS } from "../util/BFS.ts";
import { DFS } from "../util/DFS.ts";
import { Dijkstra } from "../util/Dijkstra.ts";
import { PathingContext } from "../util/PathfindingTemplate.ts";

const router: Router = express.Router();

interface edgeCount {
  edgeID: string;
  count: number;
}

// let nodeArray : Node[] = [];

router.post("/", async (req: Request, res: Response) => {
  try {
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
        nodes[i].obstacle,
        new Set<Node>(),
      );

      graph.addNode(node);

      if (node.obstacle) {
        blocked.push(node.nodeID.toString());
        console.log(node);
      }
      if (node.nodeType == "STAI") stairs.push(node.nodeID);
    }

    console.log(blocked);

    for (let i = 0; i < edges.length; i++) {
      if (data.accessibility && data.obstacles) {
        if (
          !stairs.includes(edges[i].startNode.toString()) ||
          !stairs.includes(edges[i].endNode.toString()) ||
          !blocked.includes(edges[i].startNode.toString()) ||
          !blocked.includes(edges[i].endNode.toString())
        ) {
          graph.addEdge(edges[i].startNode, edges[i].endNode);
        }
      } else if (data.accessibility) {
        if (
          !stairs.includes(edges[i].startNode.toString()) ||
          !stairs.includes(edges[i].endNode.toString())
        ) {
          graph.addEdge(edges[i].startNode, edges[i].endNode);
        }
      } else if (data.obstacles) {
        if (
          blocked.includes(edges[i].startNode.toString()) ||
          blocked.includes(edges[i].endNode.toString())
        ) {
          console.log(edges[i].edgeID);
        } else {
          graph.addEdge(edges[i].startNode, edges[i].endNode);
        }
      } else {
        graph.addEdge(edges[i].startNode, edges[i].endNode);
      }
    }

    // Run the selected search algorithm
    const nodeArray = searchStrategy.findPath(graph, startNodeID, endNodeID);
    console.log(nodeArray);

    //for heatmap
    for (let i = 0; i < nodeArray.length - 1; i++) {
      const startNode = nodeArray[i].nodeID;
      const endNode = nodeArray[i + 1].nodeID;

      // Find the edgeID matching the start node
      let edgeID = await PrismaClient.edges.findFirst({
        where: {
          startNode: startNode,
          endNode: endNode,
        },
        select: {
          edgeID: true,
        },
      });

      if (!edgeID) {
        edgeID = await PrismaClient.edges.findFirst({
          where: {
            startNode: endNode,
            endNode: startNode,
          },
          select: {
            edgeID: true,
          },
        });
      }

      console.log("edgeId ne: " + edgeID);

      if (edgeID) {
        const count = await PrismaClient.edgeListMap.count();
        if (count == 400) {
          const firstEntry = await PrismaClient.edgeListMap.findFirst();

          if (!firstEntry) {
            console.log("No entries found in EdgeListMap");
            return;
          }

          // Delete the first entry
          await PrismaClient.edgeListMap.delete({
            where: {
              id: firstEntry.id,
            },
          });

          await PrismaClient.edgeListMap.create({
            data: edgeID,
          });
        } else {
          await PrismaClient.edgeListMap.create({
            data: edgeID,
          });
        }
      }
    }

    //console.log("Backend response:" + nodeArray);
    res.status(200).json(nodeArray);
  } catch (error) {
    console.error("Error:", error);
    res.status(400).json({ error: "Pathfinding Error" });
  }
});

router.get("/heatmap", async (req: Request, res: Response) => {
  try {
    const EdgeListMap: edgeCount[] = []; // Initialize EdgeListMap
    const edgelist = await PrismaClient.edgeListMap.findMany();
    console.log(edgelist);

    edgelist.forEach((edgeIDObj) => {
      const index = EdgeListMap.findIndex(
        (item) => item.edgeID === edgeIDObj.edgeID,
      );

      if (index === -1) {
        // If the edgeID is not found in edgeCount, add it with count 1
        EdgeListMap.push({ edgeID: edgeIDObj.edgeID, count: 1 });
      } else {
        // If the edgeID is already in edgeCount, increase its count by 1
        EdgeListMap[index].count++;
      }
    });

    res.status(200).json(EdgeListMap);
  } catch (error) {
    console.error("Error:", error);
    res.status(400).json({ error: "Pathfinding Error" });
  }
});

export default router;
