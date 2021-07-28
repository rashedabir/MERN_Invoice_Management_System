const { validationResult } = require("express-validator");
const Customer = require("../models/customerModel");

const customerCtrl = {
  getCustomer: async (req, res) => {
    try {
      const customer = await Customer.find({ user: req.user.id });
      res.json(customer);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  insertCustomer: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, phone, type, city } = req.body;

    try {
      const newCustomer = new Customer({
        user: req.user.id,
        name,
        phone,
        type,
        city,
      });
      const customer = await newCustomer.save();

      res.json(customer);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  updateCustomer: async (req, res) => {
    const { name, phone, type, city } = req.body;
    const customerFields = { name, phone, type, city };

    try {
      let customer = await Customer.findById(req.params.id);
      if (!customer) return res.status(404).json({ msg: "Customer not found" });
      // Make sure user owns the guest
      if (customer.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: "Not authorised" });
      }
      customer = await Customer.findByIdAndUpdate(
        req.params.id,
        { $set: customerFields },
        { new: true }
      );
      res.send(customer);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  deleteCustomer: async (req, res) => {
    try {
      let customer = await Customer.findById(req.params.id);
      if (!customer) return res.status(404).json({ msg: "Customer not found" });
      // check if user owns the guest
      if (customer.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: "Not authorised" });
      }
      await Customer.findByIdAndRemove(req.params.id);
      res.send("Customer Removed successfully");
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

module.exports = customerCtrl;
