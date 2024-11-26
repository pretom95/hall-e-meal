import React, { useState } from "react";
import "./Billing.css";

const Billing = () => {
    const [billingDetails, setBillingDetails] = useState({
        mealsTaken: 60,
        costPerMeal: 5,
        extraCharges: 20,
        discounts: 10,
        totalAmount: 310,
      });
    
      const [transactionHistory, setTransactionHistory] = useState([
        { id: 1, date: "2024-10-01", amount: 300, status: "Paid" },
        { id: 2, date: "2024-09-01", amount: 320, status: "Paid" },
      ]);
    
      const handlePayNow = () => {
        // Simulate redirection to payment gateway
        alert("Redirecting to payment gateway...");
      };
    
      return (
        <div className="billing-page-container">
          {/* Header */}
          <header className="billing-header">
            <h1>Monthly Billing</h1>
            <p>View your meal expenses and payment history.</p>
          </header>
    
          {/* Billing Breakdown */}
          <section className="billing-breakdown">
            <h2>Billing Details</h2>
            <div className="breakdown-row">
              <span>Meals Taken:</span> <span>{billingDetails.mealsTaken}</span>
            </div>
            <div className="breakdown-row">
              <span>Cost per Meal:</span> <span>${billingDetails.costPerMeal}</span>
            </div>
            <div className="breakdown-row">
              <span>Extra Charges:</span> <span>${billingDetails.extraCharges}</span>
            </div>
            <div className="breakdown-row">
              <span>Discounts:</span> <span>-${billingDetails.discounts}</span>
            </div>
            <hr />
            <div className="breakdown-row total">
              <span>Total Amount:</span> <span>${billingDetails.totalAmount}</span>
            </div>
            <button className="pay-now-button" onClick={handlePayNow}>
              Print
            </button>
          </section>
    
          {/* Transaction History */}
          <section className="transaction-history">
            <h2>Transaction History</h2>
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {transactionHistory.map((transaction) => (
                  <tr key={transaction.id}>
                    <td>{transaction.date}</td>
                    <td>${transaction.amount}</td>
                    <td className={transaction.status.toLowerCase()}>
                      {transaction.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </div>
      );
    };

export default Billing;
