import express from "express";
import * as permitController from "./controller/permit.controller.js";
const router = express.Router();

router.post('/PermitCreate',permitController.permitCreate);
router.get('/PermitDetailsPratice',permitController.permitDetailsPratice);
router.get('/PermitDetails/:ptwId/:typeId',permitController.permitDetails);
router.put('/PermitIssue/:ptwId/:PTW_ISSUE',permitController.permitIssue);
router.put('/PermitReject/:Id/:PTW_REJECTED_ISSUER',permitController.permitReject);
router.put('/PermitCancel/:Id/:PTW_CANCEL_BY_ISSUER',permitController.permitCancel);
router.put('/PermitApprove/:Id',permitController.permitApprove);
router.get('/PermitTypeList/:FacilityId', permitController.permitTypeList);
router.get('/PermitBlocks/:block_id', permitController.permitBlocks);
router.get('/SafetyListQuestion/:PermitId',permitController.permitSafetyQuestions);
router.get('/SafetyListMeasure/:PermitTypeId',permitController.permitSafetyMeasure);
router.get('/LOTOAssets/:Ptw_Id',permitController.permitLOTOAssets);
router.get('/IsolatedAssetCategories/:permitId',permitController.permitIsolatedAssetCategories);
router.get('/EmployeeLists/:employeeId',permitController.permitEmployeeLists);
router.get('/AssetLists/:assetId',permitController.permitAssetLists);


export default router;