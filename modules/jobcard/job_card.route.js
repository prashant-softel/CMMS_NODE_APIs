import express from "express";
import * as jobCardController from "../controller/job_card.controller.js";
// import { logError, returnError } from "../utility/errorHandler.js";

const jobCardRouter = express.Router();

jobCardRouter.get("/DateSelectionStatus", jobCardController.jobCardList);
jobCardRouter.get("/DateSelection", jobCardController.jobCardDateSelectionList);
jobCardRouter.get("/JobCardDetails", jobCardController.jobCardDetails);
jobCardRouter.get("/EmployeeDetails", jobCardController.employeeDetails);

// app.use(logError);
// app.use(returnError);

export default jobCardRouter;
