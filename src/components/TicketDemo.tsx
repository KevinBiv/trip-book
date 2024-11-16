import React from 'react';
import Ticket from './Ticket';

export default function TicketDemo() {
  const sampleTicket = {
    ticketId: "TB12345",
    from: "New York",
    to: "Boston",
    date: "2024-03-15",
    time: "10:30 AM",
    passengerName: "John Doe",
    seatNumber: "A12",
    price: 45
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Sample E-Ticket</h2>
        <Ticket {...sampleTicket} />
      </div>
    </section>
  );
}