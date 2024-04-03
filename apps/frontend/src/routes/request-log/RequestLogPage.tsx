// import {Button} from "@/components/ui/button.tsx";
 
import { Header } from "@/components/blocks/header.tsx";
import { cartItem } from "@/routes/service-request/flower-request-content.tsx";
// import {useEffect, useState} from "react";
// import axios from "axios";
import { LogPageData } from "@/routes/request-log/log-page-data.tsx";
import React from "react";
import { Separator } from "@/components/ui/separator.tsx";

export interface requestFormWID {
  reqID: number;
  cartItems: cartItem[];
  sender: string;
  recipient: string;
  location: string;
  message?: string;
  total: number;
}

export const RequestLogPage = () => {
  const testData: requestFormWID[] = [
    {
      reqID: 1,
      cartItems: [
        {
          name: "Item 1",
          cost: 10,
        },
        {
          name: "Item 2",
          cost: 10,
        },
      ],
      sender: "Sender 1",
      recipient: "Recipient 1",
      location: "Location 1",
      message: "This is a test message.",
      total: 20,
    },
    {
      reqID: 2,
      cartItems: [
        {
          name: "Item 2",
          cost: 15,
        },
      ],
      sender: "Sender 2",
      recipient: "Recipient 2",
      location: "Location 2",
      total: 15,
    },
    {
      reqID: 3,
      cartItems: [
        {
          name: "Item 3",
          cost: 8,
        },
      ],
      sender: "Sender 3",
      recipient: "Recipient 3",
      location: "Location 3",
      total: 8,
    },
  ];

  // export default testData;
  // const [requestData, setFlowerRequestData] = useState<requestFormWID[]>([]);

  // useEffect(() => {
  //     async function fetchData() {
  //         try{
  //             const res = await axios.get("/api/flowerReq");
  //             setFlowerRequestData(res.data);
  //             console.log("successfully got data from get request");
  //         } catch (error) {
  //             console.error("Error fetching data:", error);
  //         }
  //     }
  //     fetchData().then();
  // }, []);

  return (
    <div>
      <Header />
      <div className="flex items-center justify-between p-5 ">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">
            Flower Request Logs
          </h2>
        </div>
      </div>
      <Separator />
      {/*{requestData != undefined ? ( requestData.map((data) => {*/}
      {/*   return <LogPageData data={data}/>  ;*/}
      {/*})) : (<></>) }*/}
      <LogPageData data={testData} />
    </div>
  );
};
export default RequestLogPage;
