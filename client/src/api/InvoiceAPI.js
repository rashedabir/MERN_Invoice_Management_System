import axios from "axios";
import { useEffect, useState } from "react";

function InvoiceAPI(token) {
  const [invoice, setInvoice] = useState([]);
  const [callback, setCallback] = useState(false);

  useEffect(() => {
    const getInvoices = async () => {
      const res = await axios.get("/api/invoice", {
        headers: { Authorization: token },
      });
      setInvoice(res.data);
    };
    getInvoices();
  }, [callback, token]);

  return {
    invoice: [invoice, setInvoice],
    callback: [callback, setCallback],
  };
}

export default InvoiceAPI;
