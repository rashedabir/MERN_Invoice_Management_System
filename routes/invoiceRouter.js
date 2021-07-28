const router = require("express").Router();
const invoiceCtrl = require("../controller/invoiceCtrl");
const auth = require("../middleware/auth");

router
  .route("/invoice")
  .get(auth, invoiceCtrl.getInvoices)
  .post(auth, invoiceCtrl.insertInvoice);

router
  .route("/invoice/:id")
  .put(auth, invoiceCtrl.updateInvoice)
  .delete(auth, invoiceCtrl.deleteImvoice);

module.exports = router;
