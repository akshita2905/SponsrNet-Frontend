import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function MyOpportunities() {

    const [opportunities, setOpportunities] = useState([]);

const { currentUser } = useAuth();

    useEffect(() => {

    if (!currentUser) return;

    api.get(
        `/opportunities/organizer/${currentUser.id}`
    )
    .then((response) => {
        setOpportunities(response.data);
    })
    .catch((error) => {
        console.log(error);
    });

}, [currentUser]);
if (!currentUser) {
    return (
        <div className="p-10">
            Please login first.
        </div>
    );
}
const deleteOpportunity =
    async (id) => {

    const confirmDelete =
        window.confirm(
            "Are you sure?"
        );

    if (!confirmDelete) return;

    try {

        await api.delete(
            `/opportunities/${id}`
        );

        setOpportunities(
            opportunities.filter(
                opportunity =>
                    opportunity.id !== id
            )
        );

        alert(
            "Deleted Successfully"
        );

    } catch (error) {

        console.log(error);

        alert(
            "Delete Failed"
        );

    }
};
    return (
        <div className="min-h-screen bg-gray-100 p-10">

            <h1 className="text-5xl font-bold mb-10">
                My Opportunities
            </h1>

            {opportunities.length === 0 ? (

    <div className="text-center py-20">

        <h2 className="text-3xl font-bold">
            No Opportunities Created Yet
        </h2>

        <p className="text-gray-500 mt-3">
            Create your first sponsorship opportunity.
        </p>

    </div>

) : (

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
                        <div className="mt-5">

    <Link
        to={`/opportunity-offers/${opportunity.id}`}
        className="
        bg-blue-600
        text-white
        px-4
        py-2
        rounded-lg
        hover:bg-blue-700
        "
    >
        View Offers
    </Link>

</div><br />
                        <p>
                            <strong>Raised:</strong>
                            {" "}₹{opportunity.currentAmount}
                        </p>

    <div className="flex gap-3 mt-5">

    <Link
        to={`/edit-opportunity/${opportunity.id}`}
        className="
        bg-green-600
        text-white
        px-4
        py-2
        rounded-lg
        "
    >
        Edit
    </Link>

    <button
        onClick={() =>
            deleteOpportunity(
                opportunity.id
            )
        }
        className="
        bg-red-600
        text-white
        px-4
        py-2
        rounded-lg
        "
    >
        Delete
    </button>


</div>

                    </div>

                ))}

            </div>
)}
        </div>
    );
}

export default MyOpportunities;