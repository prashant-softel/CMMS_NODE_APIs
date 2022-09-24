import { Sequelize } from "sequelize";

const connection = new Sequelize("softel_cmms", "root", "", {
  host: "localhost",
  dialect: "mysql",
  dialectOptions: { useUTC: false },
  timezone: "+05:30",
});

/**
 * Import Modules here
*/
import JobModel from "../modules/jobs/model/jobs.model.js";
import JobAssociatedWorkTypeModel from "../modules/jobs/model/job_associated_work_type.model.js";
import JobMappingAssetModel from "../modules/jobs/model/job_mapping_assets.model.js";
import JobWorkTypeModel from "../modules/jobs/model/job_work_type.model.js";
import WorkTypeAssociatedToolModel from "../modules/jobs/model/work_type_associated_tool.model.js";
import WorkTypeMasterAssetModel from "../modules/jobs/model/work_type_master_assets.model.js";
import FacilityModel from "../modules/facility/model/facility.model.js";
import AssetCategoryModel from "../modules/inventory/model/asset_category.model.js";
import UserModel from "../modules/employee/model/users.model.js";

/**
 * passing connection object to all modules
*/ 
const Job = JobModel(connection, Sequelize);
const JobAssociatedWorkType = JobAssociatedWorkTypeModel(connection, Sequelize);
const JobMappingAsset = JobMappingAssetModel(connection, Sequelize);
const JobWorkType = JobWorkTypeModel(connection, Sequelize);
const WorkTypeAssociatedTool = WorkTypeAssociatedToolModel(connection, Sequelize);
const WorkTypeMasterAsset = WorkTypeMasterAssetModel(connection, Sequelize);
const Facility = FacilityModel(connection, Sequelize);
const AssetCategory = AssetCategoryModel(connection, Sequelize);
const User = UserModel(connection, Sequelize);

/**
  * Define modules relationship here
*/ 

//Job Table
Job.belongsTo(User, { as: 'creator', foreignKey: "createdBy" });
Job.belongsTo(User, { as: 'updater', foreignKey: "updatedBy" });
Job.belongsTo(User, { as: 'assignee', foreignKey: "assignedId" });
Job.belongsTo(Facility, { as: 'facility', foreignKey: "facilityId" });
Job.belongsTo(Facility, { as: 'block', foreignKey: "blockId" });

//AssetCategory Table
AssetCategory.hasMany(JobWorkType, {foreignKey: "equipmentCategoryId",});

//Facility Table
Facility.hasMany(Job,  { as: 'facility', foreignKey: "facilityId" });
Facility.hasMany(Job,  { as: 'block', foreignKey: "blockId" });

//User Table
User.hasMany(Job, { as: 'creator', foreignKey: "createdBy" });
User.hasMany(Job, { as: 'updater', foreignKey: "updatedBy" });
User.hasMany(Job, { as: 'assignee', foreignKey: "assignedId" });





/**
 * Export Modules
*/ 
export default {
  Job,
  JobAssociatedWorkType,
  JobMappingAsset,
  JobWorkType,
  WorkTypeAssociatedTool,
  WorkTypeMasterAsset,
  Facility,
  AssetCategory,
  User,
};
