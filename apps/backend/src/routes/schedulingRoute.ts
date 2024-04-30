import PrismaClient from "../bin/database-connection.ts";
import express, { Router } from "express";
import * as tf from "@tensorflow/tfjs";

// Create a simple model.
const model = tf.sequential();
model.add(tf.layers.dense({ units: 1, inputShape: [2] }));

// Prepare the model for training: Specify the loss and the optimizer.
model.compile({ loss: "meanSquaredError", optimizer: "sgd" });

async function modelFit() {
  // Generate some synthetic data for training. (y = 2x - 1)
  const xs = tf.tensor2d(
    [
      [1, 2],
      [2, 2],
      [3, 4],
      [1, 1],
      [4, 4],
      [1, 4],
      [3, 3],
      [5, 3],
      [2, 4],
      [2, 3],
      [4, 5],
      [5, 4],
      [3, 1],
      [2, 5],
      [3, 3],
      [2, 4],
      [3, 5],
      [5, 5],
      [3, 4],
      [2, 4],
      [3, 5],
      [2, 5],
      [3, 5],
      [1, 2],
      [1, 1],
      [3, 5],
      [2, 1],
      [3, 3],
      [3, 5],
      [2, 1],
      [1, 2],
      [3, 4],
      [3, 2],
      [2, 4],
      [2, 4],
      [3, 5],
      [4, 2],
      [2, 5],
      [2, 2],
      [2, 1],
      [2, 1],
      [2, 3],
      [2, 5],
      [1, 5],
      [2, 5],
      [5, 1],
      [2, 5],
      [3, 3],
      [1, 2],
      [3, 5],
      [3, 3],
      [1, 5],
      [5, 5],
      [1, 4],
      [1, 5],
      [2, 4],
      [2, 4],
      [2, 3],
      [1, 3],
      [1, 2],
      [3, 5],
      [1, 2],
      [3, 2],
      [3, 5],
      [2, 2],
      [3, 4],
      [2, 4],
      [3, 1],
      [1, 2],
      [5, 3],
      [1, 3],
      [2, 4],
      [1, 3],
      [2, 4],
      [1, 2],
      [1, 4],
      [2, 2],
      [2, 5],
      [5, 3],
      [4, 1],
      [2, 2],
      [5, 4],
      [4, 5],
      [2, 4],
      [1, 2],
      [1, 2],
      [4, 5],
      [1, 5],
      [3, 3],
      [2, 2],
      [1, 2],
      [2, 3],
      [2, 4],
      [2, 4],
      [3, 3],
      [1, 2],
      [4, 1],
      [5, 2],
      [5, 3],
      [3, 5],
    ],
    [100, 2],
  );
  const ys = tf.tensor2d(
    [
      2, 7, 11, 3, 5, 1, 11, 5, 7, 3, 1, 7, 4, 4, 4, 5, 7, 10, 3, 10, 3, 3, 3,
      2, 11, 4, 3, 10, 11, 6, 1, 10, 10, 3, 6, 6, 4, 7, 6, 4, 3, 3, 3, 8, 3, 3,
      8, 10, 1, 9, 11, 2, 7, 7, 11, 3, 5, 4, 6, 7, 10, 2, 10, 8, 4, 2, 6, 7, 1,
      10, 1, 3, 8, 7, 2, 8, 3, 4, 5, 10, 3, 5, 4, 11, 8, 9, 3, 10, 2, 5, 5, 6,
      6, 10, 11, 11, 5, 7, 5, 9,
    ],
    [100, 1],
  );

  // Train the model using the data.
  await model.fit(xs, ys, { epochs: 250 });
  return model;
  // const out = model.predict(tf.tensor2d([[5, 2]], [1, 2]));
  // console.log(out);
  // return out;
}

interface scheduling {
  task: number;
  weekday: number;
  shift: number;
  priority: number;
  status: number;
  employee?: number;
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

const router: Router = express.Router();
router.post("/", async (req, res) => {
  const events: scheduling[] = req.body;
  const trainedModel = await modelFit();

  try {
    for (const event of events) {
      // Preprocess the event data in the same way as your training data
      const inputData = [
        event.task,
        event.status,
        // event.priority,
        // event.weekday,
        // event.shift,
      ];
      if (!model) {
        return res.status(500).json({ error: "Model not loaded" });
      }
      const tensor = tf.tensor2d(inputData, [1, 2]); // Replace 5 with the number of features in your input data
      const prediction = trainedModel.predict(tensor);
      const predictionData = getPredictionData(prediction);
      event.employee = Number(predictionData[0].toFixed(0));
      // if (Array.isArray(prediction)) {
      //   predictionData = prediction.map((p) => p.dataSync()[0]);
      // } else {
      //   predictionData = prediction.dataSync()[0];
      // }
      // Assuming the prediction is a single value, use it to set the employee value for the event
      // event.employee = Array.isArray(predictionData)
      //   ? predictionData[0]
      //   : predictionData;
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
