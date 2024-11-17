import React from "react";
import { AlertCircle } from "lucide-react";

interface SeatProps {
  id: string;
  number: string;
  status: "available" | "selected" | "booked";
  onSelect: (id: string) => void;
}

const Seat: React.FC<SeatProps> = ({ id, number, status, onSelect }) => (
  <button
    onClick={() => status !== "booked" && onSelect(id)}
    disabled={status === "booked"}
    className={`w-10 h-10 rounded-t-lg border-2 ${
      status === "booked"
        ? "bg-gray-200 border-gray-300 cursor-not-allowed"
        : status === "selected"
        ? "bg-primary-100 border-primary-600 text-primary-600"
        : "bg-white border-gray-300 hover:border-primary-600"
    } flex items-center justify-center transition-colors`}
  >
    <span className="text-sm font-medium">{number}</span>
  </button>
);

interface SeatMapProps {
  selectedSeats: string[];
  onSeatSelect: (id: string) => void;
}

export default function SeatMap({ selectedSeats, onSeatSelect }: SeatMapProps) {
  // Generate seats data (5 rows, 4 seats per row)
  const seats = Array.from({ length: 20 }, (_, i) => ({
    id: `seat-${i + 1}`,
    number: `${Math.floor(i / 4) + 1}${String.fromCharCode(65 + (i % 4))}`,
    status:
      i === 2 || i === 7 || i === 15
        ? "booked"
        : selectedSeats.includes(`seat-${i + 1}`)
        ? "selected"
        : "available",
  }));

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold mb-4">Select Your Seats</h3>

      <div className="flex items-center space-x-4 mb-6">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 rounded border-2 border-gray-300 bg-white"></div>
          <span className="text-sm text-gray-600">Available</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 rounded border-2 border-primary-600 bg-primary-100"></div>
          <span className="text-sm text-gray-600">Selected</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 rounded border-2 border-gray-300 bg-gray-200"></div>
          <span className="text-sm text-gray-600">Booked</span>
        </div>
      </div>

      <div className="relative">
        {/* Driver's cabin */}
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
          <div className="w-16 h-8 bg-gray-200 rounded-t-xl flex items-center justify-center">
            <span className="text-xs text-gray-600">Driver</span>
          </div>
        </div>

        {/* Seats grid */}
        <div className="grid grid-cols-4 gap-4 max-w-sm mx-auto">
          {seats.map((seat) => (
            <Seat
              key={seat.id}
              id={seat.id}
              number={seat.number}
              status={seat.status as "available" | "selected" | "booked"}
              onSelect={onSeatSelect}
            />
          ))}
        </div>
      </div>

      <div className="mt-6 flex items-center text-sm text-gray-600">
        <AlertCircle className="h-4 w-4 mr-2" />
        <p>Maximum 4 seats can be selected per booking</p>
      </div>
    </div>
  );
}
