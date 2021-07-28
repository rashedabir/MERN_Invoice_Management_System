import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { GlobalState } from "../GlobalState";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function Invoice() {
  const state = useContext(GlobalState);
  const [invoices] = state.invoiceAPI.invoice;
  const [callback, setCallback] = state.invoiceAPI.callback;
  const [token] = state.token;
  const [id, setId] = useState("");

  const deleteInvoice = async (id) => {
    setId(id);
    try {
      if (window.confirm("Do you want to Delete this Invoice?")) {
        await axios.delete(`/api/invoice/${id}`, {
          headers: { Authorization: token },
        });
      }
      setCallback(!callback);
      toast.error("Invoice Deleted");
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };
  return (
    <div className="container py-5 invoice">
      <ToastContainer />
      <Link className="btn btn-outline-primary" to="/addinvoice">
        Add Invoice
      </Link>
      <div className="table-responsive">
        <table class="table table-light my-3 table-striped">
          <thead>
            <tr>
              <th scope="col">Due Date</th>
              <th scope="col">No.</th>
              <th scope="col">Customer / Invoice Holder</th>
              <th scope="col">Date</th>
              <th scope="col">Amount (Net)</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {invoices &&
              invoices.map((invoice) => (
                <tr>
                  <th scope="row">{invoice.duaDate}</th>
                  <td>{invoice.number}</td>
                  <td>{invoice.name}</td>
                  <td>{invoice.invoiceDate}</td>
                  <td>{invoice.total}</td>
                  <td>
                    <i className="fas fa-edit mx-1 text-primary"></i>
                    <i
                      onClick={() => {
                        deleteInvoice(invoice._id);
                      }}
                      className="fas fa-trash-alt mx-1 text-danger"
                    ></i>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Invoice;
