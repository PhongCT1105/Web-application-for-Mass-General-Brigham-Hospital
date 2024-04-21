import express, { Router, Request, Response } from "express";
// import { Flower, flowerRequest } from "database";
import PrismaClient from "../bin/database-connection.ts";
import {
  FlowerForm,
  Flowers,
} from "../../../frontend/src/interfaces/flowerReq.ts";

const router: Router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  try {
    const requestBody = req.body;
    //console.log(requestBody);
    const jsonString = JSON.stringify(requestBody);
    console.log("JSON String:", jsonString);

    // Parse the JSON string back into an object
    const requestForm: FlowerForm = JSON.parse(jsonString);
    console.log(requestForm);
    const flowers: Flowers[] = requestForm.flowers;
    const cartItemCreateData = flowers.map((flower) => ({
      name: flower.name,
      cost: flower.cost,
    }));

    await PrismaClient.flowerRequest.create({
      data: {
        cartItems: {
          createMany: {
            data: cartItemCreateData,
          },
        },
        location: requestForm.location,
        message: requestForm.message,
        recipient: requestForm.recipient,
        sender: requestForm.sender,
        total: requestForm.total,
        priority: requestForm.priority,
        status: requestForm.status,
      },
    });
    console.info("Successfully requested flowers");
    res.status(200).json({ message: "Flower requests created successfully" });
  } catch (error) {
    // Log any failures
    console.error(`Unable to to save flower request ${req}: ${error}`);
    res.sendStatus(400); // Send error
    return; // Don't try to send duplicate statuses
  }
});

router.get("/", async function (flowerReq: Request, res: Response) {
  const data = await PrismaClient.flowerRequest.findMany({
    include: {
      cartItems: true,
    },
  });
  res.status(200).json(data);
});

export default router;
