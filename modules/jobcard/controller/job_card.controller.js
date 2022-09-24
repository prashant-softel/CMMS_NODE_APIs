import { Op, Sequelize } from "sequelize";
import {
  JC_OPEN,
  JC_APPROVE,
  JC_AUTO_APPROVE,
  JC_Carry_Forward,
  JC_CLOSE,
  JC_REJECT,
  JC_PTW_TIMEOUT,
  JC_NO_CARRY_FORWARD,
  httpStatusCodes,
} from "../utility/constant.js";
import jobs from "../model/jobs.model.js";
import permit from "../model/permits.model.js";
import permitassetlists from "../model/permitassetlists.model.js";
import jobCard from "../model/job_card.model.js";
import EmpDetails from "../model/employee_details.model.js";
import assetCategory from "../model/asset_category.model.js";
import jobMappingAssets from "../model/job_mapping_assets.model.js";
import permitlotoassets from "../model/permitlotoasset.model.js";
import permitisolatedassets from "../model/permitisolatedasset.model.js";
import jobCardFiles from "../model/job_card_files.model.js";
import historyTable from "../model/history_table.model.js";
import workTypeAssociatedToJob from "../model/work_type_associated_to_job.model.js";
import jobWorkType from "../model/job_work_type.model.js";
import jobCardAssociatedStandardAction from "../model/job_card_associated_standard_action.model.js";
import standardActions from "../model/standard_actions.model.js";
// import Api404Error from "../utility/404Error.js";
// import assetCatJobMapping from "../model/assetCatJobMap.model.js";

jobs.hasOne(jobCard);
jobCard.belongsTo(jobs, { targetKey: "id", foreignKey: "jobId" });

jobs.hasOne(permit, { foreignKey: "jobId" });
permit.belongsTo(jobs, { foreignKey: "jobId" });

jobs.hasMany(jobMappingAssets, { foreignKey: "jobId" });
jobMappingAssets.belongsTo(jobs, { foreignKey: "jobId" });

// jobs.hasOne(assetCategory);
// assetCategory.belongsTo(jobs);

/* This creates a foreign key called `job_id` in the source model (jobCard)
 which references the `id` field from the target model (jobs) and same for the 
 rest of the models. */

jobCard.hasMany(historyTable, { targetKey: "id", foreignKey: "moduleRefId" });
historyTable.belongsTo(jobCard, {
  targetKey: "id",
  foreignKey: "moduleRefId",
});

permit.hasMany(jobCard, { targetKey: "id", foreignKey: "PTW_id" });
jobCard.belongsTo(permit, { targetKey: "id", foreignKey: "PTW_id" });

permit.hasMany(permitassetlists, { foreignKey: "PTW_id" });
permitassetlists.belongsTo(permit, { foreignKey: "PTW_id" });

// assetCategory.belongsToMany(jobMappingAssets, {
//   through: assetCatJobMapping,
//   foreignKey: "assetCategoryId",
// });
// jobMappingAssets.belongsToMany(assetCategory, {
//   through: assetCatJobMapping,
//   foreignKey: "jobAssetId",
// });
// jobMappingAssets.hasMany(assetCategory, { foreignKey: "assetCategoryId" });
// assetCategory.belongsTo(jobMappingAssets, { foreignKey: "assetCategoryId" });
assetCategory.hasMany(jobMappingAssets, { foreignKey: "assetCategoryId" });
jobMappingAssets.belongsTo(assetCategory, { foreignKey: "assetCategoryId" });

assetCategory.hasMany(jobWorkType, { foreignKey: "equipmentCat" });
jobWorkType.belongsTo(assetCategory, { foreignKey: "equipmentCat" });

jobWorkType.hasMany(workTypeAssociatedToJob, { foreignKey: "workTypeId" });
workTypeAssociatedToJob.belongsTo(jobWorkType, { foreignKey: "workTypeId" });

standardActions.hasMany(jobCardAssociatedStandardAction, {
  foreignKey: "standardActionId",
});
jobCardAssociatedStandardAction.belongsTo(standardActions, {
  foreignKey: "standardActionId",
});
// assetCategory.hasMany(assetCatJobMapping);
// assetCatJobMapping.belongsTo(assetCategory /*, { targetKey: "name" }*/);
// jobMappingAssets.hasMany(assetCatJobMapping);
// assetCatJobMapping.belongsTo(jobMappingAssets /*, { targetKey: "jobId" }*/);

