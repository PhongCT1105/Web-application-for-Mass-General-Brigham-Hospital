import { Header } from "@/components/blocks/header.tsx";
import { cartItem } from "@/routes/service-request/flower-request-content.tsx";
import { useEffect, useState } from "react";
import axios from "axios";
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
interface CartItem {
  name: string;
  cost: number;
}
function parseCartItems(input: string): CartItem[] {
  const items: CartItem[] = [];
  const parts = input.split(",");

  for (let i = 0; i < parts.length; i += 2) {
    const name = parts[i];
    const cost = parseFloat(parts[i + 1]);

    if (!isNaN(cost)) {
      items.push({ name, cost });
    }
  }
  return items;
}

export interface RequestFormWID {
  reqID: number;
  cartItems: CartItem[];
  sender: string;
  recipient: string;
  location: string;
  message?: string;
  total: number;
}

export const RequestLogPage = () => {
  const [cleanedData, setCleanedData] = useState<requestFormWID[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get("/api/flowerReq");
        const rawData = res.data;
        /* eslint-disable */
        const cleanedData: RequestFormWID[] = rawData.map(
          (item: {
            reqID: number;
            cartItems: any;
            sender: string;
            recipient: string;
            location: string;
            message: string;
            total: number;
          }) => ({
            reqID: item.reqID,
            cartItems: parseCartItems(item.cartItems),
            sender: item.sender,
            recipient: item.recipient,
            location: item.location,
            message: item.message,
            total: item.total,
          }),
        );
        /* eslint-enable */
        setCleanedData(cleanedData);
        console.log("successfully got data from get request");
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData().then(() => console.log(cleanedData));
  }, [cleanedData]);

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
      <LogPageData data={cleanedData} />
    </div>
  );
};
export default RequestLogPage;
