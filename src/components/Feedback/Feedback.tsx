// components/Feedback/Feedback.tsx
import { useState } from "react";
import { Star, MessageSquare, Send } from "lucide-react";

interface FeedbackProps {
  onClose?: () => void;
}

export default function Feedback({ onClose }: FeedbackProps) {
  const [rating, setRating] = useState<number>(0);
  const [hover, setHover] = useState<number>(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Here you would normally send the feedback to your backend
      console.log({ rating, comment });

      setIsSubmitted(true);
    } catch (error) {
      console.error("Error submitting feedback:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6 text-center">
        <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Send className="h-8 w-8 text-primary-600" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Thank You!</h3>
        <p className="text-gray-600 mb-4">
          Your feedback has been submitted successfully.
        </p>
        <button
          onClick={onClose}
          className="text-primary-600 font-medium hover:text-primary-700"
        >
          Close
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Rate Your Experience
      </h3>

      {/* Star Rating */}
      <div className="flex items-center justify-center space-x-2 mb-6">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setRating(star)}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
            className="focus:outline-none"
          >
            <Star
              className={`h-8 w-8 ${
                star <= (hover || rating)
                  ? "text-yellow-400 fill-yellow-400"
                  : "text-gray-300"
              }`}
            />
          </button>
        ))}
      </div>

      {/* Feedback Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Your Feedback
          </label>
          <div className="relative">
            <MessageSquare className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <textarea
              rows={4}
              className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              placeholder="Share your experience with us..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!rating || !comment || isSubmitting}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            <span>Submit Feedback</span>
            {isSubmitting && (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            )}
          </button>
        </div>
      </form>

      {/* Rating descriptions */}
      {rating > 0 && (
        <div className="mt-4 text-center text-sm text-gray-600">
          {rating === 1 && "Poor - Significant improvement needed"}
          {rating === 2 && "Fair - Below average experience"}
          {rating === 3 && "Good - Average experience"}
          {rating === 4 && "Very Good - Above average experience"}
          {rating === 5 && "Excellent - Outstanding experience"}
        </div>
      )}
    </div>
  );
}
