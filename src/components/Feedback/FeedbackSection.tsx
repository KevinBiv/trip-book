// components/Feedback/FeedbackSection.tsx
import { useState } from "react";
import { MessageCircle } from "lucide-react";
import Feedback from "./Feedback";

export default function FeedbackSection() {
  const [showFeedback, setShowFeedback] = useState(false);

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">
            Your Feedback Matters
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Help us improve our service by sharing your experience
          </p>
          <button
            onClick={() => setShowFeedback(true)}
            className="mt-6 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700"
          >
            <MessageCircle className="mr-2 h-5 w-5" />
            Give Feedback
          </button>
        </div>

        {/* Feedback Modal */}
        {showFeedback && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full">
              <Feedback onClose={() => setShowFeedback(false)} />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
