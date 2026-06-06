import { useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

function MyOffers() {

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
if (!currentUser) {
    return (
        <div className="p-10">
            Please login first.
        </div>
    );
}

    return (
        <div className="min-h-screen bg-gray-100 p-10">

            <h1 className="text-5xl font-bold mb-10">
                My Offers
            </h1>
            
            {offers.length === 0 ? (

    <div className="text-center py-20">

        <h2 className="text-3xl font-bold">
            No Offers Submitted Yet
        </h2>

        <p className="text-gray-500 mt-3">
            Browse opportunities and submit your first offer.
        </p>

    </div>

) : (

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

        {offers.map((offer) => (

                    <div
                        key={offer.id}
                        className="bg-white p-6 rounded-xl shadow"
                    >

                        <h2 className="text-2xl font-bold mb-4">
                            Offer #{offer.id}
                        </h2>

                        <p>
                            <strong>Amount:</strong>
                            {" "}₹{offer.amount}
                        </p>

                        <p>
                            <strong>Status:</strong>
                            {" "}{offer.status}
                        </p>

                        {offer.opportunity && (
                            <p>
                                <strong>Opportunity:</strong>
                                {" "}{offer.opportunity.title}
                            </p>
                        )}

                    </div>

                ))}

            </div>
)}

        </div>
    );
}

export default MyOffers;