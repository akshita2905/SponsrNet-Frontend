import { useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

function OrganizerDashboard() {
    const { currentUser } = useAuth();

    const [opportunities, setOpportunities] = useState([]);

    useEffect(() => {

if (!currentUser) return;

api.get(
    `/opportunities/organizer/${currentUser.id}`
)            .then((response) => {
                setOpportunities(response.data);
            })
            .catch((error) => {
                console.log(error);
            });

}, [currentUser]);
    const totalFunding = opportunities.reduce(
        (sum, opportunity) =>
            sum + opportunity.currentAmount,
        0
    );
    const openOpportunities =
    opportunities.filter(
        opportunity =>
            opportunity.status === "OPEN"
    ).length;

const fundedOpportunities =
    opportunities.filter(
        opportunity =>
            opportunity.status === "FUNDED"
    ).length;

    if (!currentUser) {
    return (
        <div className="p-10">
            Please login first.
        </div>
    );
}

    return (
        <div className="min-h-screen bg-gray-100 p-10">

            <h1 className="text-5xl font-bold mb-8">
                Organizer Dashboard
            </h1>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

                <div className="bg-white p-6 rounded-xl shadow">
                    <h3 className="text-gray-500">
                        My Opportunities
                    </h3>

                    <h1 className="text-4xl font-bold mt-2">
                        {opportunities.length}
                    </h1>
                </div>

                <div className="bg-white p-6 rounded-xl shadow">
                    <h3 className="text-gray-500">
                        Funding Raised
                    </h3>

                    <h1 className="text-4xl font-bold mt-2 text-green-600">
                        ₹{totalFunding}
                    </h1>
                </div>
                <div className="bg-white p-6 rounded-xl shadow">
    <h3 className="text-gray-500">
        Open Opportunities
    </h3>

    <h1 className="text-4xl font-bold text-green-600 mt-2">
        {openOpportunities}
    </h1>
</div>

<div className="bg-white p-6 rounded-xl shadow">
    <h3 className="text-gray-500">
    Funded Opportunities
</h3>

<h1 className="text-4xl font-bold text-blue-600 mt-2">
    {fundedOpportunities}
</h1>
</div>

            </div>

        </div>
    );
}

export default OrganizerDashboard;