

import { Sequelize } from "sequelize";
import permittypelists from "../model/permittypelist.model.js";
import permitblocks from "../model/permitblocks.model.js";
import permitsafetyquestions from "../model/permitsafetyquestions.model.js";
import permittypesafetymeasures from "../model/permittypesafetymeasures.model.js";
import permitlotoassets from "../model/permitlotoassets.model.js";
import permitisolatedassetcategories from "../model/permitisolatedassetcategories.model.js";
import permitemployeelists from "../model/permitemployeelists.model.js";
import permitassetlists from "../model/permitassetlists.model.js";

import permits from "../model/permits.model.js";

import { Op, QueryTypes } from "sequelize";
import { getCurrentTime } from "../../../utility/common.js";


export const permitTypeListDemo = async (req, res) => {
    // this is not right way to code in orm.
    const facility_id = req.params.FacilityId;
    console.log("Permit Type List");
    let sql = `SELECT DISTINCT PTW_Type_id, PTW_Type_Title FROM fleximc_ptw_type_list WHERE Facility_id = '46' AND PTW_Type_status = 1`;
    const result = await runQuery(SELECT, sql);
    console.log(result);
    res.send(result);

}


// start here.

export const permitTypeList = async (req, res) => {
    // console.log("permitTypeList checking");

    const { facilityId, status } = req.body;

    const result = await permittypelists.findAll({
        where: {
            facilityId: facilityId,
            status: status
        }
    });

    res.send(result);

}


export const permitCreate = async (req, res) => {

    console.log("permitCreate checking ...");

    const {

        ptwblockId, ptwtypeId, ptwcode, ptwHWId, ptwstartDate, ptwendDate, ptwtitle, ptwdescription, ptwfacilityId,
        ptwempId, ptwstatus, block_id, assetId, createdByAssetlist, updatedByAssetlist,
        assetCategoryId, createdByIsolatedAsset, updatedByIsolatedAsset, normalisedStatus, normalised_date,
        Loto_Asset_id, Loto_Key, lotoRemovedStatus, lotoRemovedDate, employeeId, createdByEmployee,
        updatedByEmployee, empStatus, responsibility, isCustomEmployee,
        safetyMeasureValue, safetyMeasureId, ptwIsolation, ptwlockSrNo, ptwtagSrNo, ptwLOTOStatus,
        safetyTitle, safetyDiscription, safetyInput, safetyRequired, createdBySM, updatedBySM

    } = req.body;

    const permit = {
        code: ptwcode, typeId: ptwtypeId, title: ptwtitle, description: ptwdescription,
        facilityId: ptwfacilityId, blockId: ptwblockId, empId: ptwempId, status: ptwstatus,
        startDate: ptwstartDate, endDate: ptwendDate, Isolation: ptwIsolation,
        lockSrNo: ptwlockSrNo, tagSrNo: ptwtagSrNo, LOTOStatus: ptwLOTOStatus,
    };

    console.log(JSON.stringify(permit));

    let permitResult = await permits.create(permit);

    const ptwId = permitResult.id;
    console.log("ptwId:", ptwId);
    permitResult.blockId;
    res.send(permitResult);

    // console.log(JSON.stringify(permitResult));
    //LOTOId use with update.

    let permitupdate = await permits.update({
        LOTOStatus: ptwLOTOStatus, LOTOId: ptwId, LOTOCode: ptwId,
        HWId: ptwHWId, jobId: ptwId, TBTId: ptwId, Isolation: ptwIsolation
    },
        {
            where: {
                id: ptwId
            }
        }
    );


    let permitBlockResult = await permitblocks.create({
        ptw_id: ptwId, block_id: block_id
    });

    console.log(permitBlockResult);

    let permitAssetListResult = await permitassetlists.create({
        ptwId: ptwId, assetId: assetId, createdBy: createdByAssetlist,
        updatedBy: updatedByAssetlist
    });


    console.log(permitAssetListResult);

    let permitisolatedAssetCategoriesResult = await permitisolatedassetcategories.create({
        permitId: ptwId, assetCategoryId: assetCategoryId, createdBy: createdByIsolatedAsset,
        normalisedStatus: normalisedStatus, normalisedDate: normalised_date, updatedBy: updatedByIsolatedAsset
    });

    console.log(permitisolatedAssetCategoriesResult);

    let permitLotoAssetsResult = await permitlotoassets.create({

        PTW_id: ptwId, Loto_Key: Loto_Key, Loto_Asset_id: Loto_Asset_id,
        lotoRemovedStatus: lotoRemovedStatus, lotoRemovedDate: lotoRemovedDate

    });

    console.log(permitLotoAssetsResult);

    let permitEmployeelistsResult = await permitemployeelists.create({
        pwtId: ptwId, employeeId: employeeId, createdBy: createdByEmployee,
        updatedBy: updatedByEmployee, responsibility: responsibility, status: empStatus,
        isCustomEmployee: isCustomEmployee
    });

    console.log(permitEmployeelistsResult);

    let permitSafetyQuestions = await permitsafetyquestions.create({
        permitId: ptwId, safetyMeasureValue: safetyMeasureValue,
        safetyMeasureId: safetyMeasureId
    });

    console.log(permitSafetyQuestions);

    let permitTypeSafetyMeasuresResult = await permittypesafetymeasures.create({
        permitTypeId: ptwtypeId, title: safetyTitle, discription: safetyDiscription,
        input: safetyInput, createdBy: createdBySM, updatedBy: updatedBySM,
        required: safetyRequired
    })

    console.log(permitTypeSafetyMeasuresResult);






}

