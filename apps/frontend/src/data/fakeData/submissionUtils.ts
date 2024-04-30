// // Version 1: Submitted
// import axios from "axios";
// // Function to check if data has been submitted
// export function isDataSubmitted(key: string): boolean {
//   return localStorage.getItem(key) === "true";
// }
//
// // Function to submit data only once
// export async function submitDataOnce(
//   key: string,
//   data: unknown,
//   endpoint: string,
// ) {
//   if (isDataSubmitted(key)) {
//     console.log("Data has already been submitted. Skipping...");
//     return;
//   }
//
//   try {
//     console.log("Running");
//     const res = await axios.post(endpoint, data, {
//       headers: {
//         "content-type": "application/json",
//       },
//     });
//     console.log("Success:", res.data);
//
//     // Set the flag in local storage indicating that the data has been submitted
//     localStorage.setItem(key, "true");
//   } catch (error) {
//     console.error("Error:", error);
//   }
// }

// Version 2: Push data

// Function to check if data has been submitted
export function isDataSubmitted(key: string): boolean {
  return localStorage.getItem(key) === "true";
}

// Submit
// Function to submit data only once
import axios from "axios";

export async function submitDataOnce(
  key: string,
  data: unknown,
  endpoint: string,
) {
  // if (isDataSubmitted(key)) {
  //     console.log("Data has already been submitted. Skipping...");
  //     return;
  // }

  try {
    console.log("Running");
    const res = await axios.post(endpoint, data, {
      headers: {
        "content-type": "application/json",
      },
    });
    console.log("Success:", res.data);

    // Set the flag in local storage indicating that the data has been submitted
    // localStorage.setItem(key, "true");
  } catch (error) {
    console.error("Error:", error);
  }
}
