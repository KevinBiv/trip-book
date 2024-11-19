// components/Ticket/Ticket.tsx
import React from "react";
import { QRCodeSVG } from "qrcode.react";
import { Bus, Calendar, MapPin, Clock, User } from "lucide-react";

interface TicketProps {
  ticketId: string;
  from: string;
  to: string;
  date: string;
  time: string;
  passengerName: string;
  seatNumber: string; // Can handle multiple seats as a comma-separated string
  price: number;
  busInfo?: {
    type: string;
    plateNumber: string;
  };
}

export default function Ticket({
  ticketId,
  from,
  to,
  date,
  time,
  passengerName,
  seatNumber,
  price,
  busInfo,
}: TicketProps) {
  const ticketData = JSON.stringify({
    ticketId,
    from,
    to,
    date,
    time,
    passengerName,
    seatNumber,
    busInfo,
  });

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl overflow-hidden shadow-lg">
      {/* Ticket Header */}
      <div className="bg-primary-600 p-4 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Bus className="h-6 w-6" />
            <span className="text-lg font-bold">TripBook</span>
          </div>
          <span className="text-sm">Ticket #{ticketId}</span>
        </div>
        {busInfo && (
          <div className="mt-2 text-sm opacity-80">
            {busInfo.type} • {busInfo.plateNumber}
          </div>
        )}
      </div>

      {/* Ticket Body */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-6">
          <div className="space-y-4">
            {/* Route Info */}
            <div className="flex items-center space-x-3">
              <MapPin className="h-5 w-5 text-primary-600" />
              <div>
                <p className="text-sm text-gray-500">From</p>
                <p className="font-semibold">{from}</p>
              </div>
              <div className="h-px w-8 bg-gray-300 mx-2" />
              <div>
                <p className="text-sm text-gray-500">To</p>
                <p className="font-semibold">{to}</p>
              </div>
            </div>

            {/* Date & Time */}
            <div className="flex space-x-6">
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-primary-600" />
                <div>
                  <p className="text-sm text-gray-500">Date</p>
                  <p className="font-semibold">{date}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-primary-600" />
                <div>
                  <p className="text-sm text-gray-500">Time</p>
                  <p className="font-semibold">{time}</p>
                </div>
              </div>
            </div>

            {/* Passenger Info */}
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5 text-primary-600" />
              <div>
                <p className="text-sm text-gray-500">Passenger</p>
                <p className="font-semibold">{passengerName}</p>
              </div>
            </div>
          </div>

          {/* QR Code */}
          <div className="flex flex-col items-center">
            <QRCodeSVG
              value={ticketData}
              size={100}
              level="H"
              includeMargin={true}
            />
            <p className="mt-2 text-xs text-gray-500">Scan for verification</p>
          </div>
        </div>

        {/* Ticket Footer */}
        <div className="flex justify-between items-center pt-4 border-t border-gray-200">
          <div>
            <p className="text-sm text-gray-500">
              {seatNumber.includes(",") ? "Seat Numbers" : "Seat Number"}
            </p>
            <p className="font-bold text-lg">{seatNumber}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Price</p>
            <p className="font-bold text-lg text-primary-600">
              {price.toLocaleString()} Rwf
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
