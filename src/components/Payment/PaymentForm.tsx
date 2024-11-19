import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Calendar, CreditCard, User, Lock } from "lucide-react";
import MoMoPaymentForm from "../MobileMoney/MobileMoneyPaymentForm";

interface PaymentFormProps {
  paymentMethod: string;
}

export default function PaymentForm({ paymentMethod }: PaymentFormProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const bookingData = location.state; // Get the booking data

  // const handlePayment = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   navigate(`/confirmation?paymentMethod=${paymentMethod}`);
  // };

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/confirmation?paymentMethod=${paymentMethod}`, {
      state: bookingData, // Pass the booking data to confirmation page
    });
  };

  if (paymentMethod === "credit-card" || paymentMethod === "debit-card") {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-6">Card Details</h3>
        <form onSubmit={handlePayment} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Card Number
            </label>
            <div className="relative">
              <CreditCard className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="1234 5678 9012 3456"
                className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cardholder Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Name on card"
                className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Expiry Date
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="MM/YY"
                  className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                CVV
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="password"
                  placeholder="123"
                  maxLength={3}
                  className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-6 bg-primary-600 text-white py-3 px-4 rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Pay Now
          </button>
        </form>
      </div>
    );
  }

  if (paymentMethod === "momo") {
    // Don't pass onSuccess anymore, handle navigation in MoMoPaymentForm
    return <MoMoPaymentForm />;
  }

  return null;
}
