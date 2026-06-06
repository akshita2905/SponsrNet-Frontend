import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import OrganizerRoute from "./components/OrganizerRoute";
import SponsorRoute from "./components/SponsorRoute";

import Home from "./pages/Home";
import Opportunities from "./pages/Opportunities";
import Login from "./pages/Login";
import Register from "./pages/Register";
import OrganizerDashboard from "./pages/OrganizerDashboard";
import SponsorDashboard from "./pages/SponsorDashboard";
import OpportunityDetails from "./pages/OpportunityDetails";
import MyOffers from "./pages/MyOffers";
import MyOpportunities from "./pages/MyOpportunities";
import CreateOpportunity from "./pages/CreateOpportunity";
import Profile from "./pages/Profile";
import OpportunityOffers from "./pages/OpportunityOffers";
import EditOpportunity from "./pages/EditOpportunity";
import NotFound from "./pages/NotFound";

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
                    path="/opportunities"
                    element={<Opportunities />}
                />


                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                <Route
                    path="/profile"
                    element={<Profile />}
                />

                <Route
                    path="/opportunities/:id"
                    element={<OpportunityDetails />}
                />

                {/* Sponsor Routes */}

                <Route
                    path="/my-offers"
                    element={
                        <SponsorRoute>
                            <MyOffers />
                        </SponsorRoute>
                    }
                />

                <Route
                    path="/sponsor-dashboard"
                    element={
                        <SponsorRoute>
                            <SponsorDashboard />
                        </SponsorRoute>
                    }
                />

                {/* Organizer Routes */}

                <Route
                    path="/create-opportunity"
                    element={
                        <OrganizerRoute>
                            <CreateOpportunity />
                        </OrganizerRoute>
                    }
                />

                <Route
                    path="/my-opportunities"
                    element={
                        <OrganizerRoute>
                            <MyOpportunities />
                        </OrganizerRoute>
                    }
                />

                <Route
                    path="/organizer-dashboard"
                    element={
                        <OrganizerRoute>
                            <OrganizerDashboard />
                        </OrganizerRoute>
                    }
                />

                <Route
                    path="/opportunity-offers/:id"
                    element={
                        <OrganizerRoute>
                            <OpportunityOffers />
                        </OrganizerRoute>
                    }
                />

                <Route
                    path="/edit-opportunity/:id"
                    element={
                        <OrganizerRoute>
                            <EditOpportunity />
                        </OrganizerRoute>
                    }
                />

                <Route
    path="*"
    element={<NotFound />}
/>

            </Routes>

        </BrowserRouter>

    );
}

export default App;