import React from "react";
import { Calendar, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function SearchTicketForm() {
  const navigate = useNavigate();

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const from = formData.get("from") as string;
    const to = formData.get("to") as string;
    const date = formData.get("date") as string;

    if (!from || !to || !date) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/schedules/search?from=${encodeURIComponent(
          from
        )}&to=${encodeURIComponent(to)}&date=${encodeURIComponent(date)}`
      );

      if (!response.ok) {
        throw new Error("Search failed");
      }

      const searchResults = await response.json();
      console.log("API Response:", searchResults); // Debug log

      navigate("/search-results", {
        state: {
          searchResults, // This contains the schedules array
          from,
          to,
          date,
        },
      });
    } catch (error) {
      console.error("Search error:", error);
      alert("Failed to search schedules. Please try again.");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-xl p-6 max-w-4xl mx-auto -mt-16 relative z-10">
      <form onSubmit={handleSearch}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              From
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                name="from"
                type="text"
                required
                className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                placeholder="Departure city"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              To
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                name="to"
                type="text"
                required
                className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                placeholder="Arrival city"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Date
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                name="date"
                type="date"
                required
                min={new Date().toISOString().split("T")[0]}
                className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>

          <div className="flex items-end">
            <button
              type="submit"
              className="w-full bg-primary-600 text-white p-3 rounded-lg hover:bg-primary-500 transition-colors"
            >
              Search Buses
            </button>
          </div>
        </div>
      </form>

      <div className="mt-8">
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
                  index === 0 ? "bg-primary-600 text-white" : "bg-gray-200"
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
            style={{ width: "20%" }}
          />
          <div className="h-1 bg-gray-200 w-full" />
        </div>
      </div>
    </div>
  );
}
