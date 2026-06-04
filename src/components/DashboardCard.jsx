function DashboardCard({ title, value }) {
  return (
    <div
      className="
      bg-white
      rounded-xl
      shadow-md
      p-8
      text-center
      hover:shadow-xl
      transition
      "
    >
      <h3 className="text-xl font-semibold text-gray-600">
        {title}
      </h3>

      <h1 className="text-4xl font-bold text-blue-600 mt-4">
        {value}
      </h1>
    </div>
  );
}

export default DashboardCard;