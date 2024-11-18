import { Bus, UserCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-primary-800 text-white">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Bus className="h-8 w-8" />
            <span className="ml-2 text-xl font-bold">TripBook</span>
          </div>
          <div className="flex items-center space-x-4">
            <a href="#" className="hover:text-primary-200">
              <Link
                to="/my-bookings"
                className="text-white hover:text-primary-100"
              >
                My Bookings
              </Link>
            </a>
            <a href="#" className="hover:text-primary-200">
              Support
            </a>
            <button className="flex items-center space-x-2 bg-primary-700 px-4 py-2 rounded-lg hover:bg-primary-600">
              <UserCircle2 className="h-5 w-5" />
              <span>Login</span>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}
