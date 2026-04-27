const express = require("express");
const router = express.Router();
const { addResource, getResources, deleteResource } = require("../controllers/resourceController");
const { protect, authorize } = require("../middleware/authMiddleware");

router.route("/").post(protect, authorize("admin"), addResource).get(protect, getResources);
router.route("/:id").delete(protect, authorize("admin"), deleteResource);

module.exports = router;
