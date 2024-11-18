import { useState } from "react";
import {
  Wifi,
  Coffee,
  ChevronDown,
  Filter,
  ArrowUpDown,
  Star,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Bus {
  id: string;
  operator: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: number;
  rating: number;
  amenities: string[];
  seatsAvailable: number;
  busType: string;
  operatorLogo: string;
}

const buses: Bus[] = [
  {
    id: "bus1",
    operator: "GreenLine Express",
    departureTime: "10:00 AM",
    arrivalTime: "2:30 PM",
    duration: "4h 30m",
    price: 45,
    rating: 4.5,
    amenities: ["WiFi", "Power Outlets", "Refreshments"],
    seatsAvailable: 12,
    busType: "Luxury",
    operatorLogo:
      "https://images.unsplash.com/photo-1557223562-6c77ef16210f?auto=format&fit=crop&q=80&w=200&h=200",
  },
  {
    id: "bus2",
    operator: "Blue Star",
    departureTime: "11:30 AM",
    arrivalTime: "4:00 PM",
    duration: "4h 30m",
    price: 35,
    rating: 4.2,
    amenities: ["WiFi", "Power Outlets"],
    seatsAvailable: 8,
    busType: "Standard",
    operatorLogo:
      "https://images.unsplash.com/photo-1558981285-6f0c94958bb6?auto=format&fit=crop&q=80&w=200&h=200",
  },
  {
    id: "bus3",
    operator: "Royal Coaches",
    departureTime: "1:00 PM",
    arrivalTime: "5:30 PM",
    duration: "4h 30m",
    price: 55,
    rating: 4.8,
    amenities: ["WiFi", "Power Outlets", "Refreshments", "Entertainment"],
    seatsAvailable: 15,
    busType: "Premium",
    operatorLogo:
      "https://images.unsplash.com/photo-1557223562-6c77ef16210f?auto=format&fit=crop&q=80&w=200&h=200",
  },
];

export default function SearchResults() {
  const navigate = useNavigate();

  const handleClickSelectSeats = () => {
    navigate("/select-seats");
    console.log("Button clicked");
  };

  const [sortBy, setSortBy] = useState("price");
  const [filterBusType, setFilterBusType] = useState("all");

  const filteredBuses = buses.filter(
    (bus) =>
      filterBusType === "all" ||
      bus.busType.toLowerCase() === filterBusType.toLowerCase()
  );

  const sortedBuses = [...filteredBuses].sort((a, b) => {
    if (sortBy === "price") return a.price - b.price;
    if (sortBy === "rating") return b.rating - a.rating;
    if (sortBy === "departure")
      return a.departureTime.localeCompare(b.departureTime);
    return 0;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Search Summary */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              New York to Boston
            </h2>
            <p className="text-gray-600">Wed, 15 Mar • 3 buses available</p>
          </div>
          <button className="bg-primary-100 text-primary-600 px-4 py-2 rounded-lg hover:bg-primary-200 transition-colors">
            Modify Search
          </button>
        </div>
      </div>

      {/* Filters and Sort */}
      <div className="flex justify-between mb-6">
        <div className="flex space-x-4">
          <div className="relative">
            <button className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg shadow-sm hover:bg-gray-50">
              <Filter className="h-4 w-4" />
              <span>Bus Type</span>
              <ChevronDown className="h-4 w-4" />
            </button>
            <div className="absolute top-12 left-0 w-48 bg-white rounded-lg shadow-lg p-2 z-10">
              {["All", "Standard", "Luxury", "Premium"].map((type) => (
                <button
                  key={type}
                  onClick={() => setFilterBusType(type.toLowerCase())}
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
          </div>
        </div>
        <div className="relative">
          <button className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg shadow-sm hover:bg-gray-50">
            <ArrowUpDown className="h-4 w-4" />
            <span>Sort by</span>
            <ChevronDown className="h-4 w-4" />
          </button>
          <div className="absolute top-12 right-0 w-48 bg-white rounded-lg shadow-lg p-2 z-10">
            {[
              { value: "price", label: "Price" },
              { value: "rating", label: "Rating" },
              { value: "departure", label: "Departure Time" },
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => setSortBy(option.value)}
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
        </div>
      </div>

      {/* Bus List */}
      <div className="space-y-4">
        {sortedBuses.map((bus) => (
          <div
            key={bus.id}
            className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="flex space-x-4">
                <img
                  src={bus.operatorLogo}
                  alt={bus.operator}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {bus.operator}
                  </h3>
                  <p className="text-sm text-gray-600">{bus.busType}</p>
                  <div className="flex items-center mt-2">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="ml-1 text-sm text-gray-600">
                      {bus.rating}
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <p className="text-2xl font-bold text-primary-600">
                  ${bus.price}
                </p>
                <p className="text-sm text-gray-500">per person</p>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between">
              <div className="flex space-x-8">
                <div>
                  <p className="text-sm text-gray-500">Departure</p>
                  <p className="text-lg font-semibold">{bus.departureTime}</p>
                </div>
                <div className="flex items-center">
                  <div className="w-24 h-px bg-gray-300 relative">
                    <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-sm text-gray-500">
                      {bus.duration}
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Arrival</p>
                  <p className="text-lg font-semibold">{bus.arrivalTime}</p>
                </div>
              </div>

              <div className="flex items-center space-x-6">
                <div className="flex space-x-2">
                  {bus.amenities.includes("WiFi") && (
                    <div className="p-2 bg-gray-50 rounded-full" title="WiFi">
                      <Wifi className="h-4 w-4 text-gray-600" />
                    </div>
                  )}
                  {bus.amenities.includes("Refreshments") && (
                    <div
                      className="p-2 bg-gray-50 rounded-full"
                      title="Refreshments"
                    >
                      <Coffee className="h-4 w-4 text-gray-600" />
                    </div>
                  )}
                  {bus.amenities.length > 2 && (
                    <div
                      className="p-2 bg-gray-50 rounded-full"
                      title="More amenities"
                    >
                      <span className="text-sm text-gray-600">
                        +{bus.amenities.length - 2}
                      </span>
                    </div>
                  )}
                </div>

                <button
                  onClick={handleClickSelectSeats}
                  className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-500 transition-colors"
                >
                  Select Seats ({bus.seatsAvailable})
                </button>
                {/* <Link
                  to="/select-seats"
                  className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-500 transition-colors"
                >
                  Select Seats
                </Link> */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
