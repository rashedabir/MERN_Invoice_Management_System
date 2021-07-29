import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import InjectedCheckoutForm from "./CheckOutForm";

function PaymentModule() {
  const stripePromise = loadStripe(
    "pk_test_51JIDmDAcmD9cnihVfUC3Z06F9HJyqVKaUIl6UhDBF5HcbgR8T5PKLnPiDhjJf6wz4H1Lk7ZMiAWAW50Th3VwA6Q600zZG1YIim"
  );

  return (
    <div>
      <div
        className="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Stripe Payment
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {
                <Elements stripe={stripePromise}>
                  <InjectedCheckoutForm />
                </Elements>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentModule;
