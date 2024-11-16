import React from 'react';
import { Shield, Clock, MapPin, CreditCard } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Secure Booking',
    description: 'Your payment and personal information is always safe'
  },
  {
    icon: Clock,
    title: '24/7 Support',
    description: 'Round the clock customer service for your needs'
  },
  {
    icon: MapPin,
    title: 'GPS Tracking',
    description: 'Real-time location tracking for your journey'
  },
  {
    icon: CreditCard,
    title: 'Easy Payment',
    description: 'Multiple payment options for your convenience'
  }
];

export default function Features() {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Why Choose TripBook</h2>
          <p className="mt-4 text-lg text-gray-600">Experience the best in bus travel with our premium services</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div key={feature.title} className="text-center">
              <div className="mx-auto h-12 w-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">{feature.title}</h3>
              <p className="mt-2 text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}