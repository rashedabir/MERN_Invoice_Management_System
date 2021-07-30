import React from "react";
import emailjs, { init } from "emailjs-com";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SendInvoice({ name }) {
  const senEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_hj3k0zc",
        "template_csuns97",
        e.target,
        init("user_NPCWk4iy19PVCtKgYnwXv")
      )
      .then(
        () => {
          toast.success("Email Sent");
        },
        (error) => {
          toast.error(error);
        }
      );
    e.target.reset();
  };

  return (
    <div>
      <div
        className="modal fade"
        id="exampleModal1"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Send Invoice
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <ToastContainer />
              <form onSubmit={senEmail}>
                <div className="mb-3">
                  <label for="exampleFormControlInput1" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="your name"
                    required
                    name="name"
                    value={name}
                    disabled
                  />
                </div>
                <div className="mb-3">
                  <label for="exampleFormControlInput1" className="form-label">
                    Email To
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="exampleFormControlInput1"
                    placeholder="your@email.com"
                    required
                    name="email"
                  />
                </div>
                <div className="mb-3">
                  <label
                    for="exampleFormControlTextarea1"
                    className="form-label"
                  >
                    Your Message
                  </label>
                  <textarea
                    className="form-control"
                    id="exampleFormControlTextarea1"
                    rows="3"
                    required
                    placeholder="Write a short message for your client"
                    name="message"
                  ></textarea>
                </div>
                <div className="mb-4">
                  <input className="form-control" type="file" />
                </div>
                <div className="d-flex justify-content-end">
                  <button type="submit" className="btn btn-primary">
                    Send <i className="fas fa-paper-plane"></i>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SendInvoice;
