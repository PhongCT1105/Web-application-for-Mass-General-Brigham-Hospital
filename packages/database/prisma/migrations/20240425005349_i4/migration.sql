-- CreateTable
CREATE TABLE "HighScore" (
    "id" SERIAL NOT NULL,
    "time" TIMESTAMP(3) NOT NULL,
    "score" INTEGER NOT NULL,

    CONSTRAINT "HighScore_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Nodes" (
    "nodeID" TEXT NOT NULL,
    "xcoord" INTEGER NOT NULL,
    "ycoord" INTEGER NOT NULL,
    "floor" TEXT NOT NULL,
    "building" TEXT NOT NULL,
    "nodeType" TEXT NOT NULL,
    "longName" TEXT NOT NULL,
    "shortName" TEXT NOT NULL,

    CONSTRAINT "Nodes_pkey" PRIMARY KEY ("nodeID")
);

-- CreateTable
CREATE TABLE "Edges" (
    "edgeID" TEXT NOT NULL,
    "startNode" TEXT NOT NULL,
    "endNode" TEXT NOT NULL,

    CONSTRAINT "Edges_pkey" PRIMARY KEY ("edgeID")
);

-- CreateTable
CREATE TABLE "User" (
    "userID" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userID")
);

-- CreateTable
CREATE TABLE "Flower" (
    "fID" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "cost" DOUBLE PRECISION NOT NULL,
    "reqID" INTEGER,

    CONSTRAINT "Flower_pkey" PRIMARY KEY ("fID")
);

-- CreateTable
CREATE TABLE "flowerRequest" (
    "reqID" SERIAL NOT NULL,
    "location" TEXT NOT NULL,
    "message" TEXT,
    "recipient" TEXT NOT NULL,
    "sender" TEXT NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,
    "priority" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "dateSubmitted" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "flowerRequest_pkey" PRIMARY KEY ("reqID")
);

-- CreateTable
CREATE TABLE "sanitationRequest" (
    "reqId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "severity" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "typeOfIssue" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "comments" TEXT NOT NULL,

    CONSTRAINT "sanitationRequest_pkey" PRIMARY KEY ("reqId")
);

-- CreateTable
CREATE TABLE "securityRequest" (
    "reqID" SERIAL NOT NULL,
    "ename" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "employee" TEXT NOT NULL,
    "situation" TEXT NOT NULL,
    "call" BOOLEAN NOT NULL,
    "status" TEXT NOT NULL,
    "priority" TEXT NOT NULL,

    CONSTRAINT "securityRequest_pkey" PRIMARY KEY ("reqID")
);

-- CreateTable
CREATE TABLE "internalTransportRequest" (
    "reqID" SERIAL NOT NULL,
    "employeeName" TEXT NOT NULL,
    "patientName" TEXT NOT NULL,
    "priority" TEXT NOT NULL,
    "locationFrom" TEXT NOT NULL,
    "locationTo" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "reason" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "note" TEXT NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "internalTransportRequest_pkey" PRIMARY KEY ("reqID")
);

-- CreateTable
CREATE TABLE "medicationInfo" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "priority" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "quantity" INTEGER NOT NULL,
    "medicationRequestId" INTEGER,

    CONSTRAINT "medicationInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "medicationRequest" (
    "id" SERIAL NOT NULL,
    "employee" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "patient" TEXT NOT NULL,
    "dateSubmitted" TEXT NOT NULL,

    CONSTRAINT "medicationRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "employee" (
    "id" SERIAL NOT NULL,
    "fName" TEXT NOT NULL,
    "lName" TEXT NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "employee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "maintenanceRequest" (
    "reqId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "severity" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "typeOfIssue" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "maintenanceRequest_pkey" PRIMARY KEY ("reqId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Nodes_xcoord_ycoord_floor_key" ON "Nodes"("xcoord", "ycoord", "floor");

-- AddForeignKey
ALTER TABLE "Edges" ADD CONSTRAINT "Edges_startNode_fkey" FOREIGN KEY ("startNode") REFERENCES "Nodes"("nodeID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Edges" ADD CONSTRAINT "Edges_endNode_fkey" FOREIGN KEY ("endNode") REFERENCES "Nodes"("nodeID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Flower" ADD CONSTRAINT "Flower_reqID_fkey" FOREIGN KEY ("reqID") REFERENCES "flowerRequest"("reqID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "medicationInfo" ADD CONSTRAINT "medicationInfo_medicationRequestId_fkey" FOREIGN KEY ("medicationRequestId") REFERENCES "medicationRequest"("id") ON DELETE SET NULL ON UPDATE CASCADE;
