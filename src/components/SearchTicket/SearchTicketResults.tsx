import { useState } from "react";
import { ChevronDown, Filter, ArrowUpDown } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

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

export default function SearchResults() {
  const navigate = useNavigate();
  const location = useLocation();
  const [sortBy, setSortBy] = useState<"price" | "departure">("price");
  const [filterBusType, setFilterBusType] = useState("all");
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [showFilterMenu, setShowFilterMenu] = useState(false);

  const { schedules = [] } = location.state?.searchResults || {};

  if (!location.state) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">
            No Search Results
          </h2>
          <p className="text-gray-600 mt-2">
            Please go back and try searching again.
          </p>
        </div>
      </div>
    );
  }

  const filteredSchedules = schedules.filter(
    (schedule: Schedule) =>
      filterBusType === "all" ||
      schedule.bus.type.toLowerCase() === filterBusType.toLowerCase()
  );

  const sortedSchedules = [...filteredSchedules].sort(
    (a: Schedule, b: Schedule) => {
      if (sortBy === "price") return a.price - b.price;
      if (sortBy === "departure")
        return a.departureTime.localeCompare(b.departureTime);
      return 0;
    }
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleSelectSeats = (schedule: Schedule) => {
    // Make sure to pass the complete schedule object and the search date
    navigate("/select-seats", {
      state: {
        schedule, // The complete schedule object from the API
        date: location.state.date,
        from: location.state.from,
        to: location.state.to,
      },
    });
    console.log("Go to seat-selection");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Search Summary */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {location.state.from} to {location.state.to}
            </h2>
            <p className="text-gray-600">
              {formatDate(location.state.date)} • {schedules.length} buses
              available
            </p>
          </div>
          <button
            onClick={() => navigate("/")}
            className="text-primary-600 hover:text-primary-700"
          >
            Modify Search
          </button>
        </div>
      </div>

      {/* Filters and Sort */}
      <div className="flex justify-between mb-6">
        <div className="relative">
          <button
            className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg shadow-sm hover:bg-gray-50"
            onClick={() => setShowFilterMenu(!showFilterMenu)}
          >
            <Filter className="h-4 w-4" />
            <span>Bus Type</span>
            <ChevronDown className="h-4 w-4" />
          </button>
          {showFilterMenu && (
            <div className="absolute top-12 left-0 w-48 bg-white rounded-lg shadow-lg p-2 z-10">
              {["All", "Standard", "Luxury", "Premium"].map((type) => (
                <button
                  key={type}
                  onClick={() => {
                    setFilterBusType(type.toLowerCase());
                    setShowFilterMenu(false);
                  }}
                  className={`w-full text-left px-4 py-2 rounded-md ${
                    filterBusType === type.toLowerCase()
                      ? "bg-primary-50 text-primary-600"
                      : "hover:bg-gray-50"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="relative">
          <button
            className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg shadow-sm hover:bg-gray-50"
            onClick={() => setShowSortMenu(!showSortMenu)}
          >
            <ArrowUpDown className="h-4 w-4" />
            <span>Sort by</span>
            <ChevronDown className="h-4 w-4" />
          </button>
          {showSortMenu && (
            <div className="absolute top-12 right-0 w-48 bg-white rounded-lg shadow-lg p-2 z-10">
              {[
                { value: "price", label: "Price" },
                { value: "departure", label: "Departure Time" },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    setSortBy(option.value as "price" | "departure");
                    setShowSortMenu(false);
                  }}
                  className={`w-full text-left px-4 py-2 rounded-md ${
                    sortBy === option.value
                      ? "bg-primary-50 text-primary-600"
                      : "hover:bg-gray-50"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Schedule List */}
      <div className="space-y-4">
        {sortedSchedules.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <p className="text-gray-600">
              No schedules found for your search criteria.
            </p>
          </div>
        ) : (
          sortedSchedules.map((schedule: Schedule) => (
            <div
              key={schedule.id}
              className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Bus: {schedule.bus.plateNumber}
                  </h3>
                  <p className="text-sm text-gray-600">{schedule.bus.type}</p>
                  <p className="text-sm text-gray-600">
                    Driver: {schedule.bus.driver}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-2xl font-bold text-primary-600">
                    {schedule.price.toLocaleString()} Rwf
                  </p>
                  <p className="text-sm text-gray-500">per person</p>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between">
                <div className="flex space-x-8">
                  <div>
                    <p className="text-sm text-gray-500">Departure</p>
                    <p className="text-lg font-semibold">
                      {schedule.departureTime}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Arrival</p>
                    <p className="text-lg font-semibold">
                      {schedule.arrivalTime}
                    </p>
                  </div>
                </div>

                <button
                  className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-500 transition-colors"
                  // onClick={() => navigate(`/select-seats/${schedule.id}`)}
                  // onClick={() => navigate(`/select-seats`)}
                  onClick={() => handleSelectSeats(schedule)}
                >
                  Select Seats
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
