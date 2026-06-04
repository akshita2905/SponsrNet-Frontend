import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { currentUser } = useAuth();
  return (
    <nav className="bg-white shadow-md">
      <div className="flex gap-8 items-center">
        <h1 className="text-3xl font-bold text-blue-600">SponsrNet 🚀</h1>
        <p className="text-sm text-gray-500">
  {currentUser.role}
</p>

        <Link to="/">Home</Link>

{currentUser.role === "SPONSOR" && (
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

{currentUser.role === "ORGANIZER" && (
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

<Link to="/profile">
  Profile
</Link>

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
      </div>
    </nav>
  );
}

export default Navbar;
