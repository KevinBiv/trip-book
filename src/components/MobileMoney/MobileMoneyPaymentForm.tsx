import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Phone, Loader2, AlertCircle } from "lucide-react";

interface MoMoPaymentFormProps {
  onSuccess?: () => void;
}

const CustomAlert: React.FC<{ message: string }> = ({ message }) => (
  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative flex items-center space-x-2">
    <AlertCircle className="h-4 w-4" />
    <span className="text-sm">{message}</span>
  </div>
);

const MoMoPaymentForm: React.FC<MoMoPaymentFormProps> = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const bookingData = location.state; // Get booking data from location state

  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 10) {
      setPhoneNumber(value);
      setError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (phoneNumber.length !== 10) {
      setError("Please enter a valid 10-digit phone number");
      return;
    }

    setIsLoading(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsLoading(false);
      // Navigate with booking data
      navigate(`/confirmation?paymentMethod=momo`, {
        state: {
          ...bookingData,
          paymentMethod: "momo",
          phoneNumber: phoneNumber,
        },
      });
    }, 2000);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      {/* Payment Amount Display */}
      <div className="mb-6 text-center">
        <p className="text-sm text-gray-600">Total Amount</p>
        <p className="text-2xl font-bold text-primary-600">
          {bookingData.paymentDetails.total.toLocaleString()} Rwf
        </p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-6">
        <div className="space-y-2">
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700"
          >
            MTN Mobile Money Number
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Phone className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="tel"
              id="phone"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
              placeholder="Enter your phone number"
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
            />
          </div>
          {error && <CustomAlert message={error} />}
        </div>

        <div className="space-y-2">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
                Processing...
              </>
            ) : (
              "Pay with MTN/Airtel Mobile Money"
            )}
          </button>
          <p className="text-sm text-gray-500 text-center mt-2">
            You will receive a prompt on your phone to confirm the payment
          </p>
        </div>
      </form>

      {/* Display booking summary */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <h4 className="text-sm font-medium text-gray-900 mb-4">
          Booking Summary
        </h4>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Route</span>
            <span>
              {bookingData.schedule.from} → {bookingData.schedule.to}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Date</span>
            <span>{bookingData.formattedDate}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Time</span>
            <span>{bookingData.schedule.departureTime}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Seats</span>
            <span>
              {bookingData.selectedSeats
                .map((seat: string) => seat.split("-")[1])
                .join(", ")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoMoPaymentForm;
