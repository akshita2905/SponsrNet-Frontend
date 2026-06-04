import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="flex gap-8 items-center">
        <h1 className="text-3xl font-bold text-blue-600">
  SponsrNet 🚀
</h1>

  <Link to="/">Home</Link>

  <Link to="/opportunities">
    Opportunities
  </Link>

  <Link to="/offers">
    Offers
  </Link>

  <Link to="/dashboard">
    Dashboard
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