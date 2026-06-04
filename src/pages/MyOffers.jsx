import { useEffect, useState } from "react";
import api from "../services/api";

function MyOffers() {

    const [offers, setOffers] = useState([]);

    useEffect(() => {

        api.get("/offers/sponsor/1")
            .then((response) => {
                setOffers(response.data);
            })
            .catch((error) => {
                console.log(error);
            });

    }, []);

    return (
        <div className="min-h-screen bg-gray-100 p-10">

            <h1 className="text-5xl font-bold mb-10">
                My Offers
            </h1>

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

        </div>
    );
}

export default MyOffers;