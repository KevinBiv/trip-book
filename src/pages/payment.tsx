// pages/Payment.tsx
import { useState } from "react";
import { CreditCard, Phone, Shield } from "lucide-react";
import { useLocation, Navigate } from "react-router-dom";
import PaymentForm from "../components/Payment/PaymentForm";
import PaymentSummary from "../components/Payment/PaymentSummary";

const paymentMethods = [
  { id: "credit-card", name: "Credit Card", icon: CreditCard },
  { id: "debit-card", name: "Debit Card", icon: CreditCard },
  { id: "momo", name: "Mobile Money", icon: Phone },
];

export default function Payment() {
  const [selectedMethod, setSelectedMethod] = useState("credit-card");
  const location = useLocation();

  // Redirect if no payment data is present
  if (!location.state) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            {[
              "Search",
              "Select Bus",
              "Choose Seat",
              "Payment",
              "Confirmation",
            ].map((step, index) => (
              <div key={step} className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    index <= 3 ? "bg-primary-600 text-white" : "bg-gray-200"
                  }`}
                >
                  {index + 1}
                </div>
                <span className="text-sm mt-2">{step}</span>
              </div>
            ))}
          </div>
          <div className="relative mt-2">
            <div
              className="absolute top-0 left-0 h-1 bg-primary-600"
              style={{ width: "80%" }}
            />
            <div className="h-1 bg-gray-200 w-full" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Payment Methods */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">
                Select Payment Method
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {paymentMethods.map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setSelectedMethod(method.id)}
                    className={`p-4 rounded-lg border-2 flex items-center space-x-3 transition-colors ${
                      selectedMethod === method.id
                        ? "border-primary-600 bg-primary-50"
                        : "border-gray-200 hover:border-primary-200"
                    }`}
                  >
                    <method.icon
                      className={`h-6 w-6 ${
                        selectedMethod === method.id
                          ? "text-primary-600"
                          : "text-gray-400"
                      }`}
                    />
                    <span
                      className={
                        selectedMethod === method.id
                          ? "text-primary-600"
                          : "text-gray-600"
                      }
                    >
                      {method.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Payment Form */}
            <PaymentForm paymentMethod={selectedMethod} />

            {/* Security Notice */}
            <div className="bg-primary-50 rounded-lg p-4 flex items-start space-x-3">
              <Shield className="h-5 w-5 text-primary-600 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-primary-800">
                  Secure Payment
                </h4>
                <p className="text-sm text-primary-600 mt-1">
                  Your payment information is encrypted and secure. We never
                  store your payment details.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <PaymentSummary />
          </div>
        </div>
      </div>
    </div>
  );
}
