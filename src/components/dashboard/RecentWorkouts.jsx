import { workouts } from "../../data/workoutData";

function RecentWorkouts() {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 mt-8">
      <h2 className="text-xl font-semibold mb-4">
        Recent Workouts
      </h2>

      <div className="space-y-4">
        {workouts.map((workout) => (
          <div
            key={workout.id}
            className="flex justify-between items-center border-b border-slate-800 pb-3"
          >
            <span className="font-medium">
              {workout.name}
            </span>

            <span className="text-slate-400">
              {workout.date}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentWorkouts;