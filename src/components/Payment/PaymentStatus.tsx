import React, { useState, useEffect, useRef } from "react";
import { CheckCircle, XCircle, Loader2, Download } from "lucide-react";
import { useLocation } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Ticket from "../Ticket/Ticket";

interface PaymentStatusProps {
  paymentMethod: string;
  onClose?: () => void;
}

const PaymentStatus: React.FC<PaymentStatusProps> = ({
  paymentMethod,
  onClose,
}) => {
  const [status, setStatus] = useState<"processing" | "success" | "error">(
    "processing"
  );
  const [isDownloading, setIsDownloading] = useState(false);
  const ticketRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const bookingData = location.state;

  useEffect(() => {
    const timer = setTimeout(() => {
      setStatus("success");
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // Generate a random ticket ID
  const generateTicketId = () => {
    return "TB" + Math.random().toString(36).substr(2, 6).toUpperCase();
  };

  const ticketData = {
    ticketId: generateTicketId(),
    from: bookingData.schedule.from,
    to: bookingData.schedule.to,
    date: bookingData.formattedDate,
    // Combine departure time for the time field
    time: bookingData.schedule.departureTime,
    // Use "Guest" as default passenger name or get it from form if you have it
    passengerName: "Guest",
    // Use first seat if single, or combine if multiple
    seatNumber: bookingData.selectedSeats
      .map((seat: string) => seat.split("-")[1])
      .join(", "),
    price: bookingData.paymentDetails.total,
    // Optional bus info if you want to use it
    busInfo: {
      type: bookingData.schedule.bus.type,
      plateNumber: bookingData.schedule.bus.plateNumber,
    },
  };

  const handleDownload = async () => {
    if (!ticketRef.current) return;

    try {
      setIsDownloading(true);

      const canvas = await html2canvas(ticketRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
        width: ticketRef.current.offsetWidth,
        height: ticketRef.current.offsetHeight,
        x: -10,
        y: -10,
        windowWidth: ticketRef.current.offsetWidth + 20,
        windowHeight: ticketRef.current.offsetHeight + 20,
      });

      const imgWidth = 210;
      const pageHeight = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      const pdf = new jsPDF({
        orientation: imgHeight > pageHeight ? "portrait" : "portrait",
        unit: "mm",
        format: "a4",
      });

      pdf.addImage(
        canvas.toDataURL("image/png", 1.0),
        "PNG",
        0,
        0,
        imgWidth,
        imgHeight,
        "",
        "FAST"
      );

      pdf.save(`TripBook-Ticket-${ticketData.ticketId}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  if (status === "processing") {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
          <div className="flex flex-col items-center justify-center space-y-4">
            <Loader2 className="w-16 h-16 text-primary-600 animate-spin" />
            <h3 className="text-xl font-semibold text-gray-900">
              Processing Payment
            </h3>
            <p className="text-gray-500 text-center">
              {paymentMethod === "momo"
                ? "Please check your phone for the MTN Mobile Money prompt"
                : "Please wait while we process your card payment"}
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
          <div className="flex flex-col items-center justify-center space-y-4">
            <XCircle className="w-16 h-16 text-red-500" />
            <h3 className="text-xl font-semibold text-gray-900">
              Payment Failed
            </h3>
            <p className="text-gray-500 text-center">
              {paymentMethod === "momo"
                ? "The Mobile Money transaction was not completed. Please try again."
                : "Your card payment was declined. Please check your card details and try again."}
            </p>
            <button
              onClick={onClose}
              className="mt-4 w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex items-center space-x-4 mb-6">
          <CheckCircle className="w-8 h-8 text-green-500" />
          <div>
            <h3 className="text-xl font-semibold text-gray-900">
              Payment Successful!
            </h3>
            <p className="text-sm text-gray-500">Your ticket has been booked</p>
          </div>
        </div>

        <div ref={ticketRef} className="p-4">
          <div className="bg-white rounded-lg overflow-hidden">
            <Ticket {...ticketData} />
          </div>
        </div>

        <div className="mt-6 space-y-3">
          <button
            onClick={handleDownload}
            disabled={isDownloading}
            className="w-full bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 disabled:bg-primary-300 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {isDownloading ? (
              <>
                <Loader2 className="animate-spin h-5 w-5" />
                <span>Generating PDF...</span>
              </>
            ) : (
              <>
                <Download className="h-5 w-5" />
                <span>Download Ticket</span>
              </>
            )}
          </button>
          <button
            onClick={onClose}
            className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentStatus;
