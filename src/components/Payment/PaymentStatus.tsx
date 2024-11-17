import React, { useState, useEffect } from "react";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import Ticket from "../Ticket/Ticket";

interface PaymentStatusProps {
  paymentMethod: string;
  onClose?: () => void;
}

const PaymentStatus: React.FC<PaymentStatusProps> = ({
  paymentMethod,
  onClose,
}) => {
  const [status, setStatus] = useState<"processing" | "success" | "error">(
    "processing"
  );

  // Simulate payment processing
  useEffect(() => {
    const timer = setTimeout(() => {
      setStatus("success");
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // Mock ticket data - in a real app, this would come from your backend
  const ticketData = {
    ticketId: "TB12345",
    from: "New York",
    to: "Boston",
    date: "2024-03-15",
    time: "10:30 AM",
    passengerName: "John Doe",
    seatNumber: "A12",
    price: 45,
  };

  if (status === "processing") {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
          <div className="flex flex-col items-center justify-center space-y-4">
            <Loader2 className="w-16 h-16 text-primary-600 animate-spin" />
            <h3 className="text-xl font-semibold text-gray-900">
              Processing Payment
            </h3>
            <p className="text-gray-500 text-center">
              {paymentMethod === "momo"
                ? "Please check your phone for the MTN Mobile Money prompt"
                : "Please wait while we process your card payment"}
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
          <div className="flex flex-col items-center justify-center space-y-4">
            <XCircle className="w-16 h-16 text-red-500" />
            <h3 className="text-xl font-semibold text-gray-900">
              Payment Failed
            </h3>
            <p className="text-gray-500 text-center">
              {paymentMethod === "momo"
                ? "The Mobile Money transaction was not completed. Please try again."
                : "Your card payment was declined. Please check your card details and try again."}
            </p>
            <button
              onClick={onClose}
              className="mt-4 w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        {/* Success Header */}
        <div className="flex items-center space-x-4 mb-6">
          <CheckCircle className="w-8 h-8 text-green-500" />
          <div>
            <h3 className="text-xl font-semibold text-gray-900">
              Payment Successful!
            </h3>
            <p className="text-sm text-gray-500">Your ticket has been booked</p>
          </div>
        </div>

        {/* Ticket Component */}
        <Ticket {...ticketData} />

        {/* Action Buttons */}
        <div className="mt-6 space-y-3">
          <button className="w-full bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700">
            Download Ticket
          </button>
          <button
            onClick={onClose}
            className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentStatus;
