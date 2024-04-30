import PrismaClient from "../bin/database-connection.ts";
import express, { Router } from "express";
import * as tf from "@tensorflow/tfjs";
import { YS_values } from "../model/ys.ts";
import { XS_values } from "../model/xs.ts";

interface scheduling {
  task: number;
  weekday: number;
  shift: number;
  priority: number;
  status: number;
  employee?: number;
}

const model = tf.sequential();
model.add(tf.layers.dense({ units: 1, inputShape: [XS_values[0].length] }));

// Prepare the model for training: Specify the loss and the optimizer.
model.compile({ loss: "meanSquaredError", optimizer: "sgd" });

async function modelFit() {
  const xs = tf.tensor2d(XS_values, [XS_values.length, XS_values[0].length]);
  const ys = tf.tensor2d(YS_values, [YS_values.length, 1]);

  // Train the model using the data.
  await model.fit(xs, ys, { epochs: 250 });
  return model;
}

function getPredictionData(
  prediction: tf.Tensor<tf.Rank> | tf.Tensor<tf.Rank>[],
): number[] {
  if (Array.isArray(prediction)) {
    return prediction.map((tensor) => tensor.dataSync()[0]);
  } else {
    return [prediction.dataSync()[0]];
  }
}
const trainedModel = modelFit();

const router: Router = express.Router();
router.post("/", async (req, res) => {
  const events: scheduling[] = req.body;

  try {
    for (const event of events) {
      const inputData = [
        event.task,
        event.status,
        event.priority,
        event.weekday,
        event.shift,
      ];

      if (!model) return res.status(500).json({ error: "Model not loaded" });

      // const tensor = tf.tensor2d(inputData, [1, 5]); // Replace 5 with the number of features in your input data
      const tensor = tf.tensor2d(inputData, [1, 5]); // Replace 5 with the number of features in your input data
      const prediction = (await trainedModel).predict(tensor);
      const predictionData = getPredictionData(prediction);
      event.employee = Math.round(predictionData[0]);
      console.log("predicate value: " + predictionData[0]);
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
  res.send(savedSchedule);
});

export default router;
// import * as tf from "@tensorflow/tfjs";
// // import { loadLayersModel } from "@tensorflow/tfjs";
//
// const model = tf.sequential();
// model.add(tf.layers.dense({ units: 1, inputShape: [200] }));
// model.compile({
//   loss: "meanSquaredError",
//   optimizer: "sgd",
//   metrics: ["MAE"],
// });
//
// // Generate some random fake data for demo purposes.
// const xs = tf.randomUniform([10000, 200]);
// const ys = tf.randomUniform([10000, 1]);
// const valXs = tf.randomUniform([1000, 200]);
// const valYs = tf.randomUniform([1000, 1]);
//
// // Start model training process.
// async function train() {
//   await model.fit(xs, ys, {
//     epochs: 100,
//     validationData: [valXs, valYs],
//     // Add the tensorBoard callback here.
//     callbacks: tf.node.tensorBoard("/tmp/fit_logs_1"),
//   });
// }
// train();

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
