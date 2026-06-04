function Register() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">

            <div className="bg-white p-10 rounded-xl shadow-lg w-[450px]">

                <h1 className="text-3xl font-bold text-center mb-8">
                    Create Account
                </h1>

                <input
                    type="text"
                    placeholder="Full Name"
                    className="w-full border p-3 rounded mb-4"
                />

                <input
                    type="email"
                    placeholder="Email"
                    className="w-full border p-3 rounded mb-4"
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="w-full border p-3 rounded mb-4"
                />

                <select
                    className="w-full border p-3 rounded mb-6"
                >
                    <option>Sponsor</option>
                    <option>Organizer</option>
                </select>

                <button
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