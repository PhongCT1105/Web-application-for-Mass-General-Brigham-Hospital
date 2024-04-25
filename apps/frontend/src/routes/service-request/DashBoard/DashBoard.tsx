import React from "react";
import BarGraph from "@/components/Graph/BarGraph.tsx";
import { overallChartData } from "@/data/overallData/barChartData.ts";

const Dashboard = () => {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <header className="bg-blue-300 text-white flex justify-center">
        <h1 className="text-2xl font-bold">Statistic Dashboard</h1>
      </header>

      {/* Main Content */}
      <main className="flex-grow bg-gray-100 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-2">Days</h2>
            <p className="text-3xl font-bold">255</p>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-2">Total amount</h2>
            <p className="text-3xl font-bold">$10,000</p>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-2">
              Service requests made
            </h2>
            <p className="text-3xl font-bold">10</p>
          </div>

          {/* Card 4 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-2">
              Success service requests
            </h2>
            <p className="text-3xl font-bold">5</p>
          </div>
        </div>
        <BarGraph props={overallChartData} />
      </main>
    </div>
  );
};

export default Dashboard;
