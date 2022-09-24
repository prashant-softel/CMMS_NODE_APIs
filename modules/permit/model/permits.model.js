import { DataTypes } from "sequelize";
import connection from "../../../utility/connection.js";

const permits = connection.define("Permits", {
    code: DataTypes.STRING,
    typeId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    facilityId: DataTypes.INTEGER,
    blockId: DataTypes.INTEGER,
    empId: DataTypes.INTEGER,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    permitNumber: DataTypes.INTEGER,
    LOTOStatus: DataTypes.INTEGER,
    LOTOId: DataTypes.INTEGER,
    LOTOCode: DataTypes.STRING,
    lockSrNo: DataTypes.STRING,
    tagSrNo: DataTypes.STRING,
    workOrder: DataTypes.STRING,
    HWId: DataTypes.INTEGER,
    jobId: DataTypes.INTEGER,
    TBTId: DataTypes.INTEGER,
    TBTDiscription: DataTypes.STRING,
    Isolation: DataTypes.STRING,
    issuedById: DataTypes.STRING,
    issuedRequestedToId: DataTypes.INTEGER,
    issuedStatus: DataTypes.INTEGER,
    issuedReccomendations: DataTypes.STRING,
    issuedDate: DataTypes.DATE,
    acceptedById: DataTypes.INTEGER,
    acceptedStatus: DataTypes.INTEGER,
    acceptedDate: DataTypes.DATE,
    acceptedRequestedToId: DataTypes.INTEGER,
    approvedById: DataTypes.INTEGER,
    approvedStatus: DataTypes.INTEGER,
    approvedDate: DataTypes.DATE,
    reccomendationsByApprover: DataTypes.STRING,
    approveRequestedToId: DataTypes.INTEGER,
    finalSignature: DataTypes.INTEGER,
    status: DataTypes.INTEGER,
    attachedTo: DataTypes.INTEGER,
    completedDate: DataTypes.DATE,
    completedStatus: DataTypes.INTEGER,
    completedById: DataTypes.INTEGER,
    cancelRequestById: DataTypes.INTEGER,
    cancelRequestStatus: DataTypes.INTEGER,
    cancelRequestDate: DataTypes.DATE,
    cancelRequestApproveById: DataTypes.INTEGER,
    cancelRequestApproveDate: DataTypes.DATE,
    cancelRequestApproveStatus: DataTypes.INTEGER,
    cancelReccomendations: DataTypes.INTEGER,
    lat: DataTypes.DOUBLE,
    long: DataTypes.DOUBLE,
    permittedArea: DataTypes.STRING,
    workingTime: DataTypes.INTEGER,
    maintenanceType: DataTypes.STRING,
    maintenanceId: DataTypes.INTEGER,
    maintenanceStatus: DataTypes.INTEGER,
    inchargeId: DataTypes.INTEGER,
    inchargeRequestedToId: DataTypes.INTEGER,
    inchargeStatus: DataTypes.INTEGER,
    inchargeDate: DataTypes.INTEGER,
    inchargeReccomendations: DataTypes.STRING,
    projectEngineerEmpID: DataTypes.STRING,
    extendStatus: DataTypes.INTEGER,
    extendReason: DataTypes.STRING,
    extendTime: DataTypes.INTEGER,
    extendRejectReason: DataTypes.STRING,
    extendRequestTime: DataTypes.DATE,
    extendApproveTime: DataTypes.DATE,
    extendNoficationSent: DataTypes.INTEGER
},{
    timestamps:false
}
);

export default permits;








