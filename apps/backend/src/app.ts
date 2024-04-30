import createError, { HttpError } from "http-errors";
import express, { Express, NextFunction, Request, Response } from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import flowerRouter from "./routes/flowerRoute.ts";
import mapRoute from "./routes/mapRoute.ts";
import csvFetch from "./routes/csvFetch.ts";
import transportRoute from "./routes/transportRoute.ts";
import sanitationRouter from "./routes/sanitationRoute.ts";
import securityRoute from "./routes/securityRoute.ts";
import medicationRoute from "./routes/medicationRoute.ts";
// import m from "./routes/sanitationRoute.ts";
import { auth } from "express-oauth2-jwt-bearer";
import pathfindingRoute from "./routes/pathfindingRoute.ts";
import employeeRoute from "./routes/employeeRoute.ts";
import maintenanceRoute from "./routes/maintenanceRoute.ts";
import insightRoute from "./routes/insightRoute.ts";
import schedulingRoute from "./routes/schedulingRoute.ts";

const app: Express = express(); // Setup the backend

// Setup generic middlewear
app.use(
  logger("dev", {
    stream: {
      // This is a "hack" that gets the output to appear in the remote debugger :)
      write: (msg) => console.info(msg),
    },
  }),
); // This records all HTTP requests
app.use(express.json()); // This processes requests as JSON
app.use(express.urlencoded({ extended: false })); // URL parser
app.use(cookieParser()); // Cookie parser

// Setup routers. ALL ROUTERS MUST use /api as a start point, or they
// won't be reached by the default proxy and prod setup
//app.use("/api/high-score", exampleRouter);
app.use("/api/flowerReq", flowerRouter);
app.use("/api/mapreq", mapRoute);
app.use("/api/csvFetch", csvFetch);
app.use("/api/transport", transportRoute);
app.use("/api/sanitationReq", sanitationRouter);
app.use("/api/securityReq", securityRoute);
app.use("/api/medicationReq", medicationRoute);
app.use("/api/search", pathfindingRoute);
app.use("/api/insight", insightRoute);
app.use("/api/employeeData", employeeRoute);
app.use("/api/maintenanceReq", maintenanceRoute);
app.use("/api/scheduling", schedulingRoute);
app.use("/healthcheck", function (req: Request, res: Response): void {
  if (!process.env["VITETEST"]) {
    app.use(
      auth({
        audience: "/api",
        issuerBaseURL: "https://dev-jlbrj4wjzo7qtfya.us.auth0.com/",
        tokenSigningAlg: "RS256",
      }),
    );
  }
  res.sendStatus(200);
});

/**
 * Catch all 404 errors, and forward them to the error handler
 */
app.use(function (req: Request, res: Response, next: NextFunction): void {
  // Have the next (generic error handler) process a 404 error
  next(createError(404));
});

/**
 * Generic error handler
 */
app.use((err: HttpError, req: Request, res: Response): void => {
  res.statusMessage = err.message; // Provide the error message

  res.locals.error = req.app.get("env") === "development" ? err : {};

  // Reply with the error
  res.status(err.status || 500);
});

export default app; // Export the backend, so that www.ts can start it
