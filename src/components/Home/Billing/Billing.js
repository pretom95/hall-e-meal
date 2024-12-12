import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./Billing.css";

const Billing = () => {
  const [billingDetails, setBillingDetails] = useState(null);
  const [error, setError] = useState("");
  const receiptRef = useRef();

  useEffect(() => {
    const fetchBillingDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = { Authorization: `Bearer ${token}` };

        const response = await axios.get("http://localhost:5000/billing/current-month", {
          headers,
        });
        setBillingDetails(response.data);
      } catch (err) {
        console.error("Error fetching billing details:", err);
        setError("Failed to fetch billing details.");
      }
    };

    fetchBillingDetails();
  }, []);

  const handlePrintReceipt = () => {
    const printContent = receiptRef.current;
    const newWindow = window.open("", "_blank", "width=800,height=600");
    newWindow.document.write("<html><head><title>Monthly Receipt</title>");
    newWindow.document.write(
      '<style>body { font-family: Arial, sans-serif; margin: 20px; }</style></head><body>'
    );
    newWindow.document.write(printContent.innerHTML);
    newWindow.document.write("</body></html>");
    newWindow.document.close();
    newWindow.print();
  };

  if (error) {
    return <p>{error}</p>;
  }

  if (!billingDetails) {
    return <p>Loading...</p>;
  }

  // Get the current month and year for the receipt
  const currentDate = new Date();
  const month = currentDate.toLocaleString("default", { month: "long" });
  const year = currentDate.getFullYear();

  return (
    <div className="billing-page-container">
      {/* Billing Details */}
      <section className="billing-breakdown" ref={receiptRef}>
        <h2>Monthly Receipt</h2>
        <div className="breakdown-row">
          <span><b>Month:</b></span> <span>{month} {year}</span>
        </div>
        <div className="breakdown-row">
          <span><b>Total Meals Taken:</b></span> <span>{billingDetails.mealsTaken}</span>
        </div>
        <div className="breakdown-row total">
          <span>Total Amount:</span> <span>{billingDetails.totalAmount} BDT</span>
        </div>
      </section>
      <button className="print-button" onClick={handlePrintReceipt}>
        Print Receipt
      </button>
    </div>
  );
};

export default Billing;
