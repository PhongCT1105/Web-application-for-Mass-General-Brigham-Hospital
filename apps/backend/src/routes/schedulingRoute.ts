import PrismaClient from "../bin/database-connection.ts";
import express, { Router } from "express";
import * as tf from "@tensorflow/tfjs";
import { loadLayersModel } from "@tensorflow/tfjs-node";

interface scheduling {
  task: number;
  weekday: number;
  shift: number;
  priority: number;
  status: number;
  employee?: number;
  title: string;
  color: string;
  start: string;
  end: string;
}
// interface Event {
//   id: number;
//   // start: Date | string;
//   // end: Date | string;
//   color: string;
//   employee: string;
//   status: string;
//   priority: string;
//   shift: number;
//   weekday: number;
//   title: string;
// }

const router: Router = express.Router();

let model: tf.LayersModel | undefined;
async function loadModel() {
  model = await loadLayersModel("file://model.json");
}
loadModel();

router.post("/predict", async (req, res) => {
  try {
    const inputData = req.body; // This should be preprocessed in the same way as your training data
    const tensor = tf.tensor2d(inputData, [1, 5]); // Replace 5 with the number of features in your input data
    if (!model) {
      return res.status(500).json({ error: "Model not loaded" });
    }
    const prediction = model.predict(tensor);
    let predictionData;
    if (Array.isArray(prediction)) {
      predictionData = prediction.map((p) => p.dataSync());
    } else {
      predictionData = prediction.dataSync();
    }
    res.status(200).json({ prediction: predictionData });
  } catch (error) {
    console.error("Error", error);
    res.status(400);
  }
});
router.post("/", async (req, res) => {
  const events: scheduling[] = req.body;

  try {
    for (const event of events) {
      event.employee = 6;
    }
    console.log("Backend response: " + events);
    res.status(200).json(events);
  } catch (error) {
    console.error("Error: ", error);
    res.status(400);
  }
});

router.post("/save", async (req, res) => {
  try {
    const schedule = req.body;
    await PrismaClient.scheduleEvent.deleteMany();
    for (const event of schedule) {
      await PrismaClient.scheduleEvent.create({
        data: {
          end: event.end,
          start: event.start,
          color: event.color,
          priority: event.priority,
          status: event.status,
          shift: event.shift,
          weekday: event.weekday,
          employee: event.employee,
          title: event.title,
        },
      });
    }
    console.info("Successfully posted schedule.");
    res.status(200);
  } catch (error) {
    console.error("Error", error);
    res.status(400);
  }
});
router.get("/savedSchedule", async (req, res) => {
  const savedSchedule = await PrismaClient.scheduleEvent.findMany();

  // Convert ISO strings to Date objects
  // const scheduleWithDates = savedSchedule.map((item) => ({
  //   ...item,
  //   // Convert start and end attributes if they are ISO strings
  //   start: new Date(item.start),
  //   end: new Date(item.end),
  // }));

  res.send(savedSchedule);
});

export default router;
