import { useEffect, useState } from "react";
import api from "../services/api";

function OrganizerDashboard() {

    const [opportunities, setOpportunities] = useState([]);

    useEffect(() => {

        api.get("/opportunities/organizer/1")
            .then((response) => {
                setOpportunities(response.data);
            })
            .catch((error) => {
                console.log(error);
            });

    }, []);

    const totalFunding = opportunities.reduce(
        (sum, opportunity) =>
            sum + opportunity.currentAmount,
        0
    );

    return (
        <div className="min-h-screen bg-gray-100 p-10">

            <h1 className="text-5xl font-bold mb-8">
                Organizer Dashboard
            </h1>

            <div className="grid md:grid-cols-2 gap-6">

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

            </div>

        </div>
    );
}

export default OrganizerDashboard;