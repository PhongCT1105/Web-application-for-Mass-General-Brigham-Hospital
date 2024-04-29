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
function loadModel() {
  return loadLayersModel("file://model.json");
}

loadModel()
  .then((loadedModel) => {
    model = loadedModel;
  })
  .catch((error) => {
    console.error("Error loading model: ", error);
  });

router.post("/", async (req, res) => {
  const events: scheduling[] = req.body;

  try {
    for (const event of events) {
      // Preprocess the event data in the same way as your training data
      const inputData = [
        event.task,
        event.status,
        event.priority,
        event.weekday,
        event.shift,
      ];
      const tensor = tf.tensor2d(inputData, [1, 5]); // Replace 5 with the number of features in your input data
      if (!model) {
        return res.status(500).json({ error: "Model not loaded" });
      }
      const prediction = model.predict(tensor);
      let predictionData;
      if (Array.isArray(prediction)) {
        predictionData = prediction.map((p) => p.dataSync()[0]);
      } else {
        predictionData = prediction.dataSync()[0];
      }
      // Assuming the prediction is a single value, use it to set the employee value for the event
      event.employee = Array.isArray(predictionData)
        ? predictionData[0]
        : predictionData;
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
