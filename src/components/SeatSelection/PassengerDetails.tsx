import React from "react";
import { User } from "lucide-react";

interface PassengerDetailsProps {
  selectedSeats: string[];
}

export default function PassengerDetails({
  selectedSeats,
}: PassengerDetailsProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold mb-4">Passenger Details</h3>

      {selectedSeats.map((seat, index) => (
        <div key={seat} className="mb-6 last:mb-0">
          <div className="flex items-center space-x-2 mb-4">
            <User className="h-5 w-5 text-gray-400" />
            <h4 className="font-medium">
              Passenger {index + 1} - Seat {seat.split("-")[1]}
            </h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                placeholder="Enter full name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Age
              </label>
              <input
                type="number"
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                placeholder="Enter age"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                placeholder="Enter email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone
              </label>
              <input
                type="tel"
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                placeholder="Enter phone number"
              />
            </div>
          </div>
        </div>
      ))}

      {selectedSeats.length === 0 && (
        <p className="text-gray-500 text-center py-4">
          Please select seats to add passenger details
        </p>
      )}
    </div>
  );
}
