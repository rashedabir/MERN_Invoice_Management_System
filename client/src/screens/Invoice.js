import React from "react";
import { Link } from "react-router-dom";

function Invoice() {
  return (
    <div className="container py-5 invoice">
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
              <th scope="col">Data</th>
              <th scope="col">Amount (Net)</th>
              <th scope="col">Amount (Gross)</th>
              <th scope="col">Unpaid Amount (Gross)</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
              <td>
                <i className="fas fa-edit mx-1 text-primary"></i>
                <i className="fas fa-trash-alt mx-1 text-danger"></i>
              </td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
              <td>
                <i className="fas fa-edit mx-1 text-primary"></i>
                <i className="fas fa-trash-alt mx-1 text-danger"></i>
              </td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>Larry the Bird</td>
              <td>@twitter</td>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
              <td>@mdo</td>
              <td>
                <i className="fas fa-edit mx-1 text-primary"></i>
                <i className="fas fa-trash-alt mx-1 text-danger"></i>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Invoice;
