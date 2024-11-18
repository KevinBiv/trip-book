import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import PaymentStatus from "../components/Payment/PaymentStatus";
import { Home } from "lucide-react";

export default function ConfirmationPage() {
  const [showStatus, setShowStatus] = useState(true);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const paymentMethod = searchParams.get("paymentMethod") || "";

  const handleClose = () => {
    setShowStatus(false);
  };

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
                    index <= 4 ? "bg-primary-600 text-white" : "bg-gray-200"
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
              style={{ width: "100%" }}
            />
            <div className="h-1 bg-gray-200 w-full" />
          </div>
        </div>

        {showStatus ? (
          <PaymentStatus paymentMethod={paymentMethod} onClose={handleClose} />
        ) : (
          <div className="max-w-md mx-auto text-center">
            <div className="bg-white rounded-lg shadow-sm p-8 space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Thank You for Booking with TripBook!
              </h2>
              <p className="text-gray-600">
                Your ticket has been booked successfully. We hope you have a
                pleasant journey.
              </p>
              <button
                onClick={() => navigate("/")}
                className="inline-flex items-center justify-center space-x-2 w-full bg-primary-600 text-white py-3 px-4 rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                <Home className="h-5 w-5" />
                <span>Back to Homepage</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
