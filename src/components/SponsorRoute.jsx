import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function SponsorRoute({ children }) {

    const { currentUser } =
        useAuth();

    if (
        !currentUser ||
        currentUser.role !==
        "SPONSOR"
    ) {

        return (
            <Navigate to="/" />
        );
    }

    return children;
}

export default SponsorRoute;