function RecentWorkouts() {
  const workouts =
    JSON.parse(
      localStorage.getItem("workoutHistory")
    ) || [];

  const recentWorkouts =
    workouts.slice(0, 5);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 mt-8">
      <h2 className="text-xl font-semibold mb-4">
        Recent Workouts
      </h2>

      {recentWorkouts.length === 0 ? (
        <p className="text-slate-400">
          No workouts logged yet.
        </p>
      ) : (
        <div className="space-y-4">
          {recentWorkouts.map(
            (workout) => (
              <div
                key={workout.id}
                className="flex justify-between items-center border-b border-slate-800 pb-3"
              >
                <span className="font-medium">
                  {
                    workout.workoutName
                  }
                </span>

                <span className="text-slate-400">
                  {workout.date}
                </span>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}

export default RecentWorkouts;