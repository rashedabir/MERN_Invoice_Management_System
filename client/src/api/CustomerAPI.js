import { useEffect, useState } from "react";
import axios from "axios";

function CustomerAPI(token) {
  const [customer, setCustomer] = useState([]);
  const [callback, setCallback] = useState(false);

  useEffect(() => {
    const getCustomer = async () => {
      const res = await axios.get("/api/customer", {
        headers: { Authorization: token },
      });
      setCustomer(res.data);
    };
    getCustomer();
  }, [callback, token]);

  return {
    customer: [customer, setCustomer],
    callback: [callback, setCallback],
  };
}

export default CustomerAPI;
