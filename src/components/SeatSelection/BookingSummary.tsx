import React from "react";
import { Clock, MapPin } from "lucide-react";

interface BookingSummaryProps {
  selectedSeats: string[];
  busDetails: {
    operator: string;
    from: string;
    to: string;
    date: string;
    departureTime: string;
    arrivalTime: string;
    price: number;
  };
}

export default function BookingSummary({
  selectedSeats,
  busDetails,
}: BookingSummaryProps) {
  const subtotal = selectedSeats.length * busDetails.price;
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + tax;

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold mb-4">Booking Summary</h3>

      <div className="space-y-4 mb-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="font-medium text-gray-900">{busDetails.operator}</p>
            <div className="flex items-center text-sm text-gray-600 mt-1">
              <MapPin className="h-4 w-4 mr-1" />
              {busDetails.from} to {busDetails.to}
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">{busDetails.date}</p>
            <div className="flex items-center text-sm text-gray-600 mt-1">
              <Clock className="h-4 w-4 mr-1" />
              {busDetails.departureTime} - {busDetails.arrivalTime}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-4">
          <p className="font-medium mb-2">Selected Seats</p>
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
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">
            Subtotal ({selectedSeats.length} seats)
          </span>
          <span className="text-gray-900">${subtotal}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Tax (10%)</span>
          <span className="text-gray-900">${tax.toFixed(2)}</span>
        </div>
        <div className="border-t border-gray-200 pt-2 mt-2">
          <div className="flex justify-between font-medium">
            <span>Total Amount</span>
            <span className="text-primary-600">${total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <button
        disabled={selectedSeats.length === 0}
        className={`w-full mt-6 py-3 rounded-lg text-white font-medium
          ${
            selectedSeats.length > 0
              ? "bg-primary-600 hover:bg-primary-500"
              : "bg-gray-300 cursor-not-allowed"
          } transition-colors`}
      >
        Proceed to Payment
      </button>
    </div>
  );
}
