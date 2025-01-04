import { BrowserRouter, Route, Routes } from "react-router-dom";
import BookOffice from "./pages/BookOffice";
import Browse from "./pages/Browse";
import CheckBooking from "./pages/CheckBooking";
import CityDetails from "./pages/CityDetails";
import Details from "./pages/Details";
import SuccsssBooking from "./pages/SuccsssBooking";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Browse />} />
        <Route path="/office/:slug" element={<Details />} />
        <Route path="/office/:slug/book" element={<BookOffice />} />
        <Route path="/city/:slug" element={<CityDetails />} />
        <Route path="/success-booking" element={<SuccsssBooking />} />
        <Route path="/check-booking" element={<CheckBooking />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