export const permitDetailsPratice = async (req, res) => {

    console.log("permitDetails here..");

    const {
        PTW_Title, PTW_status_bubble, PTW_date, PTW_valid_date, Facility_Name,
        PTW_Code, sitePermitNo, PTW_Type_Title, equipment_selected, Selected_Blocks,
        PTW_Disc, PTW_Isolation_status, PTW_Isolation_status_check,
        PTW_LOTO_status_check, IsolatedAssets, Loto_Assest_List, Employee_Selected, Safety_Measure_ques,
        tbt_data, Non_Routine_Task_Status, risk_data, method_statement_data, job_file_list, ptw_associated_list,
        history, PTW_accepted_by_name, PTW_accepted_date, PTW_Accepted_Sign, PTW_issued_requested_to_Name_C,
        PTW_issued_date_S, PTW_issued_requested_Sign_S, PTW_Attched_To_HOTO, PTW_Approve_requested_to_name_C,
        PTW_Approved_date_S, PTW_Approve_requested_Sign_S, PTW_Completed_By_Name, PTW_Completed_date,
        PTW_Completed_By_Sign, PTW_Cancelled_By_Name, PTW_Cancelled_Date, PTW_Cancelled_By_Sign_S

    } = req.body;



    // res.send("permitDetails");


    const permitDetails = [
        {
            'PTW_title': PTW_Title,
            'PTW_status_bubble': PTW_status_bubble,
            'PTW_date': PTW_date,
            'PTW_valid_date': PTW_valid_date,
            'Facility_Name': Facility_Name,
            'PTW_Code': PTW_Code,
            'sitePermitNo': sitePermitNo,
            'PTW_Type_Title': PTW_Type_Title,
            'equipment_selected': equipment_selected,
            'Selected_Blocks': Selected_Blocks,
            'PTW_Disc': PTW_Disc,
            'PTW_Isolation_status': PTW_Isolation_status,
            'PTW_Isolation_status_check': PTW_Isolation_status_check,
            'PTW_LOTO_status_check': PTW_LOTO_status_check,
            'IsolatedAssets': IsolatedAssets,
            'Loto_Assest_List': Loto_Assest_List,
            'Employee_Selected': Employee_Selected,
            'Safety_Measure_ques': Safety_Measure_ques,
            'tbt_data': tbt_data,
            'Non_Routine_Task_Status': Non_Routine_Task_Status,
            'risk_data': risk_data,
            'method_statement_data': method_statement_data,
            'job_file_list': job_file_list,
            'ptw_associated_list': ptw_associated_list,
            'history': history,
            'PTW_accepted_by_name': PTW_accepted_by_name,
            'PTW_accepted_date': PTW_accepted_date,
            'PTW_Accepted_Sign': PTW_Accepted_Sign,
            'PTW_issued_requested_to_Name_C': PTW_issued_requested_to_Name_C,
            'PTW_issued_date_S': PTW_issued_date_S,
            'PTW_issued_requested_Sign_S': PTW_issued_requested_Sign_S,
            'PTW_Attched_To_HOTO': PTW_Attched_To_HOTO,
            'PTW_Approve_requested_to_name_C': PTW_Approve_requested_to_name_C,
            'PTW_Approved_date_S': PTW_Approved_date_S,
            'PTW_Approve_requested_Sign_S': PTW_Approve_requested_Sign_S,
            'PTW_Completed_By_Name': PTW_Completed_By_Name,
            'PTW_Completed_date': PTW_Completed_date,
            'PTW_Completed_By_Sign': PTW_Completed_By_Sign,
            'PTW_Cancelled_By_Name': PTW_Cancelled_By_Name,
            'PTW_Cancelled_Date': PTW_Cancelled_Date,
            'PTW_Cancelled_By_Sign_S': PTW_Cancelled_By_Sign_S
        },
    ];


    const tasksPermitDetails = [permitDetails];
    console.log(tasksPermitDetails);

    res.send(tasksPermitDetails);
    console.log("Checking ...");
    console.log(Safety_Measure_ques.Safety_Measure_title.length);




}


