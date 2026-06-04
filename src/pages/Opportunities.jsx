import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";

function Opportunities() {

    const [opportunities, setOpportunities] = useState([]);

    useEffect(() => {
        api.get("/opportunities")
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
                Sponsorship Opportunities
            </h1>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

                {opportunities.map((opportunity) => (

                    <div
                        key={opportunity.id}
                        className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition"
                    >

                        <h2 className="text-2xl font-bold mb-3">
                            {opportunity.title}
                        </h2>

                        <p className="text-gray-600 mb-4">
                            {opportunity.description}
                        </p>

                        <div className="space-y-2">

                            <p>
                                <strong>Category:</strong>{" "}
                                {opportunity.category}
                            </p>

                            <p>
                                <strong>Target:</strong> ₹
                                {opportunity.targetAmount}
                            </p>

                            <p>
                                <strong>Raised:</strong> ₹
                                {opportunity.currentAmount}
                            </p>

                            <p>
                                <strong>Deadline:</strong>{" "}
                                {opportunity.deadline}
                            </p>

                            <p>
                                <strong>Status:</strong>{" "}
                                {opportunity.status}
                            </p>
                            <Link
    to={`/opportunities/${opportunity.id}`}
    className="
    mt-5
    inline-block
    bg-blue-600
    text-white
    px-4
    py-2
    rounded-lg
    "
>
    View Details
</Link>

                        </div>
                        

                    </div>

                ))}

            </div>

        </div>
    );
}

export default Opportunities;