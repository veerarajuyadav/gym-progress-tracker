function StatCard({ title, value, unit }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
      <p className="text-slate-400 text-sm">
        {title}
      </p>

      <h2 className="text-3xl font-bold mt-2">
        {value}
        <span className="text-green-500 ml-1">
          {unit}
        </span>
      </h2>
    </div>
  );
}

export default StatCard;