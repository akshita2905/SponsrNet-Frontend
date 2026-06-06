import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

function OpportunityOffers() {

    const { id } = useParams();
const { currentUser } = useAuth();
    const [offers, setOffers] = useState([]);

    useEffect(() => {

        api.get(
            `/offers/opportunity/${id}`
        )
        .then((response) => {

            setOffers(
                response.data
            );

        })
        .catch((error) => {

            console.log(error);

        });

    }, [id]);

    const acceptOffer = async (offerId) => {

    try {

        await api.put(
            `/offers/${offerId}/accept`,
            {
                id: currentUser.id
            }
        );

        window.location.reload();

    } catch (error) {

        console.log(error);

        alert(
            error.response?.data?.message ||
            "Failed to accept offer"
        );
    }
};

    const rejectOffer = async (offerId) => {

    try {

        await api.put(
            `/offers/${offerId}/reject`,
            {
                id: currentUser.id
            }
        );

        window.location.reload();

    } catch (error) {

        console.log(error);

        alert(
            error.response?.data?.message ||
            "Failed to reject offer"
        );
    }
};

    return (

        <div className="min-h-screen bg-gray-100 p-10">

            <h1 className="text-5xl font-bold mb-10">
                Opportunity Offers
            </h1>

            <div className="space-y-6">

                {offers.map((offer) => (

                    <div
                        key={offer.id}
                        className="
                        bg-white
                        p-6
                        rounded-xl
                        shadow
                        "
                    >

                        <p>
                            <strong>Sponsor:</strong>
                            {" "}
                            {offer.sponsor?.name}
                        </p>

                        <p>
                            <strong>Amount:</strong>
                            {" "}
                            ₹{offer.amount}
                        </p>

                        <p>
                            <strong>Message:</strong>
                            {" "}
                            {offer.message}
                        </p>

                        <p>
                            <strong>Status:</strong>
                            {" "}
                            {offer.status}
                        </p>

                        {offer.status === "PENDING" && (

                            <div className="flex gap-4 mt-4">

                                <button
                                    onClick={() =>
                                        acceptOffer(
                                            offer.id
                                        )
                                    }
                                    className="
                                    bg-green-600
                                    text-white
                                    px-4
                                    py-2
                                    rounded
                                    "
                                >
                                    Accept
                                </button>

                                <button
                                    onClick={() =>
                                        rejectOffer(
                                            offer.id
                                        )
                                    }
                                    className="
                                    bg-red-600
                                    text-white
                                    px-4
                                    py-2
                                    rounded
                                    "
                                >
                                    Reject
                                </button>

                            </div>

                        )}

                    </div>

                ))}

            </div>

        </div>

    );
}

export default OpportunityOffers;