import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";

export default function Header() {
  const { t } = useTranslation();

  return (
    <header className="bg-transparent absolute top-0 left-0 right-0 z-10">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="text-white text-xl font-bold">
              TripBook
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              to="/my-bookings"
              className="text-white hover:text-primary-100"
            >
              {t("navigation.myBookings")}
            </Link>
            <Link to="/login" className="text-white hover:text-primary-100">
              {t("navigation.login")}
            </Link>
            <Link to="/register" className="text-white hover:text-primary-100">
              {t("navigation.register")}
            </Link>
            <LanguageSwitcher />
          </div>
        </div>
      </nav>
    </header>
  );
}
