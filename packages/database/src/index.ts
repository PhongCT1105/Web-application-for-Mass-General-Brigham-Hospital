export * from "../.prisma/client";

import { PrismaClient } from "../.prisma/client";
import fs from "fs";
const prisma = new PrismaClient();

async function readCsvFile() {
  // CLear table
  await prisma.edges.deleteMany();
  await prisma.nodes.deleteMany();

  //---------------NODE---------------
  const nodesCSV = fs.readFileSync("./resources/L1Nodes.csv", "utf8");
  const nodesData: string[] = nodesCSV.trim().split("\n").slice(1);
  const nodes = nodesData.map((nodesData) => {
    const [
      nodeID,
      xcoord,
      ycoord,
      floor,
      building,
      nodeType,
      longName,
      shortName,
    ] = nodesData.split(",");
    return {
      nodeID,
      xcoord: parseInt(xcoord),
      ycoord: parseInt(ycoord),
      floor,
      building,
      nodeType,
      longName,
      shortName,
    };
  });

  //Insert nodes into database
  await prisma.nodes.createMany({
    data: nodes,
  });

  //Print out the nodes data from the database
  /*
    console.log("Nodes Table: ");
    nodes.forEach(node => {
        console.log(`${node.nodeID} | ${node.xcoord} | ${node.ycoord} | ${node.floor} | ${node.building} |  ${node.nodeType} | ${node.longName} | ${node.shortName}`);
    });
    */

  //---------------EDGE---------------
  const edgesCSV = fs.readFileSync("./resources/L1Edges.csv", "utf8");
  const edgesData: string[] = edgesCSV
    .trim()
    .replace(/\r/g, "")
    .split("\n")
    .slice(1);
  const edges = edgesData.map((edge) => {
    const [startNodeID, endNodeID] = edge.split(",");
    return { startNodeID, endNodeID };
  });

  // Insert edge into database
  await prisma.edges.createMany({
    data: edges,
  });

  //Print out the edges data from the database
  /*
    console.log("Edges Table: ");
    edges.forEach(edge => {
        console.log(`${edge.startNodeID} | ${edge.endNodeID}`);
    });
    */

  await prisma.user.create({
    data: {
      username: "admin",
      password: "admin",
    },
  });
}

async function exportToCsv() {
  //---------------NODE---------------
  const nodes = await prisma.nodes.findMany();
  const nodeHeader =
    "nodeID,xcoord,ycoord,floor,building,nodeType,longName,shortName";
  const nodeCSV = [
    nodeHeader,
    ...nodes.map(
      (node) =>
        `${node.nodeID},${node.xcoord},${node.ycoord},${node.floor},${node.building},${node.nodeType},${node.longName},${node.shortName}`,
    ),
  ].join("\n");

  // Write the CSV data to a file
  fs.writeFileSync("./resources/nodes.csv", nodeCSV);
  console.log("Data is saved into './resources/nodes.csv'");

  //---------------EDGE---------------
  const edges = await prisma.edges.findMany();
  const edgeHeader = "startNodeID,endNodeID";
  const edgeCSV = [
    edgeHeader,
    ...edges.map((edge) => `${edge.startNodeID},${edge.endNodeID}`),
  ].join("\n");

  // Write the CSV data to a file
  fs.writeFileSync("./resources/edges.csv", edgeCSV);
  console.log("Data is saved into './resources/edges.csv'");
}

readCsvFile();
exportToCsv();
