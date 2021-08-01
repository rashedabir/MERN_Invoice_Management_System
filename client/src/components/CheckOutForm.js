import React from "react";
import { ElementsConsumer, CardElement } from "@stripe/react-stripe-js";
import { toast } from "react-toastify";

import CardSection from "./CardSection";
class CheckOutForm extends React.Component {
  handleSubmit = async (event) => {
    event.preventDefault();

    const { stripe, elements } = this.props;
    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    const result = await stripe.createToken(card);
    if (result.error) {
      console.log(result.error.message);
      toast.error("Payment Error");
    } else {
      console.log(result.token);
      toast.success("Payment Success");
    }
  };

  render() {
    return (
      <div className="cardcontainer">
        <form onSubmit={this.handleSubmit}>
          <CardSection />
          <button disabled={!this.props.stripe} className="btn-pay">
            Pay Now
          </button>
        </form>
      </div>
    );
  }
}

export default function InjectedCheckoutForm() {
  return (
    <ElementsConsumer>
      {({ stripe, elements }) => (
        <CheckOutForm stripe={stripe} elements={elements} />
      )}
    </ElementsConsumer>
  );
}
