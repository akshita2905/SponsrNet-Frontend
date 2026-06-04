import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Opportunities from "./pages/Opportunities";
import Offers from "./pages/Offers";
import Login from "./pages/Login";
import Register from "./pages/Register";
import OrganizerDashboard from "./pages/OrganizerDashboard";
import SponsorDashboard from "./pages/SponsorDashboard";
import OpportunityDetails from "./pages/OpportunityDetails";
import MyOffers from "./pages/MyOffers";
import MyOpportunities from "./pages/MyOpportunities";
import CreateOpportunity from "./pages/CreateOpportunity";
import Profile from "./pages/Profile";

function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/opportunities"
          element={<Opportunities />}
        />

        <Route
          path="/offers"
          element={<Offers />}
        />

        <Route
          path="/login"
          element={<Login />}
        />
<Route path="/register" element={<Register />} />
<Route
  path="/organizer-dashboard"
  element={<OrganizerDashboard />}
/>

<Route
  path="/sponsor-dashboard"
  element={<SponsorDashboard />}
/>
<Route
    path="/opportunities/:id"
    element={<OpportunityDetails />}
/>
<Route
    path="/my-offers"
    element={<MyOffers />}
/>
<Route
    path="/my-opportunities"
    element={<MyOpportunities />}
/>
<Route
    path="/create-opportunity"
    element={<CreateOpportunity />}
/>
<Route
    path="/profile"
    element={<Profile />}
/>
      </Routes>
    
    </BrowserRouter>
  );
}

export default App;