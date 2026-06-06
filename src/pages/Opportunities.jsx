import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";

function Opportunities() {
  const [opportunities, setOpportunities] = useState([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("ALL");
  const [sortBy, setSortBy] = useState("LATEST");
  const [currentPage, setCurrentPage] = useState(1);

  const opportunitiesPerPage = 6;

  useEffect(() => {
    api
      .get("/opportunities")
      .then((response) => {
        setOpportunities(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  useEffect(() => {
    setCurrentPage(1);
  }, [search, categoryFilter, sortBy]);

  let filteredOpportunities = opportunities.filter((opportunity) => {
    const today = new Date();
today.setHours(0, 0, 0, 0);

const deadline = new Date(opportunity.deadline);
deadline.setHours(0, 0, 0, 0);

if (deadline < today) {
  return false;
}

    const matchesSearch = opportunity.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      categoryFilter === "ALL" || opportunity.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });
  filteredOpportunities = [...filteredOpportunities];

  if (sortBy === "FUNDING") {
    filteredOpportunities.sort((a, b) => b.currentAmount - a.currentAmount);
  }

  if (sortBy === "DEADLINE") {
    filteredOpportunities.sort(
      (a, b) => new Date(a.deadline) - new Date(b.deadline),
    );
  }

  if (sortBy === "LATEST") {
    filteredOpportunities.sort((a, b) => b.id - a.id);
  }
  const lastIndex = currentPage * opportunitiesPerPage;

  const firstIndex = lastIndex - opportunitiesPerPage;

  const currentOpportunities = filteredOpportunities.slice(
    firstIndex,
    lastIndex,
  );

  const totalPages = Math.max(
  1,
  Math.ceil(
    filteredOpportunities.length /
    opportunitiesPerPage
  )
);
  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-5xl font-bold mb-10">Sponsorship Opportunities</h1>
      <input
        type="text"
        placeholder="Search opportunities..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="
    w-full
    md:w-96
    border
    p-3
    rounded-lg
    mb-8
    "
      />
      <select
        value={categoryFilter}
        onChange={(e) => setCategoryFilter(e.target.value)}
        className="border p-3 rounded-lg mb-8 ml-4"
      >
        <option value="ALL">All Categories</option>
        <option value="Technology">Technology</option>
        <option value="Education">Education</option>
        <option value="Sports">Sports</option>
        <option value="Cultural">Cultural</option>
      </select>

      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="border p-3 rounded-lg mb-8 ml-4"
      >
        <option value="LATEST">Latest</option>
        <option value="FUNDING">Funding High → Low</option>
        <option value="DEADLINE">Deadline Nearest</option>
      </select>

      {currentOpportunities.length === 0 ? (
        <div className="text-center py-20">
          <h2 className="text-3xl font-bold">No Opportunities Found</h2>

          <p className="text-gray-500 mt-3">
            Try changing your search or filters.
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentOpportunities.map((opportunity) => (
            <div
              key={opportunity.id}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition"
            >
              <h2 className="text-2xl font-bold mb-3">{opportunity.title}</h2>

              <p className="text-gray-600 mb-4">{opportunity.description}</p>

              <div className="space-y-2">
                <p>
                  <strong>Category:</strong> {opportunity.category}
                </p>

                <p>
                  <strong>Target:</strong> ₹{opportunity.targetAmount}
                </p>

                <p>
                  <strong>Raised:</strong> ₹{opportunity.currentAmount}
                </p>

                <p>
                  <strong>Deadline:</strong> {opportunity.deadline}
                </p>

                <p>
                  <strong>Status:</strong>

                  <span
                    className={
                      opportunity.status === "CLOSED"
                        ? "text-red-600 font-bold"
                        : "text-green-600 font-bold"
                    }
                  >
                    {" "}
                    {opportunity.status}
                  </span>
                </p>
                <Link
                  to={`/opportunities/${opportunity.id}`}
                  className="
    mt-5
    inline-block
    bg-blue-600
    text-white
    px-4
    py-2
    rounded-lg
    "
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="flex justify-center gap-3 mt-10">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
          className="
        bg-gray-300
        px-4
        py-2
        rounded
        "
        >
          Previous
        </button>

        <span className="px-4 py-2">
          Page {currentPage} of {totalPages}
        </span>

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
          className="
        bg-blue-600
        text-white
        px-4
        py-2
        rounded
        "
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Opportunities;
