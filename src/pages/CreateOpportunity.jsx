import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";


function CreateOpportunity() {

    const navigate = useNavigate();
    const { currentUser } = useAuth();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [targetAmount, setTargetAmount] = useState("");
    const [deadline, setDeadline] = useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const opportunity = {

                title,
                description,
                category,

                targetAmount:
                    Number(targetAmount),

                currentAmount: 0,

                deadline,

                status: "OPEN",

                organizer: {
    id: currentUser.id
}
            };

            await api.post(
                "/opportunities",
                opportunity
            );

            alert(
                "Opportunity created successfully!"
            );

            navigate(
                "/my-opportunities"
            );

        } catch (error) {

            console.log(error);

            alert(
                "Failed to create opportunity"
            );
        }
    };
    if (!currentUser) {
    return (
        <div className="p-10">
            Please login first.
        </div>
    );
}

    return (

        <div className="min-h-screen bg-gray-100 p-10">

            <div
                className="
                max-w-3xl
                mx-auto
                bg-white
                rounded-xl
                shadow-lg
                p-8
                "
            >

                <h1
                    className="
                    text-4xl
                    font-bold
                    mb-8
                    "
                >
                    Create Opportunity
                </h1>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >

                    <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) =>
                            setTitle(e.target.value)
                        }
                        className="
                        w-full
                        border
                        p-3
                        rounded-lg
                        "
                        required
                    />

                    <textarea
                        placeholder="Description"
                        value={description}
                        onChange={(e) =>
                            setDescription(
                                e.target.value
                            )
                        }
                        rows="5"
                        className="
                        w-full
                        border
                        p-3
                        rounded-lg
                        "
                        required
                    />

                    <input
                        type="text"
                        placeholder="Category"
                        value={category}
                        onChange={(e) =>
                            setCategory(
                                e.target.value
                            )
                        }
                        className="
                        w-full
                        border
                        p-3
                        rounded-lg
                        "
                        required
                    />

                    <input
                        type="number"
                        placeholder="Target Amount"
                        value={targetAmount}
                        onChange={(e) =>
                            setTargetAmount(
                                e.target.value
                            )
                        }
                        className="
                        w-full
                        border
                        p-3
                        rounded-lg
                        "
                        required
                    />

                    <input
                        type="date"
                        value={deadline}
                        onChange={(e) =>
                            setDeadline(
                                e.target.value
                            )
                        }
                        className="
                        w-full
                        border
                        p-3
                        rounded-lg
                        "
                        required
                    />

                    <button
                        type="submit"
                        className="
                        bg-green-600
                        text-white
                        px-6
                        py-3
                        rounded-lg
                        hover:bg-green-700
                        "
                    >
                        Create Opportunity
                    </button>

                </form>

            </div>

        </div>
    );
}

export default CreateOpportunity;