import { useEffect, useState } from "react";
import api from "../services/api";

function Offers() {

    const [offers, setOffers] = useState([]);
    const [filter, setFilter] = useState("ALL");

    const fetchOffers = async () => {
        try {
            const response = await api.get("/offers");
            setOffers(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchOffers();
    }, []);

    const acceptOffer = async (offerId) => {
        try {

            await api.put(`/offers/${offerId}/accept`);

            alert("Offer accepted successfully!");

            fetchOffers();

        } catch (error) {

            console.log(error);
            alert("Error accepting offer");

        }
    };

    const rejectOffer = async (offerId) => {
        try {

            await api.put(`/offers/${offerId}/reject`);

            alert("Offer rejected successfully!");

            fetchOffers();

        } catch (error) {

            console.log(error);
            alert("Error rejecting offer");

        }
    };
    

    return (
        <div className="min-h-screen bg-gray-100 p-10">

            <h1 className="text-5xl font-bold mb-10">
                Sponsorship Offers
            </h1>
            <div className="flex gap-4 mb-8">

    <button
        onClick={() => setFilter("ALL")}
        className="bg-blue-600 text-white px-4 py-2 rounded"
    >
        All
    </button>

    <button
        onClick={() => setFilter("PENDING")}
        className="bg-yellow-500 text-white px-4 py-2 rounded"
    >
        Pending
    </button>

    <button
        onClick={() => setFilter("ACCEPTED")}
        className="bg-green-600 text-white px-4 py-2 rounded"
    >
        Accepted
    </button>

    <button
        onClick={() => setFilter("REJECTED")}
        className="bg-red-600 text-white px-4 py-2 rounded"
    >
        Rejected
    </button>

</div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

                {offers
    .filter(
        offer =>
            filter === "ALL" ||
            offer.status === filter
    )
    .map((offer) => (

                    <div
                        key={offer.id}
                        className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition"
                    >

                        <h2 className="text-2xl font-bold mb-4">
                            Offer #{offer.id}
                        </h2>

                        <p className="mb-3">
                            <strong>Amount:</strong> ₹{offer.amount}
                        </p>

                        <p className="mb-3">
                            <strong>Message:</strong>
                            <br />
                            {offer.message}
                        </p>

                        <div className="mb-4">
    {offer.status === "PENDING" && (
        <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full">
            PENDING
        </span>
    )}

    {offer.status === "ACCEPTED" && (
        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
            ACCEPTED
        </span>
    )}

    {offer.status === "REJECTED" && (
        <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full">
            REJECTED
        </span>
    )}
</div>

                        {offer.opportunity && (
                            <p className="mb-4">
                                <strong>Opportunity:</strong>{" "}
                                {offer.opportunity.title}
                            </p>
                        )}

                        {offer.status === "PENDING" && (
                            <div className="flex gap-3 mt-4">

                                <button
                                    onClick={() => acceptOffer(offer.id)}
                                    className="
                                        bg-green-600
                                        text-white
                                        px-4
                                        py-2
                                        rounded-lg
                                        hover:bg-green-700
                                    "
                                >
                                    Accept
                                </button>

                                <button
                                    onClick={() => rejectOffer(offer.id)}
                                    className="
                                        bg-red-600
                                        text-white
                                        px-4
                                        py-2
                                        rounded-lg
                                        hover:bg-red-700
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

export default Offers;