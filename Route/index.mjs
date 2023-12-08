// Route/index.mjs
import fetch from "node-fetch";
import express from "express";
import {
  func,
  searchByAssignee,
  search,
  groupByFilters,
  func2,
  searchByProject,
  searchByProjectKey,
  searchByAssigneeName,
  groupByStatus,
} from "../Controller/index.mjs";

const router = express.Router();
router.get("/Allproject-details", func);
router.get("/Allproject-detailsAll", func2);
router.get("/Allproject-search", search);
router.get("/searchByAssignee-search", searchByAssignee);
router.get("/groupBy-filter", groupByFilters);
router.get("/groupBy-filter-status", groupByStatus);
router.get("/searchby-project", searchByProject);
router.get("/searchby-key", searchByProjectKey);
router.get("/searchby-assigneeName", searchByAssigneeName);

export default router; // Export as default
