import express, { Router, Request, Response } from "express";
import PrismaClient from "../bin/database-connection.ts";
import {
  Medication,
  MedicationForm,
} from "../../../frontend/src/interfaces/medicationReq.ts";

const router: Router = express.Router();
router.post("/", async function (req: Request, res: Response) {
  const requestBody: MedicationForm[] = req.body;
  try {
    // console.log(requestBody);
    // const jsonString = JSON.stringify(requestBody);
    // console.log("JSON String:", jsonString);

    // Parse the JSON string back into an object
    // const requestForm: MedicationForm = JSON.parse(jsonString);
    // console.log(requestForm);
    for (const requestForm of requestBody) {
      const medicationData: Medication[] = requestForm.medication;

      // if (medicationData.length == 1) {
      //   const medicationObject: Medication = medicationData[0];
      //   const { id, ...medicationCreateData } = medicationObject;
      //   console.log(medicationObject);
      //   console.log(medicationCreateData);
      //   await PrismaClient.medicationRequest.create({
      //     data: {
      //       medication: {
      //         create: {
      //           data: medicationCreateData,
      //         },
      //       },
      //       employee: requestForm.employee,
      //       location: requestForm.location,
      //       patient: requestForm.patient,
      //       dateSubmitted: requestForm.dateSubmitted,
      //     },
      //   });
      // } else {
      const medicationCreateData = medicationData.map((medication) => ({
        name: medication.name,
        priority: medication.priority,
        status: medication.status,
        price: medication.price,
        quantity: medication.quantity,
      }));

      await PrismaClient.medicationRequest.create({
        data: {
          medication: {
            createMany: {
              data: medicationCreateData,
            },
          },
          employee: requestForm.employee,
          location: requestForm.location,
          patient: requestForm.patient,
          dateSubmitted: requestForm.dateSubmitted,
        },
      });
      // }
    }
    console.info("Successfully requested medication services");
    res
      .status(200)

      .json({ message: "medication service request created successfully" });
  } catch (error) {
    // Log any failures
    console.error(`Unable to save medication service request ${req}: ${error}`);
    res.sendStatus(400); // Send error
    return; // Don't try to send duplicate statuses
  }
});

router.get("/", async (req, res) => {
  const data = await PrismaClient.medicationRequest.findMany({
    include: {
      medication: true,
    },
  });
  res.status(200).json(data);
});

export default router;
