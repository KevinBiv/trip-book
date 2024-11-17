import React, { useState } from "react";
import {
  Phone,
  Loader2,
  QrCode,
  Bus,
  Calendar,
  Clock,
  User,
  MapPin,
  AlertCircle,
} from "lucide-react";

interface BookingDetails {
  ticketId: string;
  from: string;
  to: string;
  date: string;
  time: string;
  passenger: string;
  seatNumber: string;
  price: string;
}

interface MoMoPaymentFormProps {
  onSuccess?: () => void;
  bookingDetails?: BookingDetails;
}

const CustomAlert: React.FC<{ message: string }> = ({ message }) => (
  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative flex items-center space-x-2">
    <AlertCircle className="h-4 w-4" />
    <span className="text-sm">{message}</span>
  </div>
);

const defaultBookingDetails: BookingDetails = {
  ticketId: "TB12345",
  from: "New York",
  to: "Boston",
  date: "2024-03-15",
  time: "10:30 AM",
  passenger: "John Doe",
  seatNumber: "A12",
  price: "$45",
};

const MoMoPaymentForm: React.FC<MoMoPaymentFormProps> = ({
  onSuccess,
  bookingDetails = defaultBookingDetails,
}) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showTicket, setShowTicket] = useState(false);

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
      setShowTicket(true);
      if (onSuccess) onSuccess();
    }, 2000);
  };

  if (showTicket) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="max-w-md mx-auto">
          {/* Digital Ticket */}
          <div className="bg-green-500 text-white p-4 rounded-t-lg flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Bus className="h-6 w-6" />
              <span className="font-semibold text-lg">TripBook</span>
            </div>
            <span>Ticket #{bookingDetails.ticketId}</span>
          </div>

          <div className="border-x border-b rounded-b-lg p-6 space-y-4">
            <div className="flex justify-between items-center">
              <div className="space-y-1">
                <div className="text-gray-500 text-sm">From</div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <span className="font-medium">{bookingDetails.from}</span>
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-gray-500 text-sm">To</div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <span className="font-medium">{bookingDetails.to}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <div className="text-gray-500 text-sm">Date</div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span>{bookingDetails.date}</span>
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-gray-500 text-sm">Time</div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <span>{bookingDetails.time}</span>
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <div className="text-gray-500 text-sm">Passenger</div>
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4 text-gray-400" />
                <span>{bookingDetails.passenger}</span>
              </div>
            </div>

            <div className="flex justify-between items-center pt-4 border-t">
              <div>
                <div className="text-gray-500 text-sm">Seat Number</div>
                <div className="font-medium">{bookingDetails.seatNumber}</div>
              </div>
              <div>
                <div className="text-gray-500 text-sm">Price</div>
                <div className="font-medium text-green-500">
                  {bookingDetails.price}
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center pt-4">
              <QrCode className="h-32 w-32 text-gray-800" />
              <div className="text-sm text-gray-500 mt-2">
                Scan for verification
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
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
    </div>
  );
};

export default MoMoPaymentForm;
