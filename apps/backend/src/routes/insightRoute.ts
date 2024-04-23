// import express, { Router, Request, Response } from "express";
// // import { Flower, flowerRequest } from "database";
// import PrismaClient from "../bin/database-connection.ts";
//
// const router: Router = express.Router();
//
// export interface cartItem {
//   name: string;
//   cost: number;
// }
//
// interface RequestForm {
//   cartItems: cartItem[];
//   sender: string;
//   recipient: string;
//   location: string;
//   message?: string;
//   total: number;
//   priority: string;
//   status: string;
// }
//
// function productsToString(products: cartItem[]): string {
//   return products.map((product) => `${product.name},${product.cost}`).join(",");
// }
//
// router.post("/", async (req: Request, res: Response) => {
//   try {
//     const requestBody = req.body;
//     console.log(requestBody);
//     const jsonString = JSON.stringify(requestBody);
//     console.log("JSON String:", jsonString);
//
//     // Parse the JSON string back into an object
//     const requestForm: RequestForm = JSON.parse(jsonString);
//     console.log(requestForm);
//     const cartItems = requestForm.cartItems;
//     const namesString = productsToString(cartItems);
//
//     await PrismaClient.flowerRequest.create({
//       data: {
//         cartItems: namesString,
//         location: requestForm.location,
//         message: requestForm.message,
//         recipient: requestForm.recipient,
//         sender: requestForm.sender,
//         total: requestForm.total,
//         priority: requestForm.priority,
//         status: requestForm.status,
//       },
//     });
//     console.info("Successfully requested flowers");
//     res.status(200).json({ message: "Flower requests created successfully" });
//   } catch (error) {
//     // Log any failures
//     console.error(`Unable to save flower request ${req}: ${error}`);
//     res.sendStatus(400); // Send error
//     return; // Don't try to send duplicate statuses
//   }
// });
//
// router.get("/", async function (flowerReq: Request, res: Response) {
//   const flowerRequest = await PrismaClient.flowerRequest.findMany();
//   res.send(flowerRequest);
// });
//
// export default router;
