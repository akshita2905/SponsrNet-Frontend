import { useEffect, useState } from "react";
import api from "../services/api";

function MyOpportunities() {

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

    return (
        <div className="min-h-screen bg-gray-100 p-10">

            <h1 className="text-5xl font-bold mb-10">
                My Opportunities
            </h1>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

                {opportunities.map((opportunity) => (

                    <div
                        key={opportunity.id}
                        className="bg-white p-6 rounded-xl shadow"
                    >

                        <h2 className="text-2xl font-bold mb-3">
                            {opportunity.title}
                        </h2>

                        <p>
                            <strong>Category:</strong>
                            {" "}{opportunity.category}
                        </p>

                        <p>
                            <strong>Target:</strong>
                            {" "}₹{opportunity.targetAmount}
                        </p>

                        <p>
                            <strong>Raised:</strong>
                            {" "}₹{opportunity.currentAmount}
                        </p>

                    </div>

                ))}

            </div>

        </div>
    );
}

export default MyOpportunities;