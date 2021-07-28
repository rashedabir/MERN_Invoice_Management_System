const router = require("express").Router();
const customerCtrl = require("../controller/customerCtrl");
const auth = require("../middleware/auth");

router
  .route("/customer")
  .get(auth, customerCtrl.getCustomer)
  .post(auth, customerCtrl.insertCustomer);

router
  .route("/customer/:id")
  .put(auth, customerCtrl.updateCustomer)
  .delete(auth, customerCtrl.deleteCustomer);

module.exports = router;
