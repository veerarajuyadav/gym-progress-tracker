import StatCard from "../components/ui/StatCard";
import { stats } from "../data/dashboardData";
import RecentWorkouts from "../components/dashboard/RecentWorkouts";

function Dashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold">
        Welcome Back 💪
      </h1>

      <p className="text-slate-400 mt-2">
        Track your strength journey.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
        {stats.map((stat) => (
          <StatCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            unit={stat.unit}
          />
        ))}
      </div>

      <RecentWorkouts />
    </div>
  );
}

export default Dashboard;