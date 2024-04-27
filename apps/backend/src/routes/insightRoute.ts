import express, { Router } from "express";
import axios from "axios";
const router: Router = express.Router();

const parsedata = [
  { request: "Flower Request", total: 500 },
  { request: "MedicationRequest", total: 300 },
  { request: "Patient Transport Request", total: 150 },
  { request: "Sanitation Request", total: 180 },
  { request: "Security Request", total: 100 },
];
router.post("/sanitation", async (req, res) => {
  console.log("Test for insight");
  try {
    const response = await axios.post("/api/sanitation", parsedata);
    console.log(response.data);
    res.status(200).send("Node data imported successfully.");
  } catch (error) {
    console.error("Error processing node data:", error);
    res.status(400).send("Bad request");
  }
});

export default router;
