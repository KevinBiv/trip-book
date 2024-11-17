import React from "react";
import {
  Calendar,
  MapPin,
  Clock,
  MoreVertical,
  Filter,
  Search,
  Bus,
} from "lucide-react";
import Ticket from "../components/Ticket/Ticket";

interface Booking {
  id: string;
  ticketId: string;
  from: string;
  to: string;
  date: string;
  time: string;
  passengerName: string;
  seatNumber: string;
  price: number;
  status: "upcoming" | "completed" | "cancelled";
}

const mockBookings: Booking[] = [
  {
    id: "1",
    ticketId: "TB12345",
    from: "New York",
    to: "Boston",
    date: "2024-03-15",
    time: "10:30 AM",
    passengerName: "John Doe",
    seatNumber: "A12",
    price: 45,
    status: "upcoming",
  },
  {
    id: "2",
    ticketId: "TB12346",
    from: "Boston",
    to: "New York",
    date: "2024-03-20",
    time: "2:30 PM",
    passengerName: "John Doe",
    seatNumber: "B15",
    price: 45,
    status: "upcoming",
  },
  {
    id: "3",
    ticketId: "TB12347",
    from: "New York",
    to: "Washington DC",
    date: "2024-02-28",
    time: "9:00 AM",
    passengerName: "John Doe",
    seatNumber: "C08",
    price: 60,
    status: "completed",
  },
];

export default function MyBookings() {
  const [selectedBooking, setSelectedBooking] = React.useState<Booking | null>(
    null
  );
  const [activeFilter, setActiveFilter] = React.useState<
    "all" | "upcoming" | "completed" | "cancelled"
  >("all");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-primary-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold">My Bookings</h1>
          <p className="mt-2 text-primary-100">
            Manage your trips and view booking history
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search bookings..."
                className="pl-10 w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              />
            </div>
            {/* Filters */}
            <div className="flex gap-2">
              {(["all", "upcoming", "completed", "cancelled"] as const).map(
                (filter) => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`px-4 py-2 rounded-lg capitalize ${
                      activeFilter === filter
                        ? "bg-primary-600 text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {filter}
                  </button>
                )
              )}
            </div>
          </div>
        </div>

        {/* Bookings List */}
        <div className="space-y-4">
          {mockBookings.map((booking) => (
            <div key={booking.id} className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <div className="h-12 w-12 bg-primary-100 rounded-full flex items-center justify-center">
                    <Bus className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">
                      {booking.from} to {booking.to}
                    </h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {booking.date}
                      </span>
                      <span className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {booking.time}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium
                    ${
                      booking.status === "upcoming"
                        ? "bg-green-100 text-green-800"
                        : ""
                    }
                    ${
                      booking.status === "completed"
                        ? "bg-gray-100 text-gray-800"
                        : ""
                    }
                    ${
                      booking.status === "cancelled"
                        ? "bg-red-100 text-red-800"
                        : ""
                    }
                  `}
                  >
                    {booking.status}
                  </span>
                  <button
                    onClick={() => setSelectedBooking(booking)}
                    className="bg-primary-50 text-primary-600 px-4 py-2 rounded-lg hover:bg-primary-100"
                  >
                    View Ticket
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Ticket Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Ticket Details</h3>
              <button
                onClick={() => setSelectedBooking(null)}
                className="text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Close</span>×
              </button>
            </div>
            <Ticket {...selectedBooking} />
          </div>
        </div>
      )}
    </div>
  );
}
