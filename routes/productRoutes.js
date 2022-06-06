const express = require("express");
const router = express.Router();
const { getProductReview } = require("../controllers/productController.js");

router.post('/', getProductReview)

module.exports = router;
