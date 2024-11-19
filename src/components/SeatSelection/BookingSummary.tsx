// components/SeatSelection/BookingSummary.tsx
import { Clock, MapPin, Bus } from "lucide-react";
import { useNavigate } from "react-router-dom";

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

interface BookingSummaryProps {
  selectedSeats: string[];
  schedule: Schedule;
  formattedDate: string;
}

export default function BookingSummary({
  selectedSeats,
  schedule,
  formattedDate,
}: BookingSummaryProps) {
  const navigate = useNavigate();
  const subtotal = selectedSeats.length * schedule.price;
  // const tax = subtotal * 0.1; // 10% tax
  const total = subtotal;

  const handleProceedToPayment = () => {
    navigate("/payment", {
      state: {
        schedule,
        selectedSeats,
        formattedDate,
        paymentDetails: {
          subtotal,
          // tax,
          total,
        },
      },
    });
  };

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
          <p className="font-medium mb-2">Selected Seats</p>
          {selectedSeats.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {selectedSeats.map((seat) => (
                <span
                  key={seat}
                  className="px-2 py-1 bg-primary-50 text-primary-600 rounded text-sm"
                >
                  Seat {seat.split("-")[1]}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">No seats selected</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">
            Subtotal ({selectedSeats.length} seats)
          </span>
          <span className="text-gray-900">{subtotal.toLocaleString()} Rwf</span>
        </div>
        {/* <div className="flex justify-between text-sm">
          <span className="text-gray-600">Tax (10%)</span>
          <span className="text-gray-900">
            {tax.toFixed(0).toLocaleString()} Rwf
          </span>
        </div> */}
        <div className="border-t border-gray-200 pt-2 mt-2">
          <div className="flex justify-between font-medium">
            <span>Total Amount</span>
            <span className="text-primary-600">
              {total.toFixed(0).toLocaleString()} Rwf
            </span>
          </div>
        </div>
      </div>

      <button
        onClick={handleProceedToPayment}
        disabled={selectedSeats.length === 0}
        className={`w-full mt-6 py-3 rounded-lg text-white font-medium
          ${
            selectedSeats.length > 0
              ? "bg-primary-600 hover:bg-primary-500"
              : "bg-gray-300 cursor-not-allowed"
          } transition-colors`}
      >
        {selectedSeats.length === 0
          ? "Select seats to continue"
          : "Proceed to Payment"}
      </button>
    </div>
  );
}
