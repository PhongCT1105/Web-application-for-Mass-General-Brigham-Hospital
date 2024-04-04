// import { Graph } from "./graph.tsx";
// import { BFS } from "./bfs.tsx";
// import { pathGenerator } from "./pathGenerator.tsx";
//
// // building graph
// const graph = new Graph();
// //graph.readNodesFromCSV("./resources/L1Nodes.csv");
// graph.readEdgesFromCSV("./resources/L1Edges.csv");
//
// // print out all nodes with properties
// // console.log(graph.nodes);
//
// // print out all edges in graph
// // console.log(graph.edges);
//
// // print out all nodes and their neighbors
// // choose: nodeID, shortName, longName
// // graph.printNodesWithNeighbors("nodeID");
//
// // print out all nodes and their neighbors using x and y Coordinates.
// // graph.printNeighborsXandY();
//
// // print out shortest path with bfs
// // WELEV00ML1 -> CHALL005L1 -> CLABS002L1 -> CREST001L1 -> CHALL001L1 -> WELEV00LL1
// const startNodeID = "WELEV00ML1"; // Set the start node for BFS
// const endNodeID = "WELEV00LL1"; // Set the end node for BFS
//
// const nodeArray = BFS.run(graph, startNodeID, endNodeID);
//
// console.log(); // break for tidiness
//
// console.log(new pathGenerator(nodeArray!).getPathCoordinates());
