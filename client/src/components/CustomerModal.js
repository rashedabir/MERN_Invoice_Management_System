import axios from "axios";
import React, { useContext } from "react";
import { GlobalState } from "../GlobalState";
import { toast } from "react-toastify";

function CustomerModal({
  id,
  name,
  phone,
  city,
  type,
  edit,
  setName,
  setPhone,
  setCity,
  setType,
  setId,
  setEdit,
}) {
  const state = useContext(GlobalState);
  const [token] = state.token;
  const [callback, setCallback] = state.customerAPI.callback;

  const addCustomer = async (e) => {
    e.preventDefault();
    try {
      if (edit) {
        await axios.put(
          `/api/customer/${id}`,
          {
            name: name,
            phone: phone,
            type: type,
            city: city,
          },
          {
            headers: { Authorization: token },
          }
        );
        toast.success("Customer Updated");
        setEdit(false);
        setId("");
        setName("");
        setPhone("");
        setCity("");
        setType("");
      } else {
        setId("");
        setName("");
        setPhone("");
        setCity("");
        setType("");
        await axios.post(
          "/api/customer",
          {
            name: name,
            phone: phone,
            type: type,
            city: city,
          },
          {
            headers: { Authorization: token },
          }
        );
        toast.success("Customer Added");
      }
      setCallback(!callback);
      setId("");
      setName("");
      setPhone("");
      setCity("");
      setType("");
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };
  return (
    <>
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                Add Customer
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label for="exampleInputEmail1" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    value={name}
                  />
                </div>
                <div className="mb-3">
                  <label for="exampleInputEmail1" className="form-label">
                    Phone
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => {
                      setPhone(e.target.value);
                    }}
                    value={phone}
                  />
                </div>
                <div className="mb-3">
                  <label for="exampleInputEmail1" className="form-label">
                    City
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => {
                      setCity(e.target.value);
                    }}
                    value={city}
                  />
                </div>
                <div className="mb-3">
                  <label for="exampleInputEmail1" className="form-label">
                    Type
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => {
                      setType(e.target.value);
                    }}
                    value={type}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={addCustomer}
              >
                {edit ? "Update" : "Save"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CustomerModal;
