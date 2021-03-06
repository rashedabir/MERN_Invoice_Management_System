import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { GlobalState } from "../GlobalState";
import { toast } from "react-toastify";
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
      <Link className="btn btn-primary" to="/addinvoice">
        <i className="fas fa-plus mx-2"></i>
        Add Invoice
      </Link>
      <div className="table-responsive">
        <table class="table table-light my-3 table-striped text-center">
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
                  <th scope="row">
                    <Link to={`/invoice/${invoice._id}`}>
                      {invoice.duaDate}
                    </Link>
                  </th>
                  <td>
                    <Link to={`/invoice/${invoice._id}`}>{invoice.number}</Link>
                  </td>
                  <td>
                    <Link to={`/invoice/${invoice._id}`}>{invoice.name}</Link>
                  </td>
                  <td>{invoice.invoiceDate}</td>
                  <td>{invoice.total}</td>
                  <td>
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
