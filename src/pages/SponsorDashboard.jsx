import { useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

function SponsorDashboard() {

    const [offers, setOffers] = useState([]);
    const { currentUser } = useAuth();

    useEffect(() => {

        if (!currentUser) return;

api.get(
    `/offers/sponsor/${currentUser.id}`
)
            .then((response) => {
                setOffers(response.data);
            })
            .catch((error) => {
                console.log(error);
            });

}, [currentUser]);
    const accepted =
        offers.filter(
            offer => offer.status === "ACCEPTED"
        ).length;

    const pending =
        offers.filter(
            offer => offer.status === "PENDING"
        ).length;

    const rejected =
        offers.filter(
            offer => offer.status === "REJECTED"
        ).length;

        const totalSponsored =
    offers
        .filter(
            offer =>
                offer.status ===
                "ACCEPTED"
        )
        .reduce(
            (sum, offer) =>
                sum + offer.amount,
            0
        );
    return (
        <div className="min-h-screen bg-gray-100 p-10">

            <h1 className="text-5xl font-bold mb-8">
                Sponsor Dashboard
            </h1>

            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">

                <div className="bg-white p-6 rounded-xl shadow">
                    <h3 className="text-gray-500">
                        Offers Submitted
                    </h3>

                    <h1 className="text-4xl font-bold mt-2">
                        {offers.length}
                    </h1>
                </div>
                <div className="bg-white p-6 rounded-xl shadow">
    <h3 className="text-gray-500">
        Total Sponsored
    </h3>

    <h1 className="text-4xl font-bold text-blue-600 mt-2">
        ₹{totalSponsored}
    </h1>
</div>

                <div className="bg-white p-6 rounded-xl shadow">
                    <h3 className="text-gray-500">
                        Accepted
                    </h3>

                    <h1 className="text-4xl font-bold text-green-600 mt-2">
                        {accepted}
                    </h1>
                </div>

                <div className="bg-white p-6 rounded-xl shadow">
                    <h3 className="text-gray-500">
                        Pending
                    </h3>

                    <h1 className="text-4xl font-bold text-yellow-500 mt-2">
                        {pending}
                    </h1>
                </div>

                <div className="bg-white p-6 rounded-xl shadow">
                    <h3 className="text-gray-500">
                        Rejected
                    </h3>

                    <h1 className="text-4xl font-bold text-red-500 mt-2">
                        {rejected}
                    </h1>
                </div>

            </div>

        </div>
    );
}

export default SponsorDashboard;