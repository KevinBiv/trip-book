import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SearchResults from "./components/SearchTicket/SearchTicketResults";
import HomePage from "./pages/homepage";
import SeatSelection from "./pages/seat-selection";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search-results" element={<SearchResults />} />
        <Route path="/select-seats" element={<SeatSelection />} />
      </Routes>
    </Router>
  );
}

export default App;
