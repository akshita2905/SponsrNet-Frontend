import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Home() {

  const { currentUser } = useAuth();

  return (
    <div>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">

        <div className="max-w-7xl mx-auto px-8 py-24">

          <div className="max-w-3xl">

            <h1 className="text-6xl font-bold leading-tight">
              Connect Event Organizers
              <br />
              With Sponsors
            </h1>

            <p className="mt-6 text-xl text-blue-100">
              SponsrNet helps organizers find sponsors
              and helps brands discover sponsorship
              opportunities effortlessly.
            </p>

            {!currentUser && (
              <div className="mt-8 flex gap-4">

                <Link
                  to="/opportunities"
                  className="bg-white text-blue-700 px-6 py-3 rounded-lg font-semibold"
                >
                  Explore Opportunities
                </Link>

                <Link
                  to="/login"
                  className="border border-white px-6 py-3 rounded-lg font-semibold"
                >
                  Become a Sponsor
                </Link>

              </div>
            )}

          </div>

        </div>

      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-8 py-20">

        <h2 className="text-4xl font-bold text-center">
          How SponsrNet Works
        </h2>

        <div className="grid md:grid-cols-3 gap-8 mt-12">

          <div className="bg-white shadow-lg rounded-xl p-8">
            <h3 className="text-2xl font-bold mb-4">
              Create Opportunity
            </h3>

            <p className="text-gray-600">
              Organizers post sponsorship opportunities
              for events, hackathons and conferences.
            </p>
          </div>

          <div className="bg-white shadow-lg rounded-xl p-8">
            <h3 className="text-2xl font-bold mb-4">
              Receive Offers
            </h3>

            <p className="text-gray-600">
              Sponsors browse opportunities and
              submit sponsorship proposals.
            </p>
          </div>

          <div className="bg-white shadow-lg rounded-xl p-8">
            <h3 className="text-2xl font-bold mb-4">
              Grow Together
            </h3>

            <p className="text-gray-600">
              Accept sponsorships and track
              funding directly through the platform.
            </p>
          </div>

        </div>

      </section>

    </div>
  );
}

export default Home;