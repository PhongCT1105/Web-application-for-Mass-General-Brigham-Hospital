import express, { Router } from "express";
import axios from "axios";

const router: Router = express.Router();
interface RequestData {
  request: string;
  total: number;
}

const dataToSend: RequestData[] = [
  { request: "Flower Request", total: 500 },
  { request: "MedicationRequest", total: 300 },
  { request: "Patient Transport Request", total: 150 },
  { request: "Sanitation Request", total: 180 },
  { request: "Security Request", total: 100 },
];

router.post("/", async (req, res) => {
  try {
    const response = await axios.post("/", dataToSend);
    res.status(200).json(response.data);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error");
  }
});

export default router;
