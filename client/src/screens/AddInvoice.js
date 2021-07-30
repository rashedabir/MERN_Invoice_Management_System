import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { GlobalState } from "../GlobalState";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory, useParams } from "react-router-dom";
import easyinvoice from "easyinvoice";
import PaymentModule from "../components/PaymentModule";
import SendInvoice from "../components/SendInvoice";

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

  var today = new Date();
  var dd = today.getDate();
  var mm = today.toLocaleString("default", { month: "short" });
  var yyyy = today.getFullYear();
  today = dd + "-" + mm + "-" + yyyy;

  const invoiceNumber = 1000 + invoices.length;
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");
  const [header, setHeader] = useState("Invoice " + invoiceNumber);
  const [number, setNumber] = useState("Invoice " + invoiceNumber);
  const [invoiceDate, setInvoiceDate] = useState(today);
  const [duaDate, setDueDate] = useState("");
  const [delivaryDate, setDelevaryDate] = useState("");
  const [reference, setReference] = useState("");
  const [zip, setZip] = useState("");
  const [onEdit, setOnEdit] = useState(false);
  const [_id, setId] = useState("");
  const [countryList, setCountryList] = useState([]);
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
            zip: zip,
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
            zip: zip,
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
          setZip(invoice.zip);
          setProducts(invoice.products);
        }
      });
    } else {
      setOnEdit(false);
      setId("");
      setName("");
      setAddress("");
      setCountry("");
      setHeader("Invoice " + invoiceNumber);
      setNumber("Invoice " + invoiceNumber);
      setInvoiceDate(today);
      setDueDate("");
      setDelevaryDate("");
      setReference("");
      setZip("");
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
  }, [params.id, invoices, invoiceNumber, today]);

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
      zip: zip,
      city: address,
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

  useEffect(() => {
    const getCountry = async () => {
      const res = await axios.get("https://restcountries.eu/rest/v2/all");
      setCountryList(res.data);
    };
    getCountry();
  }, []);

  return (
    <div className="container my-5 insert_invoice">
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
                Address<span className="text-danger">*</span>
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
            <div className="row">
              <div className="mb-3 col-md-6">
                <label for="validationCustom03" className="form-label">
                  Zip Code<span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Zip Code"
                  onChange={(e) => {
                    setZip(e.target.value);
                  }}
                  value={zip}
                />
              </div>
              <div className="mb-3 col-lg-6">
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
                  {countryList &&
                    countryList.map((country) => (
                      <option> {country.name} </option>
                    ))}
                </select>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="row">
              <div className="mb-3 col-md-6">
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
              <div className="mb-3 col-md-6">
                <label for="validationCustom03" className="form-label">
                  Invoice number
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Invoice number"
                  onChange={(e) => {
                    setNumber(e.target.value);
                  }}
                  value={number}
                  disabled
                />
              </div>
              <div className="mb-3 col-md-6">
                <label for="validationCustom03" className="form-label">
                  Date of Invoice
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Invoice header"
                  onChange={(e) => {
                    setInvoiceDate(e.target.value);
                  }}
                  value={invoiceDate}
                  disabled
                />
              </div>
              <div className="mb-3 col-md-6">
                <label for="validationCustom03" className="form-label">
                  Due Date<span className="text-danger">*</span>
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
              <div className="mb-3 col-md-6">
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
              <div className="mb-3 col-md-6">
                <label for="validationCustom03" className="form-label">
                  Reference<span className="text-danger">*</span>
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
              className="py-2 pt-3 my-1 border row align-items-center"
              key={product.id}
            >
              <div className="mb-3 col-md-2">
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
              <div className="mb-3 col-md-2">
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
              <div className="mb-3 col-md-2">
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
              <div className="mb-3 col-md-2">
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
                    placeholder="Tax"
                    name="tax"
                    onChange={(event) => handleChangeInput(product.id, event)}
                    value={product.tax}
                  />
                  <span className="input-group-text" id="inputGroupPrepend">
                    %
                  </span>
                </div>
              </div>
              <div className="mb-3 col-md-2">
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
                    placeholder="Discount"
                    name="discount"
                    onChange={(event) => handleChangeInput(product.id, event)}
                    value={product.discount}
                  />
                  <span className="input-group-text" id="inputGroupPrepend">
                    %
                  </span>
                </div>
              </div>
              <div className="mb-3 col-md-2">
                <label for="validationCustom03" className="form-label">
                  Amount
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
        <div className="pt-3 pb-3 row d-flex justify-content-end">
          <button
            className="col-lg-2 m-1 btn btn-light"
            onClick={() => {
              history.push("/invoice");
            }}
          >
            <i className="fas fa-undo-alt"></i> Back
          </button>
          <button
            className="col-lg-2 m-1 btn btn-outline-warning"
            onClick={pdfGen}
          >
            <i className="fas fa-cogs"></i> Generate PDF
          </button>
          <button
            className="col-lg-2 m-1 btn btn-primary"
            onClick={saveInvoice}
          >
            {onEdit ? (
              <div>
                <i className="fas fa-save"></i> Update Invoice
              </div>
            ) : (
              <div>
                <i className="fas fa-save"></i> Save Invoice
              </div>
            )}
          </button>
          <button
            type="button"
            className="col-lg-2 m-1 btn btn-outline-success"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            <i className="fab fa-stripe-s"></i> Pay with Stripe
          </button>
          <button
            type="button"
            className="col-lg-2 m-1 btn btn-success"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal1"
          >
            Send Invoice <i className="fas fa-paper-plane"></i>
          </button>
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
      <PaymentModule />
      <SendInvoice name={name} />
    </div>
  );
}

export default AddInvoice;
