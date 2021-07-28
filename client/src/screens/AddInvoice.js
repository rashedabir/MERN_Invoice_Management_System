import axios from "axios";
import React, { useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { GlobalState } from "../GlobalState";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";

function AddInvoice() {
  const state = useContext(GlobalState);
  const [token] = state.token;
  const [callback, setCallback] = state.invoiceAPI.callback;
  const [customer] = state.customerAPI.customer;
  const [products, setProducts] = useState([
    { id: uuidv4(), productName: "", quantity: "", price: "", amount: "" },
  ]);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");
  const [header, setHeader] = useState("");
  const [number, setNumber] = useState("");
  const [invoiceDate, setInvoiceDate] = useState("");
  const [duaDate, setDueDate] = useState("");
  const [delivaryDate, setDelevaryDate] = useState("");
  const [reference, setReference] = useState("");
  const history = useHistory();

  const amounts = products.map((product) => product.amount);
  const total = amounts.reduce((acc, item) => (acc += item), 0);
  const intotal = parseFloat(total).toFixed(2);

  const handleChangeInput = (id, event) => {
    const newInputFields = products.map((i) => {
      if (id === i.id) {
        i[event.target.name] = event.target.value;
      }
      return i;
    });
    setProducts(newInputFields);
  };

  const handleAddFields = (e) => {
    e.preventDefault();
    setProducts([
      ...products,
      { id: uuidv4(), productName: "", quantity: "", price: "", amount: "" },
    ]);
  };

  const handleRemoveFields = (id) => {
    const values = [...products];
    values.splice(
      values.findIndex((value) => value.id === id),
      1
    );
    setProducts(values);
  };

  const saveInvoice = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "/api/invoice",
        {
          name: name,
          address: address,
          country: country,
          header: header,
          number: number,
          invoiceDate: invoiceDate,
          duaDate: duaDate,
          delivaryDate: delivaryDate,
          reference: reference,
          products: products,
          total: total,
        },
        {
          headers: { Authorization: token },
        }
      );

      toast.success("Invoices Added");
      setCallback(!callback);
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };

  return (
    <div className="container insert_invoice my-5">
      <ToastContainer />
      <form className="p-3">
        <h4 className="mt-4">Add Invoice</h4>
        <div className="row">
          <div className="col-lg-6">
            <div className="mb-3">
              <label for="exampleFormControlInput1" className="form-label">
                Customer<span className="text-danger">*</span>
              </label>
              <select
                className="form-select"
                aria-label="Default select example"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              >
                <option selected disabled>
                  select a customer
                </option>
                {customer.map((customer) => (
                  <option>{customer.name}</option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label for="exampleFormControlTextarea1" class="form-label">
                Address
              </label>
              <textarea
                class="form-control"
                id="exampleFormControlTextarea1"
                rows="3"
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
              ></textarea>
            </div>
            <div className="mb-3">
              <label for="exampleFormControlInput1" className="form-label">
                Country<span className="text-danger">*</span>
              </label>
              <select
                className="form-select"
                aria-label="Default select example"
                onChange={(e) => {
                  setCountry(e.target.value);
                }}
              >
                <option selected disabled>
                  select
                </option>
                <option value="usa">usa</option>
              </select>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="row">
              <div className="col-md-6 mb-3">
                <label for="validationCustom03" className="form-label">
                  Invoice header<span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Invoice header"
                  onChange={(e) => {
                    setHeader(e.target.value);
                  }}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label for="validationCustom03" className="form-label">
                  Invoice number<span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Invoice number"
                  onChange={(e) => {
                    setNumber(e.target.value);
                  }}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label for="validationCustom03" className="form-label">
                  Date of Invoice<span className="text-danger">*</span>
                </label>
                <input
                  type="date"
                  className="form-control"
                  placeholder="Invoice header"
                  onChange={(e) => {
                    setInvoiceDate(e.target.value);
                  }}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label for="validationCustom03" className="form-label">
                  Due Date
                </label>
                <input
                  type="date"
                  className="form-control"
                  onChange={(e) => {
                    setDueDate(e.target.value);
                  }}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label for="validationCustom03" className="form-label">
                  Date of Delivary<span className="text-danger">*</span>
                </label>
                <input
                  type="date"
                  className="form-control"
                  onChange={(e) => {
                    setDelevaryDate(e.target.value);
                  }}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label for="validationCustom03" className="form-label">
                  Reference
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Reference"
                  onChange={(e) => {
                    setReference(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <h4 className="mt-4">Products</h4>
        <div className="p-3">
          {products.map((product, index) => (
            <div
              className="row align-items-center border py-2 pt-3 my-1"
              key={product.id}
            >
              <div className="col-md-4 mb-3">
                <label for="validationCustom03" className="form-label">
                  Product Name<span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="productName"
                  placeholder="Product Name"
                  value={product.productName}
                  onChange={(event) => handleChangeInput(product.id, event)}
                />
              </div>
              <div className="col-md-2 mb-3">
                <label for="validationCustom03" className="form-label">
                  Quantity<span className="text-danger">*</span>
                </label>
                <input
                  type="number"
                  className="form-control"
                  name="quantity"
                  placeholder="Quantity"
                  onChange={(event) => handleChangeInput(product.id, event)}
                  value={product.quantity}
                />
              </div>
              <div className="col-md-2 mb-3">
                <label for="validationCustom03" className="form-label">
                  Unit Price<span className="text-danger">*</span>
                </label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Price"
                  name="price"
                  onChange={(event) => handleChangeInput(product.id, event)}
                  value={product.price}
                />
              </div>
              <div className="col-md-3 mb-3">
                <label for="validationCustom03" className="form-label">
                  Amount<span className="text-danger">*</span>
                </label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Amount"
                  name="amount"
                  onChange={(event) => handleChangeInput(product.id, event)}
                  value={
                    (product.amount =
                      parseFloat(product.quantity) * parseFloat(product.price))
                  }
                />
              </div>
              <div className="col-md-1 mt-2">
                <button
                  className="btn btn-outline-danger"
                  disabled={products.length === 1}
                  onClick={() => handleRemoveFields(product.id)}
                  style={{ width: "100%" }}
                >
                  <i className="fas fa-minus-circle"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
        <button
          className="mx-1 btn btn-outline-success"
          onClick={handleAddFields}
        >
          + Add Line Item
        </button>
        <div className="d-flex justify-content-end pt-3">
          <button
            className="btn btn-light mx-1"
            onClick={() => {
              history.push("/invoice");
            }}
          >
            Back
          </button>
          <button className="btn btn-primary mx-1" onClick={saveInvoice}>
            Save Invoice
          </button>
          <StripeCheckout stripeKey="pk_test_51JIDmDAcmD9cnihVfUC3Z06F9HJyqVKaUIl6UhDBF5HcbgR8T5PKLnPiDhjJf6wz4H1Lk7ZMiAWAW50Th3VwA6Q600zZG1YIim" />
        </div>
      </form>
      <div className="px-5 py-3 total_invoce d-flex justify-content-between align-items-center">
        <div>
          <h3>Total</h3>
        </div>
        <div>
          <h5>{intotal ? intotal : "0.00"} USD</h5>
        </div>
      </div>
    </div>
  );
}

export default AddInvoice;
