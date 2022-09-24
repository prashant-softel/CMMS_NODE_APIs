// import facilityRoute from "./modules/facility/facility.route.js";
// import employeeRoute from "./modules/employee/employee.route.js";
// import inventoryRoute from "./modules/inventory/inventory.route.js";
import jobRoute from "./modules/jobs/job.route.js";
// import permitRoute  from "./modules/permit/permit.route.js";
// import documentRoute from "./modules/document/document.route.js";

export const appRoutes = (app) => {
  try {
    // app.use("/Facility", facilityRoute);
    // app.use("/Employee", employeeRoute);
    // app.use("/Inventory", inventoryRoute);
    app.use("/Job", jobRoute);
    // app.use("/Permit", permitRoute);
    // app.use("/Document", documentRoute);
  } catch (err) {
    console.log(`Err : ${err}`);
  }
};
