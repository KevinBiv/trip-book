import React from "react";
import { ArrowRight } from "lucide-react";

const popularRoutes = [
  {
    from: "Kigali",
    to: "Gisenyi",
    price: 5000,
    image:
      "https://images.unsplash.com/photo-1496588152823-86ff7695e68f?auto=format&fit=crop&q=80&w=3540&ixlib=rb-4.0.3",
  },
  {
    from: "Gisenyi",
    to: "Kigali",
    price: 5000,
    image:
      "https://images.unsplash.com/photo-1449034446853-66c86144b0ad?auto=format&fit=crop&q=80&w=3540&ixlib=rb-4.0.3",
  },
  {
    from: "Kigali",
    to: "Musanze",
    price: 3000,
    image:
      "https://images.unsplash.com/photo-1494522855154-9297ac14b55f?auto=format&fit=crop&q=80&w=3540&ixlib=rb-4.0.3",
  },
];

export default function PopularRoutes() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">
          Popular Routes
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {popularRoutes.map((route) => (
            <div
              key={`${route.from}-${route.to}`}
              className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="h-48 w-full relative">
                <img
                  src={route.image}
                  alt={`${route.from} to ${route.to}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold">{route.from}</span>
                    <ArrowRight className="h-4 w-4 text-gray-400" />
                    <span className="font-semibold">{route.to}</span>
                  </div>
                  <span className="text-lg font-bold text-primary-600">
                    {route.price}Rwf
                  </span>
                </div>
                <button className="w-full bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-500 transition-colors">
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
