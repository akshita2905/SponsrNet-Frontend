import { useEffect, useState } from "react";
import api from "../services/api";
import DashboardCard from "../components/DashboardCard";

function Dashboard() {

  const [stats, setStats] = useState(null);

  useEffect(() => {
    api.get("/dashboard")
      .then((response) => {
        setStats(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">

      <div className="max-w-7xl mx-auto p-10">
        <div className="mb-10">
  <h1 className="text-5xl font-bold">
    Welcome Back 👋
  </h1>

  <p className="text-gray-600 mt-3">
    Manage sponsorship opportunities and offers.
  </p>
</div>

        <h1 className="text-5xl font-bold mb-10">
          Dashboard
        </h1>

        {stats && (
          <div
            className="
            grid
            grid-cols-1
            md:grid-cols-2
            xl:grid-cols-5
            gap-8
            "
          >

            <DashboardCard
              title="Users"
              value={stats.totalUsers}
            />

            <DashboardCard
              title="Opportunities"
              value={stats.totalOpportunities}
            />

            <DashboardCard
              title="Offers"
              value={stats.totalOffers}
            />

            <DashboardCard
              title="Accepted"
              value={stats.acceptedOffers}
            />

            <DashboardCard
              title="Funding"
              value={`₹${stats.totalFundingRaised}`}
            />

          </div>
        )}

      </div>

    </div>
  );
}

export default Dashboard;