const { validationResult } = require("express-validator");
const Invoice = require("../models/invoiceModel");

const invoiceCtrl = {
  getInvoices: async (req, res) => {
    try {
      const invoice = await Invoice.find({ user: req.user.id });
      res.json(invoice);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  insertInvoice: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      name,
      address,
      country,
      header,
      number,
      invoiceDate,
      duaDate,
      delivaryDate,
      reference,
      zip,
      products,
      total,
    } = req.body;

    try {
      const newInvoice = new Invoice({
        user: req.user.id,
        name,
        address,
        country,
        header,
        number,
        invoiceDate,
        duaDate,
        delivaryDate,
        reference,
        zip,
        products,
        total,
      });
      const invoice = await newInvoice.save();

      res.json(invoice);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  updateInvoice: async (req, res) => {
    const {
      name,
      address,
      country,
      header,
      number,
      invoiceDate,
      duaDate,
      delivaryDate,
      reference,
      zip,
      products,
      total,
    } = req.body;
    const invoiceFields = {
      name,
      address,
      country,
      header,
      number,
      invoiceDate,
      duaDate,
      delivaryDate,
      reference,
      zip,
      products,
      total,
    };

    try {
      let invoice = await Invoice.findById(req.params.id);
      if (!invoice) return res.status(404).json({ msg: "Invoice not found" });
      // Make sure user owns the guest
      if (invoice.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: "Not authorised" });
      }
      invoice = await Invoice.findByIdAndUpdate(
        req.params.id,
        { $set: invoiceFields },
        { new: true }
      );
      res.send(invoice);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  deleteImvoice: async (req, res) => {
    try {
      let invoice = await Invoice.findById(req.params.id);
      if (!invoice) return res.status(404).json({ msg: "Invoice not found" });
      // check if user owns the guest
      if (invoice.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: "Not authorised" });
      }
      await Invoice.findByIdAndRemove(req.params.id);
      res.send("Invoice Removed successfully");
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

module.exports = invoiceCtrl;