export const permitDetails = async (req, res) => {
    console.log("permitDetails here now association");

    const { ptwId,typeId } = req.params;
    permits.hasMany(permitblocks, {
        as: 'permitBlocks',
        foreignKey: 'ptw_id'

    });

    permitblocks.belongsTo(permits, {
        foreignKey: 'ptw_id',
    });

    permits.hasMany(permitisolatedassetcategories, {
        as: 'permitIsolatedAssetCategories',
        foreignKey: 'permitId'

    });

    permitisolatedassetcategories.belongsTo(permits, {
        foreignKey: 'permitId'

    });

    permits.hasMany(permitlotoassets, {
        as: 'permitLotoAssets',
        foreignKey: 'PTW_id'

    });

    permitlotoassets.belongsTo(permits, {
        foreignKey: 'PTW_id'
    });

    permits.hasMany(permitemployeelists,{
        as:'permitEmployeeLists',
        foreignKey:'pwtId'
    });

    permitemployeelists.belongsTo(permits,{
        foreignKey:'pwtId'
    });

    permits.hasMany(permitsafetyquestions,{
        as:'permitSafetyQuestions',
        foreignKey:'permitId'
    });
    permitsafetyquestions.belongsTo(permits,{
        foreignKey:'permitId'
    });

    permits.hasMany(permitassetlists,{
        as:'permitAssetLists',
        foreignKey:'ptwId'
    });

    permitassetlists.belongsTo(permits,{
        foreignKey:'ptwId'
    });

    permits.hasMany(permittypesafetymeasures,{
        as:'permitTypeSafetyMeasures',
        foreignKey:'permitTypeId'
    })

    permittypesafetymeasures.belongsTo(permits,{
        foreignKey:'permitTypeId'
    });


    const result = await permits.findAll({
        include: [
            {
                model: permitblocks,
                as: 'permitBlocks',
                required: true
            },
            {
                model: permitisolatedassetcategories,
                as: 'permitIsolatedAssetCategories',
                required: true
            },
            {
                model: permitlotoassets,
                as: 'permitLotoAssets',
                required: true
            },
            {
                model: permitemployeelists,
                as: 'permitEmployeeLists',
                required: true
            },
            {
                model: permitsafetyquestions,
                as: 'permitSafetyQuestions',
                required: true
            },
            {
                model: permitassetlists,
                as: 'permitAssetLists',
                required: true
            }
            // it is work but not have data so we want here empty structure.
            // {
            //     model:permittypesafetymeasures,
            //     as:'permitTypeSafetyMeasures',
            //     where: {permitTypeId : typeId }
            // }
        ],
        where: {
            id: ptwId
        }

    });

    console.log("result==>join is ready");
    console.log(result);
    if (result) {
        res.send(result);
    } else {
        throw { status: "failed", msg: `Sorry something went wrong` };
    }
}

