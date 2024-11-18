import React from "react";
import { Calendar, MapPin, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ModifySearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentSearch?: {
    from: string;
    to: string;
    date: string;
  };
}

export default function ModifySearchModal({
  isOpen,
  onClose,
  currentSearch,
}: ModifySearchModalProps) {
  const navigate = useNavigate();

  const handleModifySearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/search-results");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-3xl relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-500"
        >
          <X className="h-6 w-6" />
        </button>

        {/* Modal Content */}
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Modify Search
          </h2>

          <form onSubmit={handleModifySearch}>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    From
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      defaultValue={currentSearch?.from || ""}
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
                      type="text"
                      defaultValue={currentSearch?.to || ""}
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
                      type="date"
                      defaultValue={currentSearch?.date || ""}
                      className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                </div>
              </div>

              {/* Popular Routes Suggestions */}
              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-700 mb-3">
                  Popular Routes
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {[
                    { from: "New York", to: "Boston" },
                    { from: "Boston", to: "New York" },
                    { from: "New York", to: "Washington DC" },
                  ].map((route, index) => (
                    <button
                      key={index}
                      type="button"
                      className="flex items-center justify-center px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-sm"
                    >
                      {route.from} → {route.to}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-500"
                >
                  Search Buses
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
