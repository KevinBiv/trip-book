// pages/SeatSelection.tsx
import { useState } from "react";
import { useLocation, Navigate } from "react-router-dom";
import SeatMap from "../components/SeatSelection/SeatMap";
import PassengerDetails from "../components/SeatSelection/PassengerDetails";
import BookingSummary from "../components/SeatSelection/BookingSummary";

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

export default function SeatSelection() {
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const location = useLocation();

  // Get schedule data from navigation state
  const schedule = location.state?.schedule as Schedule;
  const searchDate = location.state?.date;

  // Debug log to verify data
  console.log("SeatSelection Data:", { schedule, searchDate });

  if (!schedule || !searchDate) {
    return <Navigate to="/search-results" replace />;
  }

  // Format the date for display
  const formattedDate = new Date(searchDate).toLocaleDateString("en-US", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const handleSeatSelect = (seatId: string) => {
    setSelectedSeats((prev) => {
      if (prev.includes(seatId)) {
        return prev.filter((id) => id !== seatId);
      }
      if (prev.length >= 4) {
        return prev;
      }
      return [...prev, seatId];
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress Steps */}
        {/* ... your existing progress steps code ... */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <SeatMap
              selectedSeats={selectedSeats}
              onSeatSelect={handleSeatSelect}
            />
            <PassengerDetails selectedSeats={selectedSeats} />
          </div>

          <div className="lg:col-span-1">
            <BookingSummary
              selectedSeats={selectedSeats}
              schedule={schedule}
              formattedDate={formattedDate}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