export const permitApprove = async (req,res) => {


    const { Id,approvedStatus,approvedDate,approveRequestedToId,maintenanceId,attachedTo } = req.body;
    console.log(Id,approvedDate,approvedStatus,approveRequestedToId,maintenanceId);

   
    console.log("result==>join is ready permitApprove..");
    console.log("permitApprove");

    const result = await permits.update({
        approvedStatus:approvedStatus,
        approvedDate:approvedDate,
        approveRequestedToId:approveRequestedToId,
        maintenanceId:maintenanceId,
        attachedTo:attachedTo

    },{
        where:{
            id:Id

    }})

    if (result) {
        res.send(result);
    } else {
        throw { status: "failed", msg: `Sorry something went wrong` };
    }

}


export const permitIssue = async (req,res) => {
    
    console.log("permitIssue");
    const { Id,approvedStatus,approvedDate,approveRequestedToId,issuedRequestedToId,
        issuedStatus,maintenanceId,issuedDate,attachedTo
    } = req.body;    

    const result = await permits.update({
        Id:Id,
        approvedStatus:approvedStatus,
        approvedDate:approvedDate,
        approveRequestedToId:approveRequestedToId,
        issuedRequestedToId:issuedRequestedToId,
        issuedStatus:issuedStatus,
        maintenanceId:maintenanceId,
        issuedDate:issuedDate,
        attachedTo:attachedTo
    },{
        where:{
            Id:Id
        }
    });
   
    if (result) {
        res.send(result);
    } else {
        throw { status: "failed", msg: `Sorry something went wrong` };
    }
}

export const permitReject = async (req,res) => {

    console.log("permitReject");
 
    const {Id,issuedRequestedToId,issuedStatus,inchargeRequestedToId,inchargeStatus,approvedStatus,
        approvedDate,approveRequestedToId,maintenanceId,attachedTo
    } = req.body;

    //const result = await permits.update();
    const result = await permits.update({
        
        issuedRequestedToId:issuedRequestedToId,
        issuedStatus:issuedStatus,
        inchargeRequestedToId:inchargeRequestedToId,
        inchargeStatus:inchargeStatus,
        approvedStatus:approvedStatus,
        approvedDate:approvedDate,
        approveRequestedToId:approveRequestedToId,
        maintenanceId:maintenanceId,
        attachedTo:attachedTo
    },{
        where:{
            Id:Id
        }
    });
   
    if (result) {
        res.send(result);
    } else {
        throw { status: "failed", msg: `Sorry something went wrong` };
    }
}


