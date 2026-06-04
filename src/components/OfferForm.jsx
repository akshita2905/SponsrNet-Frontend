import { useState } from "react";
import api from "../services/api";

function OfferForm({ opportunityId }) {

    const [amount, setAmount] = useState("");
    const [message, setMessage] = useState("");

    const submitOffer = async () => {

        const offerData = {
            amount: Number(amount),
            message: message,
            status: "PENDING",
            opportunity: {
                id: opportunityId
            },
            sponsor: {
                id: 1
            }
        };

        try {

            await api.post("/offers", offerData);

            alert("Offer submitted successfully!");

            setAmount("");
            setMessage("");

        } catch (error) {

            console.log(error);
            alert("Error submitting offer");

        }
    };

    return (
        <div className="mt-5 border-t pt-5">

            <input
                type="number"
                placeholder="Offer Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="border p-2 w-full rounded mb-3"
            />

            <textarea
                placeholder="Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="border p-2 w-full rounded mb-3"
            />

            <button
                onClick={submitOffer}
                className="
                bg-blue-600
                text-white
                px-4
                py-2
                rounded
                "
            >
                Submit Offer
            </button>

        </div>
    );
}

export default OfferForm;