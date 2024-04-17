// import React, { useEffect, useState, FormEvent } from "react";
// import axios from "axios";
// import { useAuth0 } from "@auth0/auth0-react";
// import { Button } from "@/components/ui/button.tsx";
// import { ServiceRequestType } from "common/src/interfaces/serviceRequest.ts";
//
// const Auth0Profile = () => {
//     const [importErr] = useState<boolean>(false);
//     const [exportErr, setExportErr] = useState<boolean>(false);
//
//     const { user, logout } = useAuth0();
//
//     const [employeeData, setEmployeeData] = useState<Array<ServiceRequestType>>([]);
//
//     const handleLogout = async () => {
//         await logout({
//             logoutParams: {
//                 returnTo: window.location.origin,
//             },
//         });
//     };
//
//     async function handleImport(e: FormEvent<HTMLFormElement>) {
//         e.preventDefault();
//         setExportErr(false); // Reset the import error state
//
//         const target = e.target as HTMLFormElement;
//         const edgesInput = target.querySelector("#edgesInput") as HTMLInputElement;
//         const nodesInput = target.querySelector("#nodesInput") as HTMLInputElement;
//         const employeesInput = target.querySelector("#employeesInput") as HTMLInputElement;
//
//         const mapData = new FormData();
//         const employeeData = new FormData();
//
//         if (edgesInput.files) {
//             mapData.append("edges", edgesInput.files[0]);
//         }
//
//         if (nodesInput.files) {
//             mapData.append("nodes", nodesInput.files[0]);
//         }
//
//         if (employeesInput.files) {
//             employeeData.append("employee", employeesInput.files[0]);
//         }
//
//         axios.post("/api/map/import", mapData).then((res) => {
//             console.log("Map import response:", res);
//         }).catch((error: Error) => {
//             console.error("Map import error:", error.message);
//             setExportErr(true);
//         });
//
//         axios.post("/api/employee/import", employeeData).then((res) => {
//             console.log("Employee import response:", res);
//         }).catch((error: Error) => {
//             console.error("Employee import error:", error.message);
//             setExportErr(true);
//         });
//     }
//
//     async function handleExport(e: FormEvent<HTMLFormElement>) {
//         e.preventDefault();
//
//         try {
//             const mapExport = await axios.get("/api/map/export", { responseType: "blob" });
//
//             if (mapExport.headers["content-type"] !== "application/zip") {
//                 throw new Error("Did not receive valid map data");
//             }
//
//             const mapUrl = window.URL.createObjectURL(new Blob([mapExport.data]));
//             const mapLink = document.createElement("a");
//             mapLink.href = mapUrl;
//             mapLink.setAttribute("download", "map_data.zip");
//             document.body.appendChild(mapLink);
//             mapLink.click();
//             document.body.removeChild(mapLink);
//
//             const employeeExport = await axios.get("/api/employee/export", { responseType: "blob" });
//
//             if (employeeExport.headers["content-type"] !== "application/zip") {
//                 throw new Error("Did not receive valid employee data");
//             }
//
//             const employeeUrl = window.URL.createObjectURL(new Blob([employeeExport.data]));
//             const employeeLink = document.createElement("a");
//             employeeLink.href = employeeUrl;
//             employeeLink.setAttribute("download", "employee_data.zip");
//             document.body.appendChild(employeeLink);
//             employeeLink.click();
//             document.body.removeChild(employeeLink);
//
//             setExportErr(false);
//         } catch (error) {
//             console.log((error as Error).message);
//             setExportErr(true);
//         }
//     }
//
//     useEffect(() => {
//         const fetchEmployeeData = () => {
//             axios.get("/api/serviceRequest/byEmployee", { params: { username: user?.nickname } })
//                 .then((res) => {
//                     console.log("Employee Requests Fetched");
//                     setEmployeeData(res.data);
//                 })
//                 .catch((e: Error) => {
//                     console.log(e.message);
//                 });
//         };
//
//         fetchEmployeeData();
//     }, [user?.nickname]);
//
//     return (
//         <div className="my-8 mx-auto gap-1 w-98 border-8 border-solid border-blue-900 rounded-lg p-4 m-4">
//             <div className="text-center mt-8">
//                 <img
//                     alt={user?.name || "User"}
//                     src={user?.picture}
//                     className="w-100 h-100 mx-auto"
//                 />
//                 <h4 className="mt-4">Hello, {user?.nickname}</h4>
//                 <h6 className="mt-4 mb-2">Email: {user?.name}</h6>
//                 <p className="text-gray-500">Your assigned service requests...</p>
//                 <div className="border border-gray-400 rounded-md w-full">
//                     <table>
//                         <thead>
//                         <tr>
//                             <th></th>
//                             <th>Date</th>
//                             <th>Type of Service</th>
//                             <th>Location</th>
//                             <th>Employee</th>
//                             <th>Progress</th>
//                             <th>Priority</th>
//                         </tr>
//                         </thead>
//                         <tbody>
//                         {employeeData.map((request, index) => (
//                             <tr key={index}>
//                                 <td>{request.id}</td>
//                                 <td>{request.dateSubmitted}</td>
//                                 <td>{request.typeOfService}</td>
//                                 <td>{request.location}</td>
//                                 <td>{request.employee}</td>
//                                 <td>{request.progress}</td>
//                                 <td>{request.priority}</td>
//                             </tr>
//                         ))}
//                         </tbody>
//                     </table>
//                 </div>
//                 <div className="mt-2">
//                     <form className="m-auto w-75 mt-5" onSubmit={handleImport}>
//                         <h4 className="mb-3">Import All Data as CSV</h4>
//                         <div className="mb-3">
//                             <label className="mb-3">Edges CSV</label>
//                             <input type="file" id="edgesInput" accept=".csv" />
//                         </div>
//                         <div className="mb-3">
//                             <label className="mb-3">Nodes CSV</label>
//                             <input type="file" id="nodesInput" accept=".csv" />
//                         </div>
//                         <div className="mb-3">
//                             <label className="mb-3">Employee CSV</label>
//                             <input type="file" id="employeesInput" accept=".csv" />
//                         </div>
//                         <button type="submit" className="mt-3 w-100">
//                             Import
//                         </button>
//                         <p className="text-danger" style={{ visibility: importErr ? "visible" : "hidden" }}>
//                             Error Importing Data
//                         </p>
//                     </form>
//
//                     <form className="m-auto w-75 mt-5" onSubmit={handleExport}>
//                         <h4 className="mb-3">Export All Data as CSV</h4>
//                         <button type="submit" className="w-100">
//                             Download All Data
//                         </button>
//                         <p className="text-danger" style={{ visibility: exportErr ? "visible" : "hidden" }}>
//                             Error Exporting Data
//                         </p>
//                     </form>
//                 </div>
//
//                 <Button onClick={handleLogout} className="mt-8">
//                     Sign Out
//                 </Button>
//             </div>
//         </div>
//     );
// };
//
// export default Auth0Profile;
