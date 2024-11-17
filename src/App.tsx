import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SearchResults from "./components/SearchTicket/SearchTicketResults";
import HomePage from "./pages/homepage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search-results" element={<SearchResults />} />
      </Routes>
    </Router>
  );
}

export default App;
