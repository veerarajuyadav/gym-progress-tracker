import StatCard from "../components/ui/StatCard";
import RecentWorkouts from "../components/dashboard/RecentWorkouts";

function Dashboard() {
  const weights =
    JSON.parse(
      localStorage.getItem("weights")
    ) || [];

  const latestWeight =
    weights.length > 0
      ? weights[0].value
      : "--";

  return (
    <div>
      <h1 className="text-3xl font-bold">
        Welcome Back 💪
      </h1>

      <p className="text-slate-400 mt-2">
        Track your strength journey.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
        <StatCard
          title="Body Weight"
          value={latestWeight}
          unit="kg"
        />

        <StatCard
          title="Squat PR"
          value="160"
          unit="kg"
        />

        <StatCard
          title="Bench PR"
          value="100"
          unit="kg"
        />

        <StatCard
          title="Deadlift PR"
          value="210"
          unit="kg"
        />
      </div>

      <RecentWorkouts />
    </div>
  );
}

export default Dashboard;