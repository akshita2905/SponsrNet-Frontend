import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    createUserWithEmailAndPassword
} from "firebase/auth";

import { auth } from "../firebase";
import api from "../services/api";

import { useAuth } from "../context/AuthContext";

function Register() {

    const navigate = useNavigate();

    const { setCurrentUser } = useAuth();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("SPONSOR");

    const handleRegister = async () => {

        try {

            const result =
                await createUserWithEmailAndPassword(
                    auth,
                    email,
                    password
                );

            const firebaseUser =
                result.user;

            const userData = {

                firebaseUid:
                    firebaseUser.uid,

                name,

                email,

                role,

                photoUrl: ""
            };

            const response =
                await api.post(
                    "/users",
                    userData
                );

            setCurrentUser(
                response.data
            );

            alert(
                "Registration Successful"
            );

            navigate("/");

        } catch (error) {

            console.log(error);

            alert(
                error.message
            );
        }
    };

    return (

        <div className="min-h-screen flex items-center justify-center bg-gray-100">

            <div className="bg-white p-10 rounded-xl shadow-lg w-[450px]">

                <h1 className="text-3xl font-bold text-center mb-8">
                    Create Account
                </h1>

                <input
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) =>
                        setName(e.target.value)
                    }
                    className="w-full border p-3 rounded mb-4"
                />

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) =>
                        setEmail(e.target.value)
                    }
                    className="w-full border p-3 rounded mb-4"
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) =>
                        setPassword(e.target.value)
                    }
                    className="w-full border p-3 rounded mb-4"
                />

                <select
                    value={role}
                    onChange={(e) =>
                        setRole(e.target.value)
                    }
                    className="w-full border p-3 rounded mb-6"
                >
                    <option value="SPONSOR">
                        Sponsor
                    </option>

                    <option value="ORGANIZER">
                        Organizer
                    </option>

                </select>

                <button
                    onClick={handleRegister}
                    className="
                    w-full
                    bg-blue-600
                    text-white
                    py-3
                    rounded
                    hover:bg-blue-700
                    "
                >
                    Register
                </button>

            </div>

        </div>
    );
}

export default Register;