export const permitCancel = async (req,res) =>{

    console.log("Cancel End Point ");
  
    const { Id, issuedRequestedToId, facilityId, issuedStatus, approvedStatus, approvedDate, approveRequestedToId,
        cancelRequestById, cancelRequestStatus, cancelRequestDate,cancelReccomendations,cancelRequestApproveById,
        cancelRequestApproveDate,cancelRequestApproveStatus,inchargeStatus,inchargeDate,inchargeId,inchargeReccomendations
    } = req.body;
   
    const result = await permits.update({
        Id:Id,
        issuedRequestedToId:issuedRequestedToId,
        facilityId:facilityId,
        issuedStatus:issuedStatus,
        approvedStatus:approvedStatus,
        approvedDate:approvedDate,
        approveRequestedToId:approveRequestedToId,
        cancelRequestById:cancelRequestById,
        cancelRequestStatus:cancelRequestStatus,
        cancelRequestDate:cancelRequestDate,
        cancelReccomendations:cancelReccomendations,
        cancelRequestApproveById:cancelRequestApproveById,
        cancelRequestApproveDate:cancelRequestApproveDate,
        cancelRequestApproveStatus:cancelRequestApproveStatus,
        inchargeStatus:inchargeStatus,
        inchargeDate:inchargeDate,
        inchargeId:inchargeId,
        inchargeReccomendations:inchargeReccomendations
    },{
        where:{
            Id:Id
        }
    });
   
    if (result) {
        res.send(result);
    } else {
        throw { status: "failed", msg: `Sorry something went wrong` };
    }

}


export const permitBlocks = async (req, res) => {

    console.log("PermitBlocks checking... ");
    const { block_id } = req.body;
    const result = await permitblocks.findAll({
        where: {
            block_id: block_id
        }
    });

    if (result) {
        res.send(result);
    } else {
        throw { status: "failed", msg: `Sorry something went wrong` };
    }
}

export const permitSafetyQuestions = async (req, res) => {
    console.log("PermitSafetyQuestions checking..");

    console.log(req.body);
    const { PermitId } = req.params;
    // const { PermitId } = req.body;

    const result = await permitsafetyquestions.findAll({
        where: {
            PermitId: PermitId
        }
    });

    if (result) {
        res.send(result);
    } else {
        throw { status: "failed", msg: `Sorry something went wrong` };
    }
}

export const permitSafetyMeasure = async (req, res) => {
    console.log("permitSafetyMeasure checking..");
    const { PermitTypeId } = req.params;
    // const { PermitTypeId } = req.body;

    const result = await permittypesafetymeasures.findAll({
        where: {
            PermitTypeId: PermitTypeId
        }
    });

    if (result) {
        res.send(result);
    } else {
        throw { status: "failed", msg: `Sorry something went wrong` };
    }
}

export const permitLOTOAssets = async (req, res) => {
    console.log("permitLOTOAssets checking ..");
    const { Ptw_Id } = req.params;
    //  const { Ptw_Id } = req.body;

    const result = await permitlotoassets.findAll({
        where: {
            Ptw_Id: Ptw_Id
        }
    });

    if (result) {
        res.send(result);
    } else {
        throw { status: "failed", msg: `Sorry something went wrong` };
    }
}
export const permitIsolatedAssetCategories = async (req, res) => {
    console.log("permitIsolatedAssetCategories checking..");

    const { permitId } = req.params;
    //  const { permitId } = req.body;

    const result = await permitisolatedassetcategories.findAll({
        where: {
            permitId: permitId
        }
    });

    if (result) {
        res.send(result);
    } else {
        throw { status: "failed", msg: `Sorry something went wrong` };
    }
}

export const permitEmployeeLists = async (req, res) => {
    console.log("permitEmployeeLists checking ..");

    const { employeeId } = req.params;
    //  const { employeeId } = req.body;

    const result = await permitemployeelists.findAll({
        where: {
            employeeId: employeeId
        }
    });

    if (result) {
        res.send(result);
    } else {
        throw { status: "failed", msg: `Sorry something went wrong` };
    }
}

export const permitAssetLists = async (req, res) => {
    console.log("permitAssetLists");

    const { assetId } = req.params;
    //  const { assetId } = req.body;

    const result = await permitassetlists.findAll({
        where: {
            assetId: assetId
        }
    });

    if (result) {
        res.send(result);
    } else {
        throw { status: "failed", msg: `Sorry something went wrong` };
    }
}





