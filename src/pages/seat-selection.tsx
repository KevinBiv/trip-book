import { useState } from "react";
import SeatMap from "../components/SeatSelection/SeatMap";
import PassengerDetails from "../components/SeatSelection/PassengerDetails";
import BookingSummary from "../components/SeatSelection/BookingSummary";

const busDetails = {
  operator: "GreenLine Express",
  from: "New York",
  to: "Boston",
  date: "Wed, 15 Mar 2024",
  departureTime: "10:00 AM",
  arrivalTime: "2:30 PM",
  price: 45,
};

export default function SeatSelection() {
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

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
                    index <= 2 ? "bg-primary-600 text-white" : "bg-gray-200"
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
              style={{ width: "60%" }}
            />
            <div className="h-1 bg-gray-200 w-full" />
          </div>
        </div>

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
              busDetails={busDetails}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
