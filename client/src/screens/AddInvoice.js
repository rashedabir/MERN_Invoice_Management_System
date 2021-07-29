import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { GlobalState } from "../GlobalState";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory, useParams } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";
import easyinvoice from "easyinvoice";

function AddInvoice() {
  const state = useContext(GlobalState);
  const [token] = state.token;
  const [callback, setCallback] = state.invoiceAPI.callback;
  const [customer] = state.customerAPI.customer;
  const [invoices] = state.invoiceAPI.invoice;
  const [products, setProducts] = useState([
    {
      id: uuidv4(),
      description: "",
      quantity: "",
      price: "",
      tax: "",
      discount: "",
      amount: "",
    },
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
  const [onEdit, setOnEdit] = useState(false);
  const [_id, setId] = useState("");
  const history = useHistory();
  const params = useParams();

  const amounts = products.map((product) => product.amount);
  const total = amounts
    .reduce((acc, item) => (acc += parseFloat(item)), 0)
    .toFixed(2);

  const tax = products.map((product) => product.tax);
  const totalTax = tax
    .reduce((acc, item) => (acc += parseFloat(item)), 0)
    .toFixed(2);

  const salesTax = (total * (totalTax / 100)).toFixed(2);
  const inTotal = (parseFloat(salesTax) + parseFloat(total)).toFixed(2);

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
      {
        id: uuidv4(),
        description: "",
        quantity: "",
        price: "",
        tax: "",
        discount: "",
        amount: "",
      },
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
      if (onEdit) {
        await axios.put(
          `/api/invoice/${_id}`,
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
            total: inTotal,
          },
          {
            headers: { Authorization: token },
          }
        );
        toast.success("Invoices Updated");
        setCallback(!callback);
      } else {
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
            total: inTotal,
          },
          {
            headers: { Authorization: token },
          }
        );
        toast.success("Invoices Added");
        setCallback(!callback);
      }
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };

  useEffect(() => {
    if (params.id) {
      invoices.forEach((invoice) => {
        if (invoice._id === params.id) {
          setOnEdit(true);
          setId(invoice._id);
          setName(invoice.name);
          setAddress(invoice.address);
          setCountry(invoice.country);
          setHeader(invoice.header);
          setNumber(invoice.number);
          setInvoiceDate(invoice.invoiceDate);
          setDueDate(invoice.duaDate);
          setDelevaryDate(invoice.delivaryDate);
          setReference(invoice.reference);
          setProducts(invoice.products);
        }
      });
    } else {
      setOnEdit(false);
      setId("");
      setName("");
      setAddress("");
      setCountry("");
      setHeader("");
      setNumber("");
      setInvoiceDate("");
      setDueDate("");
      setDelevaryDate("");
      setReference("");
      setProducts([
        {
          id: uuidv4(),
          description: "",
          quantity: "",
          price: "",
          tax: "",
          discount: "",
          amount: "",
        },
      ]);
    }
  }, [params.id, invoices]);

  var data = {
    //"documentTitle": "RECEIPT", //Defaults to INVOICE
    //"locale": "de-DE", //Defaults to en-US, used for number formatting (see docs)
    currency: "USD", //See documentation 'Locales and Currency' for more info
    taxNotation: "vat", //or gst
    marginTop: 25,
    marginRight: 25,
    marginLeft: 25,
    marginBottom: 25,
    background: "https://public.easyinvoice.cloud/pdf/sample-background.pdf", //or base64 //img or pdf
    sender: {
      company: "Entkreis",
      address: "Sample Street 123",
      zip: "1234 AB",
      city: "Sampletown",
      country: "USA",
      //"custom1": "custom value 1",
      //"custom2": "custom value 2",
      //"custom3": "custom value 3"
    },
    client: {
      company: "Rashed Corp",
      address: address,
      zip: "4567 CD",
      city: "Los Angeles",
      country: country,
      //"custom1": "custom value 1",
      //"custom2": "custom value 2",
      //"custom3": "custom value 3"
    },
    invoiceNumber: number,
    invoiceDate: invoiceDate,
    products: products,
    bottomNotice: "Kindly pay your invoice within 15 days.",
  };

  const pdfGen = (e) => {
    e.preventDefault();
    easyinvoice.createInvoice(data, function (result) {
      //The response will contain a base64 encoded PDF file
      easyinvoice.download("myInvoice.pdf", result.pdf);
    });
  };

  return (
    <div className="container insert_invoice my-5">
      <ToastContainer />
      <form className="p-3">
        <h4 className="mt-4 mb-4">Add Invoice</h4>
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
                value={name}
              >
                <option selected>select a customer</option>
                {customer.map((customer) => (
                  <option>{customer.name}</option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label for="exampleFormControlTextarea1" className="form-label">
                Address
              </label>
              <textarea
                className="form-control"
                id="exampleFormControlTextarea1"
                rows="3"
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
                value={address}
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
                value={country}
              >
                <option selected>select</option>
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
                  value={header}
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
                  value={number}
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
                  value={invoiceDate}
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
                  value={duaDate}
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
                  value={delivaryDate}
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
                  value={reference}
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
              <div className="col-md-2 mb-3">
                <label for="validationCustom03" className="form-label">
                  Product Name<span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="description"
                  placeholder="Product Name"
                  value={product.description}
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
              <div className="col-md-2 mb-3">
                <label for="validationCustomUsername" className="form-label">
                  Tax<span className="text-danger">*</span>
                </label>
                <div className="input-group has-validation">
                  <input
                    type="number"
                    className="form-control"
                    id="validationCustomUsername"
                    aria-describedby="inputGroupPrepend"
                    required
                    name="tax"
                    onChange={(event) => handleChangeInput(product.id, event)}
                    value={product.tax}
                  />
                  <span className="input-group-text" id="inputGroupPrepend">
                    %
                  </span>
                </div>
              </div>
              <div className="col-md-2 mb-3">
                <label for="validationCustomUsername" className="form-label">
                  Discount<span className="text-danger">*</span>
                </label>
                <div className="input-group has-validation">
                  <input
                    type="number"
                    className="form-control"
                    id="validationCustomUsername"
                    aria-describedby="inputGroupPrepend"
                    required
                    name="discount"
                    onChange={(event) => handleChangeInput(product.id, event)}
                    value={product.discount}
                  />
                  <span className="input-group-text" id="inputGroupPrepend">
                    %
                  </span>
                </div>
              </div>
              <div className="col-md-2 mb-3">
                <label for="validationCustom03" className="form-label">
                  Amount<span className="text-danger">*</span>
                </label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Amount"
                  name="amount"
                  disabled
                  onChange={(event) => handleChangeInput(product.id, event)}
                  value={
                    (product.amount =
                      parseFloat(product.quantity) * parseFloat(product.price) -
                      parseFloat(product.quantity) *
                        parseFloat(product.price) *
                        (parseFloat(product.discount) / 100))
                  }
                />
              </div>
              <div className="mt-2">
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
        <div className="d-flex justify-content-end pt-3 pb-3">
          <button
            className="btn btn-light mx-1"
            onClick={() => {
              history.push("/invoice");
            }}
          >
            Back
          </button>
          <button className="btn btn-outline-warning" onClick={pdfGen}>
            Generate PDF
          </button>
          <button className="btn btn-primary mx-1" onClick={saveInvoice}>
            {onEdit ? "Update Invoice" : "Save Invoice"}
          </button>
          <StripeCheckout stripeKey="pk_test_51JIDmDAcmD9cnihVfUC3Z06F9HJyqVKaUIl6UhDBF5HcbgR8T5PKLnPiDhjJf6wz4H1Lk7ZMiAWAW50Th3VwA6Q600zZG1YIim" />
        </div>
      </form>
      {total === "NaN" ? null : (
        <div className="px-5 py-3 total_invoce d-flex justify-content-between align-items-center">
          <div>
            <h6>Net amount (inc. discount/surcharge)</h6>
          </div>
          <div>
            <h6>{total === "NaN" ? "0.00" : total} USD</h6>
          </div>
        </div>
      )}
      {salesTax === "NaN" ? null : (
        <div className="px-5 py-3 total_invoce d-flex justify-content-between align-items-center">
          <div>
            <h6>Sales Tax {totalTax}%</h6>
          </div>
          <div>
            <h6>{salesTax === "NaN" ? "0.00" : salesTax} USD</h6>
          </div>
        </div>
      )}
      <div className="px-5 py-3 total_invoce d-flex justify-content-between align-items-center">
        <div>
          <h3>Total</h3>
        </div>
        <div>
          <h5>{inTotal === "NaN" ? "0.00" : inTotal} USD</h5>
        </div>
      </div>
    </div>
  );
}

export default AddInvoice;
