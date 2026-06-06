import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

function Profile() {

    const { currentUser, setCurrentUser } =
        useAuth();

    const [editMode, setEditMode] =
        useState(false);

    const [name, setName] =
        useState("");

    const [photoUrl, setPhotoUrl] =
        useState("");

    const [phoneNumber, setPhoneNumber] =
        useState("");

    if (!currentUser) {
        return (
            <div className="p-10">
                Please login first
            </div>
        );
    }

    const saveProfile = async () => {

        if (
            phoneNumber &&
            phoneNumber.length !== 10
        ) {

            alert(
                "Phone number must contain exactly 10 digits"
            );

            return;
        }

        try {

            const response =
                await api.put(
                    `/users/${currentUser.id}`,
                    {
                        ...currentUser,
                        name,
                        photoUrl,
                        phoneNumber
                    }
                );

            setCurrentUser(
                response.data
            );

            setEditMode(false);

            alert(
                "Profile Updated Successfully"
            );

        } catch (error) {

            console.log(error);

            alert(
                "Failed to update profile"
            );

        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-10">

            <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">

                <div className="flex flex-col items-center">

                    <img
                        src={
                            editMode
                                ? photoUrl ||
                                  "https://via.placeholder.com/150"
                                : currentUser.photoUrl ||
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

                    {editMode && (

                        <>
                            <input
                                type="text"
                                value={photoUrl}
                                onChange={(e) =>
                                    setPhotoUrl(
                                        e.target.value
                                    )
                                }
                                placeholder="Photo URL"
                                className="
                                border
                                p-2
                                rounded
                                mb-4
                                w-full
                                "
                            />

                            <input
                                type="text"
                                value={phoneNumber}
                                onChange={(e) =>
                                    setPhoneNumber(
                                        e.target.value
                                            .replace(/\D/g, "")
                                            .slice(0, 10)
                                    )
                                }
                                placeholder="Phone Number"
                                className="
                                border
                                p-2
                                rounded
                                mb-4
                                w-full
                                "
                            />
                        </>

                    )}

                    {editMode ? (

                        <input
                            type="text"
                            value={name}
                            onChange={(e) =>
                                setName(
                                    e.target.value
                                )
                            }
                            className="
                            border
                            p-2
                            rounded
                            mb-2
                            text-center
                            "
                        />

                    ) : (

                        <h1 className="text-4xl font-bold mb-2">
                            {currentUser.name}
                        </h1>

                    )}

                    <p className="text-gray-500 mb-6">
                        {currentUser.role}
                    </p>

                </div>

                <div className="space-y-4">

                    <div>
                        <strong>Email:</strong>
                        {" "}
                        {currentUser.email}
                    </div>

                    <div>
                        <strong>User ID:</strong>
                        {" "}
                        {currentUser.id}
                    </div>

                    <div>
                        <strong>Phone:</strong>
                        {" "}
                        {currentUser.phoneNumber ||
                            "Not Added"}
                    </div>

                    <div>
                        <strong>Firebase UID:</strong>
                        {" "}
                        {currentUser.firebaseUid}
                    </div>

                </div>

                <div className="mt-8">

                    {!editMode ? (

                        <button
                            onClick={() => {

                                setName(
                                    currentUser.name || ""
                                );

                                setPhotoUrl(
                                    currentUser.photoUrl || ""
                                );

                                setPhoneNumber(
                                    currentUser.phoneNumber || ""
                                );

                                setEditMode(true);
                            }}
                            className="
                            bg-blue-600
                            text-white
                            px-6
                            py-3
                            rounded-lg
                            hover:bg-blue-700
                            "
                        >
                            Edit Profile
                        </button>

                    ) : (

                        <button
                            onClick={saveProfile}
                            className="
                            bg-green-600
                            text-white
                            px-6
                            py-3
                            rounded-lg
                            hover:bg-green-700
                            "
                        >
                            Save Changes
                        </button>

                    )}

                </div>

            </div>

        </div>
    );
}

export default Profile;