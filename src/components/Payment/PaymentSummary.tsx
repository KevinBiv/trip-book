import React from "react";
import { Clock, MapPin, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function PaymentSummary() {
  const navigate = useNavigate();

  const handlePayment = () => {
    navigate("/confirmation");
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold mb-4">Booking Summary</h3>

      <div className="space-y-4 mb-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="font-medium text-gray-900">GreenLine Express</p>
            <div className="flex items-center text-sm text-gray-600 mt-1">
              <MapPin className="h-4 w-4 mr-1" />
              New York to Boston
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Wed, 15 Mar 2024</p>
            <div className="flex items-center text-sm text-gray-600 mt-1">
              <Clock className="h-4 w-4 mr-1" />
              10:00 AM - 2:30 PM
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600">Seat Numbers</span>
            <span className="font-medium">2A, 2B</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Passengers</span>
            <span className="font-medium">2 Adults</span>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Subtotal</span>
          <span className="text-gray-900">$90.00</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Tax (10%)</span>
          <span className="text-gray-900">$9.00</span>
        </div>
        <div className="border-t border-gray-200 pt-2 mt-2">
          <div className="flex justify-between font-medium">
            <span>Total Amount</span>
            <span className="text-primary-600">$99.00</span>
          </div>
        </div>
      </div>

      {/* <button
        onClick={handlePayment}
        className="w-full mt-6 bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-500 transition-colors font-medium"
      >
        Pay $99.00
      </button> */}

      <div className="mt-4 flex items-start space-x-2 text-sm text-gray-500">
        <AlertCircle className="h-5 w-5 text-gray-400 flex-shrink-0" />
        <p>
          By clicking Pay, you agree to our terms and conditions and
          cancellation policy
        </p>
      </div>
    </div>
  );
}
