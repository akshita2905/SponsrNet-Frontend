import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

function OpportunityDetails() {

    const { id } = useParams();

    const { currentUser } = useAuth();

    const [opportunity, setOpportunity] =
        useState(null);

    const [amount, setAmount] =
        useState("");

    const [message, setMessage] =
        useState("");

    useEffect(() => {

        api.get(`/opportunities/${id}`)
            .then((response) => {

                setOpportunity(
                    response.data
                );

            })
            .catch((error) => {

                console.log(error);

            });

    }, [id]);

    if (!currentUser) {

        return (

            <div className="p-10">
                Please login first.
            </div>

        );
    }

    if (!opportunity) {

        return (

            <div className="p-10">
                Loading...
            </div>

        );
    }

    const submitOffer = async () => {

        if (!amount || !message) {

            alert(
                "Please fill all fields"
            );

            return;
        }

        try {

            const offerData = {

                amount:
                    Number(amount),

                message,

                status:
                    "PENDING",

                opportunity: {
                    id:
                        opportunity.id
                },

                sponsor: {
                    id:
                        currentUser.id
                }
            };

            await api.post(
                "/offers",
                offerData
            );

            alert(
                "Offer submitted successfully!"
            );

            setAmount("");
            setMessage("");

        } catch (error) {

            console.log(error);

            alert(
                error?.response?.data?.message
                ||
                "Error submitting offer"
            );
        }
    };

    const progress =
        (
            opportunity.currentAmount
            /
            opportunity.targetAmount
        ) * 100;

    return (

        <div className="min-h-screen bg-gray-100 p-10">

            <div
                className="
                max-w-4xl
                mx-auto
                bg-white
                rounded-xl
                shadow-lg
                p-8
                "
            >

                <h1 className="text-5xl font-bold mb-4">
                    {opportunity.title}
                </h1>

                <p className="text-gray-500 mb-8">
                    {opportunity.category}
                </p>

                <p className="text-lg mb-8">
                    {opportunity.description}
                </p>

                <div className="space-y-3 mb-8">

                    <p>
                        <strong>
                            Target Amount:
                        </strong>
                        {" "}
                        ₹{opportunity.targetAmount}
                    </p>

                    <p>
                        <strong>
                            Raised Amount:
                        </strong>
                        {" "}
                        ₹{opportunity.currentAmount}
                    </p>

                    <p>
                        <strong>
                            Deadline:
                        </strong>
                        {" "}
                        {opportunity.deadline}
                    </p>

                    <p>
                        <strong>
                            Status:
                        </strong>
                        {" "}
                        {opportunity.status}
                    </p>

                    <p>
                        <strong>
                            Organizer:
                        </strong>
                        {" "}
                        {opportunity.organizer?.name}
                    </p>

                    <p>
                        <strong>
                            Email:
                        </strong>
                        {" "}
                        {opportunity.organizer?.email}
                    </p>

                    <p>
                        <strong>
                            Phone:
                        </strong>
                        {" "}
                        {
                            opportunity.organizer
                                ?.phoneNumber
                            ||
                            "Not Available"
                        }
                    </p>

                </div>

                <div className="mb-3">

                    <strong>
                        Funding Progress
                    </strong>

                </div>

                <div
                    className="
                    w-full
                    bg-gray-200
                    rounded-full
                    h-5
                    "
                >

                    <div
                        className="
                        bg-green-500
                        h-5
                        rounded-full
                        "
                        style={{
                            width:
                                `${progress}%`
                        }}
                    />

                </div>

                <p className="mt-3 font-semibold">
                    {progress.toFixed(0)}
                    % Funded
                </p>

                <hr className="my-8" />

                {opportunity.status === "OPEN" ? (

                    <>

                        <h2
                            className="
                            text-3xl
                            font-bold
                            mb-6
                            "
                        >
                            Submit Sponsorship Offer
                        </h2>

                        <input
                            type="number"
                            placeholder="Offer Amount"
                            value={amount}
                            onChange={(e) =>
                                setAmount(
                                    e.target.value
                                )
                            }
                            className="
                            w-full
                            border
                            p-3
                            rounded-lg
                            mb-4
                            "
                        />

                        <textarea
                            placeholder="Message"
                            value={message}
                            onChange={(e) =>
                                setMessage(
                                    e.target.value
                                )
                            }
                            className="
                            w-full
                            border
                            p-3
                            rounded-lg
                            mb-4
                            "
                            rows="4"
                        />

                        <button
                            onClick={
                                submitOffer
                            }
                            className="
                            bg-blue-600
                            text-white
                            px-6
                            py-3
                            rounded-lg
                            hover:bg-blue-700
                            "
                        >
                            Submit Offer
                        </button>

                    </>

                ) : (

                    <p
                        className="
                        text-red-600
                        font-bold
                        text-xl
                        "
                    >
                        This opportunity is no longer accepting offers.
                    </p>

                )}

            </div>

        </div>

    );
}

export default OpportunityDetails;