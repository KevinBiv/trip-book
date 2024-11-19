// components/Payment/PaymentSummary.tsx
import { Clock, MapPin, AlertCircle, Bus } from "lucide-react";
import { useLocation } from "react-router-dom";

interface Bus {
  plateNumber: string;
  driver: string;
  type: string;
  status: string;
}

interface Schedule {
  id: string;
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  price: number;
  status: string;
  bus: Bus;
}

interface PaymentState {
  schedule: Schedule;
  selectedSeats: string[];
  formattedDate: string;
  paymentDetails: {
    subtotal: number;
    total: number;
  };
}

export default function PaymentSummary() {
  const location = useLocation();
  const state = location.state as PaymentState;

  // If no state is present, show a fallback UI
  if (!state) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <p className="text-gray-500">No booking information available</p>
      </div>
    );
  }

  const { schedule, selectedSeats, formattedDate, paymentDetails } = state;

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold mb-4">Booking Summary</h3>

      <div className="space-y-4 mb-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="font-medium text-gray-900">
              {schedule.from} → {schedule.to}
            </p>
            <div className="flex items-center text-sm text-gray-600 mt-1">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{schedule.from}</span>
              <span className="mx-2">to</span>
              <span>{schedule.to}</span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">{formattedDate}</p>
            <div className="flex items-center text-sm text-gray-600 mt-1">
              <Clock className="h-4 w-4 mr-1" />
              {schedule.departureTime} - {schedule.arrivalTime}
            </div>
          </div>
        </div>

        {/* Bus Details */}
        <div className="border-t border-gray-200 pt-4">
          <div className="flex items-center text-sm text-gray-600">
            <Bus className="h-4 w-4 mr-1" />
            <span className="font-medium">{schedule.bus.type}</span>
            <span className="mx-2">•</span>
            <span>{schedule.bus.plateNumber}</span>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600">Seat Numbers</span>
            <span className="font-medium">
              {selectedSeats.map((seat) => seat.split("-")[1]).join(", ")}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Passengers</span>
            <span className="font-medium">{selectedSeats.length} Adults</span>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Subtotal</span>
          <span className="text-gray-900">
            {paymentDetails.subtotal.toLocaleString()} Rwf
          </span>
        </div>
        <div className="border-t border-gray-200 pt-2 mt-2">
          <div className="flex justify-between font-medium">
            <span>Total Amount</span>
            <span className="text-primary-600">
              {paymentDetails.total.toLocaleString()} Rwf
            </span>
          </div>
        </div>
      </div>

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
