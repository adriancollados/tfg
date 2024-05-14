const router = require("express").Router();
const paymentController =require("../controllers/payment-controllers");
const { isAuthenticated } = require("../utils/auth");



router.post('/payment', isAuthenticated, paymentController.makePayment);


module.exports = router;