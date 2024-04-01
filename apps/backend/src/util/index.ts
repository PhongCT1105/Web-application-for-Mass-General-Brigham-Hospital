import { Graph } from "./graph.tsx";
import { BFS } from "./bfs.tsx";
import { Node } from "./node.tsx";
import { pathGenerator } from "./pathGenerator.tsx";

// building graph
const graph = new Graph();
graph.readNodesFromCSV("./resources/L1Nodes.csv");
graph.readEdgesFromCSV("./resources/L1Edges.csv");

// print out all nodes with properties
// console.log(graph.nodes);

// print out all edges in graph
// console.log(graph.edges);

// print out all nodes and their neighbors
// choose: nodeID, shortName, longName
// graph.printNodesWithNeighbors("nodeID");

// print out all nodes and their neighbors using x and y Coordinates.
// graph.printNeighborsXandY();

// print out shortest path with bfs
// WELEV00ML1 -> CHALL005L1 -> CLABS002L1 -> CREST001L1 -> CHALL001L1 -> WELEV00LL1
const startNodeID = "WELEV00ML1"; // Set the start node for BFS
const endNodeID = "WELEV00LL1"; // Set the end node for BFS

BFS.run(graph, startNodeID, endNodeID);
console.log(); // break for tidiness

const nodes: Node[] = [
  {
    nodeID: "Node1",
    xcoord: 10,
    ycoord: 20,
    floor: "",
    building: "",
    nodeType: "",
    longName: "",
    shortName: "",
    neighbors: new Set<string>(),
  },
  {
    nodeID: "Node2",
    xcoord: 30,
    ycoord: 40,
    floor: "",
    building: "",
    nodeType: "",
    longName: "",
    shortName: "",
    neighbors: new Set<string>(),
  },
  {
    nodeID: "Node3",
    xcoord: 50,
    ycoord: 60,
    floor: "",
    building: "",
    nodeType: "",
    longName: "",
    shortName: "",
    neighbors: new Set<string>(),
  },
  {
    nodeID: "Node4",
    xcoord: 70,
    ycoord: 80,
    floor: "",
    building: "",
    nodeType: "",
    longName: "",
    shortName: "",
    neighbors: new Set<string>(),
  },
  {
    nodeID: "Node5",
    xcoord: 90,
    ycoord: 100,
    floor: "",
    building: "",
    nodeType: "",
    longName: "",
    shortName: "",
    neighbors: new Set<string>(),
  },
];
console.log(new pathGenerator(nodes).getPathCoordinates());
