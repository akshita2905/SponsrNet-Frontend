import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function OrganizerRoute({ children }) {

    const { currentUser } =
        useAuth();

    if (
        !currentUser ||
        currentUser.role !==
        "ORGANIZER"
    ) {

        return (
            <Navigate to="/" />
        );
    }

    return children;
}

export default OrganizerRoute;