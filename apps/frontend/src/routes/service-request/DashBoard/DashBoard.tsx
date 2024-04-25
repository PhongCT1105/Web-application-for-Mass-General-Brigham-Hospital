import React from "react";
import Draggable from "react-draggable";
import PieGraph from "@/components/Graph/PieGraph";
import { overallPieData } from "@/data/overallData/pieChartData.ts";
import { overallLineData } from "@/data/overallData/lineChartData";
import LineGraph from "@/components/Graph/LineGraph.tsx";

const Dashboard = () => {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-400 to-purple-600 text-white flex justify-center py-4">
        <h1 className="text-4xl font-bold">Statistic Dashboard</h1>
      </header>

      {/* Main Content */}
      <main className="flex-grow bg-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1 */}
          <Draggable>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-6">
                <h2 className="text-lg font-semibold mb-2">Days</h2>
                <p className="text-3xl font-bold">255</p>
              </div>
            </div>
          </Draggable>

          {/* Card 2 */}
          <Draggable>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-6">
                <h2 className="text-lg font-semibold mb-2">Total amount</h2>
                <p className="text-3xl font-bold">$10,000</p>
              </div>
            </div>
          </Draggable>

          {/* Card 3 */}
          <Draggable>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-6">
                <h2 className="text-lg font-semibold mb-2">
                  Service requests made
                </h2>
                <p className="text-3xl font-bold">10</p>
              </div>
            </div>
          </Draggable>

          {/* Card 4 */}
          <Draggable>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-6">
                <h2 className="text-lg font-semibold mb-2">
                  Success service requests
                </h2>
                <p className="text-3xl font-bold">5</p>
              </div>
            </div>
          </Draggable>
        </div>

        {/* Graphs */}

        <div className="mt-8 flex flex-col md:flex-row gap-6">
          <Draggable>
            {/* Line Graph */}
            <div className="w-full md:w-1/2 bg-white rounded-lg shadow-lg overflow-hidden">
              <h2 className="text-lg font-semibold mb-4 py-4 bg-gradient-to-r from-blue-400 to-purple-600 text-white text-center">
                Money tracking
              </h2>
              <div className="p-6">
                <LineGraph props={overallLineData} />
              </div>
            </div>
          </Draggable>

          <Draggable>
            {/* Pie Graph */}
            <div className="w-full md:w-1/2 bg-white rounded-lg shadow-lg overflow-hidden">
              <h2 className="text-lg font-semibold mb-4 py-4 bg-gradient-to-r from-blue-400 to-purple-600 text-white text-center">
                Proportion of service requests
              </h2>
              <div className="p-6">
                <PieGraph props={overallPieData} />
              </div>
            </div>
          </Draggable>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
