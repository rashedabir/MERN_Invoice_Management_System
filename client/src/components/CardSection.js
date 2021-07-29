import React from "react";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
} from "@stripe/react-stripe-js";
const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "blue",
      fontSize: "16px",
      fontFamily: "sans-serif",
      fontSmoothing: "antialiased",
      "::placeholder": {
        color: "#CFD7DF",
      },
    },
    invalid: {
      color: "red",
      ":focus": {
        color: "red",
      },
    },
  },
};

function CardSection() {
  return (
    <label>
      <div className="cardTitle">Fill the Card details</div>
      {/* <CardElement options={CARD_ELEMENT_OPTIONS} /> */}
      <CardNumberElement options={CARD_ELEMENT_OPTIONS} />
      <CardCvcElement options={CARD_ELEMENT_OPTIONS} />
      <CardExpiryElement options={CARD_ELEMENT_OPTIONS} />
    </label>
  );
}

export default CardSection;