// permitassetlists.hasOne(jobCard);
// jobCard.belongsTo(permitassetlists);

/* Showing Job Card List by Selecting Date */ /* Show All Job Cards Within Selected Dates */

export const jobCardDateSelectionList = async (req, res) => {
  console.log(req.body);
  const { Start_Date, End_Date } = req.body;
  console.log(Start_Date);
  console.log(End_Date);
  const startedDate = new Date(Start_Date);
  const endDate = new Date(End_Date);

  jobCard
    .findAll({
      where: {
        [Op.and]: {
          JC_Status: 1,
          JC_Added_Date: {
            // [Op.between]: { Does not work, not supported by Sequelize
            //   startedDate,
            //   endDate,
            // },
            [Op.and]: {
              /* Alternative to above example */
              [Op.gte]: startedDate,
              [Op.lte]: endDate,
            },
          },
        },
      },
    })
    .then((result) => {
      if (result === []) {
        throw new Error("Not Found");
      } else {
        res.send(result);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

// Get Job Card Details

export const jobCardList = async (req, res) => {
  const { JC_Status, Start_Date, End_Date } = req.body;
  // const { JC_Status } = req.body;
  const startedDate = new Date(Start_Date);
  const endDate = new Date(End_Date);

  // query = `SELECT job.job_title, job.job_description, job.job_created_by, ptw.id, ptw.PTW_Code, ptw.PTW_Disc, ptw.PTW_Type_Title, ptw.Facility_Name, ptw.Facility_Code, ptw.PTW_site_permit_number, ptw.PTW_Block_Name, jobcard.PTW_id, jobcard.JC_id, jobcard.id as JobCardID, jobcard.job_id, jobcard.JC_Carry_Forward, jobcard.JC_Status, jobcard.JC_title, jobcard.JC_Done_Discription, jobcard.JC_Issue_By_Name, jobcard.JC_Start_By_id, jobcard.JC_Start_By_Name, jobcard.JC_Approved_By_Name, jobcard.JC_End_By_Name, jobcard.JC_Issue_By_id, jobcard.Facility_id, asset.PTW_Asset_id, asset.PTW_Asset_name, asset.PTW_Asset_Code from jobcards as jobcard JOIN fleximc_job as job ON jobcard.job_id = job.job_id JOIN fleximc_ptw as ptw ON ptw.id = jobcard.PTW_id JOIN fleximc_ptw_asset_list as asset ON asset.PTW_id = jobcard.PTW_id where jobcard.id = ${id} `;

  // const result = await runQuery(SELECT, query);
  // jobCard
  //   .findAll({
  //     where: {
  //       id: id,
  //     },
  //   })
  //   .then((result) => {
  //     res.send(result);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });

  jobCard
    .findAll({
      where: {
        // Facility_Code: Facility_Code,
        // JC_Status: JC_Status,
        // [Op.and]: {
        //   JC_Status: JC_Status,
        [Op.and]: {
          JC_Status: JC_Status,
          JC_Added_Date: {
            // [Op.between]: {
            //   startedDate,
            //   endDate,
            // },
            [Op.and]: {
              [Op.gte]: startedDate,
              [Op.lte]: endDate,
            },
          },
        },
        // },
      },
      // Maybe Use Sequelize Literals
      // Maybe relation between assetCatJobMapping and Job Model
      include: [
        {
          model: jobs,
          required: true,
          attributes: ["assignedId", "title", "createdAt"],
          include: [
            {
              model: permit,
              attributes: ["permitNumber", "facilityId"],
              required: false,
            },
            {
              model: jobMappingAssets,
              attributes: [["jobId", "assetJobId"]],

              include: [
                {
                  model: assetCategory,
                  attributes: [
                    "name",
                    // Sequelize.fn(
                    //   "concat",
                    //   sequelize.col("name"),
                    //   ", ",
                    //   sequelize.col("name")
                    // ),
                    // "jobAssetCategory",
                  ],
                },
              ],
              group: ["jobMappingAssets.jobId"],
            },
          ],
        },
      ],
    })
    .then((result) => {
      res.send(result);
    });
};

// {
//   model: permit,
//   required: false,
//   attributes: ["permitNumber", "facilityId"],
// },

// Get Job Details

export const jobCardDetails = (req, res) => {
  const { jcId } = req.body;

  jobCard
    .findAll({
      where: { id: jcId },
      attributes: [
        /* Attributes lets you include only selected fields below in result */
        "PTW_id",
        "JC_id",
        "id",
        "jobId",
        "JC_Carry_Forward",
        "JC_Status",
        "JC_title",
        "JC_Done_Description",
        "JC_Issued_By_Name",
        "JC_Start_By_id",
        "JC_Start_By_Name",
        "JC_Approved_By_Name",
        "JC_End_By_Name",
        // "JC_Issue_By_id",
        "Facility_id",
      ],
      // WIthout jobs there are no jobCards so jobs model is the parent of the jobCard model
      include: [
        {
          model: jobs,
          required: true,
          attributes: ["id", "title", "description", "createdBy"],
          include: [
            // Add association of job with permit and vice versa
            {
              model: permit,
              required: true,
              attributes: [
                "id",
                "code",
                "description",
                "title",
                "facilityId",
                "permitNumber",
                "blockId",
              ],
              include: [
                {
                  model: permitassetlists,
                  required: true,
                  attributes: ["id", "assetId"],
                },
              ],
            },
          ],
        },
      ],
    })
    .then((result) => {
      res.send(result);
      console.log(result);

      if (result === null) {
        throw new Api404Error(
          "NOT FOUND",
          httpStatusCodes.NOT_FOUND,
          true,
          "detailed explanation"
        );
      }

      // let PTW_id;
      // let JC_id;
      // let id;
      // let jobId;
      const obj = JSON.parse(JSON.stringify(result));
      const keys = Object.keys(obj);
      for (let i = 0; i < keys.length; i++) {
        const { PTW_id, JC_id, id, jobId } = obj[keys[i]];

        permitLotoAssets(PTW_id);
        permitIsolatedAssets(PTW_id);
        jobCardFilesFetch(JC_id);
        returnJobCardHistory(id, jobId);
        getJobAssociatedWorkType(jobId);
        // getJobAssociatedWorkType(3039);
        getJobCardAssociatedStandardAction(jobId);
      }
    })
    .catch((err) => {
      console.log(err);
      // res.send(err);
      next(err);
    });
};

export const employeeDetails = (req, res) => {
  const { jobCreatedBy } = req.body;

  if (req.body === "") {
    EmpDetails.findAll().then((result) => {
      res.send(result);
    });
  } else {
    EmpDetails.findAll({
      where: { Emp_Email_id: jobCreatedBy },
      attributes: ["Emp_First_Name", "Emp_Last_Name"],
    }).then((result) => {
      res.send(result);
    });
  }
};

export const permitLotoAssets = (ptw_id) => {
  // const { PTW_id } = req.body;

  permitlotoassets
    .findAll({
      where: { PTW_id: ptw_id },
    })
    .then((result) => {
      // res.send(result);
      console.log(result);
    });
};

export const permitIsolatedAssets = (ptw_id) => {
  permitisolatedassets
    .findAll({
      where: {
        permitId: ptw_id,
      },
    })
    .then((result) => {
      console.log(result);
    });
};

export const jobCardFilesFetch = (JC_id) => {
  jobCardFiles
    .findAll({
      where: {
        JC_id: JC_id,
      },
    })
    .then((result) => {
      console.log(result);
    });
};

export const returnJobCardHistory = (jcId, job_id) => {
  historyTable
    .findAll({
      where: {
        [Op.and]: {
          moduleRefId: jcId,
          moduleType: 3,
          // jobId: job_id,
        },
      },
      attributes: [
        "approvalStatus",
        "closeCarryForwardStatus",
        "comment",
        "postedBy",
        "postByName",
        "addedTimeStamp",
        "currentLat",
        "currentLong",
      ],
      include: [
        {
          model: jobCard,
          required: true,
          where: { jobId: job_id },
          required: true,
          attributes: [
            "JC_Carry_Forward",
            "JC_Start_By_Name",
            "JC_Issued_By_Name",
            "JC_Rejected_By_Name",
          ],
          include: [
            {
              model: permit,
              attributes: [
                "inchargeId",
                "inchargeStatus",
                "inchargeRequestedToId",
              ],
              required: true,
            },
          ],
        },
      ],
    })
    .then((result) => {
      console.log(result);

      const obj = JSON.parse(JSON.stringify(result));
      const keys = Object.keys(obj);
      for (let i = 0; i < keys.length; i++) {
        const { approvalStatus, closeCarryForwardStatus } = obj[keys[i]];

        console.log(approvalStatus, closeCarryForwardStatus);

        const Status = getJobCardStatus(
          approvalStatus,
          closeCarryForwardStatus
        );
        // const Status = getJobCardStatus(3, 0);
        console.log(Status);
      }
    });
};

export const getJobCardStatus = (approvalStatus, closeCarryForwardStatus) => {
  console.log(approvalStatus, closeCarryForwardStatus);
  let Approval_Status, Status;
  // console.log(JC_NO_CARRY_FORWARD === 0, JC_OPEN === 0);

  if (
    closeCarryForwardStatus === JC_NO_CARRY_FORWARD &&
    approvalStatus === JC_CLOSE
  ) {
    Status = "Closed";
    Approval_Status = "Waiting for Approval";
  } else if (
    (closeCarryForwardStatus === JC_Carry_Forward ||
      closeCarryForwardStatus === JC_NO_CARRY_FORWARD) &&
    approvalStatus === JC_OPEN
  ) {
    Status = "Open";
    Approval_Status = " - Work in Progress";
  } else if (
    closeCarryForwardStatus === JC_Carry_Forward &&
    approvalStatus === JC_CLOSE
  ) {
    Status = "Carry Forward";
    Approval_Status = "Waiting for Approval";
  } else if (approvalStatus === JC_REJECT) {
    if (closeCarryForwardStatus === JC_NO_CARRY_FORWARD) {
      Status = "Closed";
    } else if (closeCarryForwardStatus === JC_Carry_Forward) {
      Status = "Carry Forward";
    }

    Approval_Status = "Rejected";
  } else if (approvalStatus === JC_APPROVE) {
    if (closeCarryForwardStatus === JC_NO_CARRY_FORWARD) {
      Status = "Closed";
    } else if (closeCarryForwardStatus === JC_Carry_Forward) {
      Status = "Carry Forward";
    }
    Approval_Status = "Approved";
  } else if (approvalStatus === JC_AUTO_APPROVE) {
    if (closeCarryForwardStatus === JC_NO_CARRY_FORWARD) {
      Status = "Closed";
    } else if (closeCarryForwardStatus === JC_Carry_Forward) {
      Status = "Carry Forward";
    }
    Approval_Status = "Auto Approved";
  } else if (approvalStatus === JC_PTW_TIMEOUT) {
    Status = "Carry Forward";
    Approval_Status = "Waiting for Approval";
  } else {
    Status = "No";
    Approval_Status = "No";
  }

  // console.log(Status, Approval_Status);
  return Status + " " + Approval_Status;
  // setTimeout(() => {
  //   console.log(`${Status} - ${Approval_Status}`);
  // }, 5000);
};

export const getJobAssociatedWorkType = (jobId) => {
  workTypeAssociatedToJob
    .findAll({
      where: { jobId: jobId },
      attributes: ["otherWorkTypeName", "workTypeId"],
      include: [
        {
          model: jobWorkType,
          required: false,
          attributes: ["workTypeName"],
          include: [
            {
              model: assetCategory,
              required: false,
              attributes: ["name"],
            },
          ],
        },
      ],
    })
    .then((result) => {
      console.log(result);
    });
};

export const getJobCardAssociatedStandardAction = (jobId) => {
  // let jcId =
  jobCard
    .findAll({
      where: {
        jobId: jobId,
      },
      attributes: ["id"],
    })
    .then((result) => {
      const obj = JSON.parse(JSON.stringify(result));
      const keys = Object.keys(obj);
      let res;
      for (let i = 0; i < keys.length; i++) {
        const { id } = obj[keys[i]];

        res = id;
      }
      return res;
    })
    .then((result) => {
      let res;
      jobCardAssociatedStandardAction
        .findAll({
          where: {
            jcId: result,
          },
          attributes: ["standardActionId", "otherStandardActionName"],
          include: [
            {
              model: standardActions,
              required: false,
              attributes: ["standardAction"],
            },
          ],
        })
        .then((result) => {
          res = result;
        });
      return res;
    })
    .then((result) => {
      console.log(result);
    });
};
// jobCardAssociatedStandardAction
//   .findAll({
//     where: {
//       jcId: jcId,
//     },
//     attributes: ["standardActionId", "otherStandardActionName"],
//     include: [
//       {
//         model: standardActions,
//         required: false,
//         attributes: ["standardAction"],
//       },
//     ],
//   })
// .then((result) => {
//   console.log(result);
// });
