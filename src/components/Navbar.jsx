import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import { signOut } from "firebase/auth";
import { auth } from "../firebase";

function Navbar() {

    const { currentUser } = useAuth();

console.log("NAVBAR USER:", currentUser);
    const navigate = useNavigate();

    const logout = async () => {

        try {

            await signOut(auth);

            navigate("/");

        } catch (error) {

            console.log(error);

        }
    };

    return (

        <nav className="bg-white shadow-md p-4">

            <div className="flex gap-8 items-center">

                <h1 className="text-3xl font-bold text-blue-600">
                    SponsrNet 
                </h1>

                {currentUser && (
                    <p className="text-sm text-gray-500">
                        {currentUser.role}
                    </p>
                )}

                <Link to="/">
                    Home
                </Link>

                {currentUser?.role === "SPONSOR" && (
                    <>
                        <Link to="/opportunities">
                            Opportunities
                        </Link>

                        <Link to="/my-offers">
                            My Offers
                        </Link>

                        <Link to="/sponsor-dashboard">
                            Dashboard
                        </Link>
                    </>
                )}

                {currentUser?.role === "ORGANIZER" && (
                    <>
                        <Link to="/create-opportunity">
                            Create Opportunity
                        </Link>

                        <Link to="/my-opportunities">
                            My Opportunities
                        </Link>

                        <Link to="/organizer-dashboard">
                            Dashboard
                        </Link>
                    </>
                )}

                {currentUser && (
                    <Link to="/profile">
                        Profile
                    </Link>
                )}

                {!currentUser ? (

                    <Link to="/login">

                        <button
                            className="
                            bg-blue-600
                            text-white
                            px-5
                            py-2
                            rounded-lg
                            hover:bg-blue-700
                            "
                        >
                            Login
                        </button>

                    </Link>

                ) : (

                    <button
                        onClick={logout}
                        className="
                        bg-red-500
                        text-white
                        px-5
                        py-2
                        rounded-lg
                        hover:bg-red-600
                        "
                    >
                        Logout
                    </button>

                )}

            </div>

        </nav>

    );
}

export default Navbar;