import { useEffect, useState } from "react";
import api from "../services/api";

function Profile() {

    const [user, setUser] = useState(null);

    useEffect(() => {

        api.get("/users/1")
            .then((response) => {
                setUser(response.data);
            })
            .catch((error) => {
                console.log(error);
            });

    }, []);

    if (!user) {
        return (
            <div className="p-10">
                Loading...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 p-10">

            <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">

                <div className="flex flex-col items-center">

                    <img
                        src={
                            user.photoUrl ||
                            "https://via.placeholder.com/150"
                        }
                        alt="Profile"
                        className="
                        w-40
                        h-40
                        rounded-full
                        object-cover
                        mb-6
                        "
                    />

                    <h1 className="text-4xl font-bold mb-2">
                        {user.name}
                    </h1>

                    <p className="text-gray-500 mb-6">
                        {user.role}
                    </p>

                </div>

                <div className="space-y-4">

                    <div>
                        <strong>Email:</strong>
                        {" "} {user.email}
                    </div>

                    <div>
                        <strong>User ID:</strong>
                        {" "} {user.id}
                    </div>

                    <div>
                        <strong>Firebase UID:</strong>
                        {" "}
                        {user.firebaseUid || "Not Linked"}
                    </div>

                </div>

            </div>

        </div>
    );
}

export default Profile;