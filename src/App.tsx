import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SearchResults from "./components/SearchTicket/SearchTicketResults";
import HomePage from "./pages/homepage";
import SeatSelection from "./pages/seat-selection";
import Payment from "./pages/payment";
import ConfirmationPage from "./pages/confirmation-page";
import MyBookings from "./pages/my-bookings";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/search-results" element={<SearchResults />} />
        <Route path="/select-seats" element={<SeatSelection />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />
      </Routes>
    </Router>
  );
}

export default App;
