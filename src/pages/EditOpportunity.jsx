import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

function EditOpportunity() {

    const { id } = useParams();
    const { currentUser } = useAuth();

    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [description, setDescription] =
        useState("");

    const [category, setCategory] =
        useState("");

    const [targetAmount,
        setTargetAmount] =
        useState("");

    const [deadline,
        setDeadline] =
        useState("");

    useEffect(() => {

        api.get(
            `/opportunities/${id}`
        )
        .then((response) => {

            const data =
                response.data;

            setTitle(data.title);
            setDescription(
                data.description
            );
            setCategory(
                data.category
            );
            setTargetAmount(
                data.targetAmount
            );
            setDeadline(
                data.deadline
            );

        });

    }, [id]);

    const handleUpdate =
        async (e) => {

        e.preventDefault();

        try {

            await api.put(
    `/opportunities/${id}`,
    {
        title,
        description,
        category,
        targetAmount: Number(targetAmount),
        deadline,

        organizer: {
            id: currentUser.id
        }
    }
);

            alert(
                "Updated Successfully"
            );

            navigate(
                "/my-opportunities"
            );

        } catch (error) {

            console.log(error);

            alert(
                "Update Failed"
            );
        }
    };

    return (

        <div className="min-h-screen bg-gray-100 p-10">

            <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow">

                <h1 className="text-4xl font-bold mb-8">
                    Edit Opportunity
                </h1>

                <form
                    onSubmit={handleUpdate}
                    className="space-y-5"
                >

                    <input
                        type="text"
                        value={title}
                        onChange={(e)=>
                            setTitle(
                                e.target.value
                            )
                        }
                        className="w-full border p-3 rounded"
                    />

                    <textarea
                        value={description}
                        onChange={(e)=>
                            setDescription(
                                e.target.value
                            )
                        }
                        rows="5"
                        className="w-full border p-3 rounded"
                    />

                    <input
                        type="text"
                        value={category}
                        onChange={(e)=>
                            setCategory(
                                e.target.value
                            )
                        }
                        className="w-full border p-3 rounded"
                    />

                    <input
                        type="number"
                        value={targetAmount}
                        onChange={(e)=>
                            setTargetAmount(
                                e.target.value
                            )
                        }
                        className="w-full border p-3 rounded"
                    />

                    <input
                        type="date"
                        value={deadline}
                        onChange={(e)=>
                            setDeadline(
                                e.target.value
                            )
                        }
                        className="w-full border p-3 rounded"
                    />

                    <button
                        type="submit"
                        className="
                        bg-blue-600
                        text-white
                        px-6
                        py-3
                        rounded-lg
                        "
                    >
                        Update Opportunity
                    </button>

                </form>

            </div>

        </div>
    );
}

export default EditOpportunity;