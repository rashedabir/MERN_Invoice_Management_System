import axios from "axios";
import React, { useContext, useState } from "react";
import CustomerModal from "../components/CustomerModal";
import { GlobalState } from "../GlobalState";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Customer() {
  const state = useContext(GlobalState);
  const [customer] = state.customerAPI.customer;
  const [token] = state.token;
  const [callback, setCallback] = state.customerAPI.callback;
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [type, setType] = useState("");
  const [edit, setEdit] = useState(false);

  const editCustomer = (id, name, phone, city, type) => {
    setId(id);
    setName(name);
    setPhone(phone);
    setCity(city);
    setType(type);
    setEdit(true);
  };

  const deleteCustomer = async (id, name) => {
    try {
      if (window.confirm(`Do You want to delete ${name}`)) {
        await axios.delete(`/api/customer/${id}`, {
          headers: { Authorization: token },
        });
        setCallback(!callback);
        toast.error("Customer Deleted");
      }
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };

  return (
    <div className="container py-5 customer">
      <ToastContainer />
      <button
        className="btn btn-outline-primary"
        type="button"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
      >
        <i className="fas fa-user-plus mx-2"></i>
        Add Customer
      </button>
      <div className="table-responsive">
        <table className="table table-light my-3 table-striped">
          <thead>
            <tr>
              <th scope="col">Type</th>
              <th scope="col">Phone</th>
              <th scope="col">Name</th>
              <th scope="col">City</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {customer
              ? customer.map((customer) => (
                  <tr>
                    <td>{customer.type}</td>
                    <td>{customer.phone}</td>
                    <td>{customer.name}</td>
                    <td>{customer.city}</td>
                    <td>
                      <i
                        className="fas fa-edit mx-1 text-primary"
                        data-bs-toggle="modal"
                        data-bs-target="#staticBackdrop"
                        onClick={() => {
                          editCustomer(
                            customer._id,
                            customer.name,
                            customer.phone,
                            customer.city,
                            customer.type
                          );
                        }}
                      ></i>
                      <i
                        className="fas fa-trash-alt mx-1 text-danger"
                        onClick={() => {
                          deleteCustomer(customer._id, customer.name);
                        }}
                      ></i>
                    </td>
                  </tr>
                ))
              : null}
          </tbody>
        </table>
      </div>
      <CustomerModal
        id={id}
        name={name}
        phone={phone}
        city={city}
        type={type}
        edit={edit}
        setName={setName}
        setPhone={setPhone}
        setCity={setCity}
        setType={setType}
        setId={setId}
        setEdit={setEdit}
      />
    </div>
  );
}

export default Customer;
