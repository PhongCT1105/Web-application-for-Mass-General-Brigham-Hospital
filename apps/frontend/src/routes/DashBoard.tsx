import React, { ReactNode, useState } from "react";
import Draggable from "react-draggable";
// import PieGraph from "@/components/Graph/PieGraph.tsx";
import LineGraph from "@/components/Graph/LineGraph.tsx";
import { overallLineData } from "@/data/overallData/lineChartData.ts";
// import { overallPieData } from "@/data/overallData/pieChartData.ts";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const downloadAsPDF = () => {
  const input = document.getElementById("pdf-content"); // Replace 'pdf-content' with the ID of the container element
  if (!input) {
    return;
  }

  html2canvas(input).then((canvas) => {
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF();
    const imgWidth = 210; // A4 width in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
    pdf.save("Report.pdf");
  });
};

interface PopupContentProps {
  onClose: () => void;
  children: ReactNode;
}

// Placeholder PopupContent component
const PopupContent = ({ onClose, children }: PopupContentProps) => {
  return (
    <div
      className="bg-white rounded-lg shadow-lg p-6"
      style={{
        zIndex: 999,
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "80%",
        height: "80%",
        overflow: "auto",
      }}
    >
      {children}
      <button
        onClick={onClose}
        className="mt-4 px-4 py-2 bg-gray-800 text-white rounded-lg shadow hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
      >
        Close
      </button>
    </div>
  );
};

const Dashboard = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [popupContent, setPopupContent] = useState<ReactNode | null>(null);

  const handleDoubleClick = (content: ReactNode) => {
    setShowPopup(true);
    setPopupContent(content);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setPopupContent(null);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-400 to-purple-600 text-white flex justify-center py-4">
        <h1 className="text-4xl font-bold">Dashboard</h1>
      </header>

      {/* Main Content */}
      <main className="flex-grow bg-gray-200 p-6 ">
        <div id="pdf-content">
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

          <div className="mt-3 flex flex-col md:flex-row gap-6">
            <Draggable>
              {/* Line Graph */}
              <div
                className="w-full md:w-1/2 bg-white rounded-lg shadow-lg overflow-hidden"
                onDoubleClick={() =>
                  handleDoubleClick(
                    <div>
                      <h2 className="text-lg font-semibold mb-4 py-4 bg-gradient-to-r from-blue-400 to-purple-600 text-white text-center">
                        Money tracking
                      </h2>
                      <LineGraph props={overallLineData} />
                    </div>,
                  )
                }
              >
                <div>
                  <h2 className="text-lg font-semibold mb-4 py-4 bg-gradient-to-r from-blue-400 to-purple-600 text-white text-center">
                    Money tracking
                  </h2>
                  <LineGraph props={overallLineData} />
                </div>
              </div>
            </Draggable>

            {/*<Draggable>*/}
            {/*  /!* Pie Graph *!/*/}
            {/*  <div*/}
            {/*    className="w-full md:w-1/2 bg-white rounded-lg shadow-lg overflow-hidden"*/}
            {/*    onDoubleClick={() =>*/}
            {/*      handleDoubleClick(*/}
            {/*        <div>*/}
            {/*          <h2 className="text-lg font-semibold mb-4 py-4 bg-gradient-to-r from-blue-400 to-purple-600 text-white text-center">*/}
            {/*            Proportion of service requests*/}
            {/*          </h2>*/}
            {/*          <PieGraph props={overallPieData} />*/}
            {/*        </div>,*/}
            {/*      )*/}
            {/*    }*/}
            {/*  >*/}
            {/*    <div>*/}
            {/*      <h2 className="text-lg font-semibold mb-4 py-4 bg-gradient-to-r from-blue-400 to-purple-600 text-white text-center">*/}
            {/*        Proportion of service requests*/}
            {/*      </h2>*/}
            {/*      <PieGraph props={overallPieData} />*/}
            {/*    </div>*/}
            {/*    ,*/}
            {/*  </div>*/}
            {/*</Draggable>*/}
          </div>
        </div>
        <button
          className="px-4 py-2 bg-gray-800 text-white rounded-lg shadow hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
          onClick={downloadAsPDF}
        >
          Download report
        </button>
      </main>

      {/* Popup Content */}
      {showPopup && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center">
          <div className="absolute">
            <PopupContent onClose={handleClosePopup}>
              {popupContent}
            </PopupContent>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
