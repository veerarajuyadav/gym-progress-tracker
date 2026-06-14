import WorkoutCard from "./WorkoutCard";

function WorkoutHistory({
  workouts,
  onDelete,
  onUpdate,
}) {
  if (workouts.length === 0) {
    return null;
  }

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold mb-6">
        Workout History
      </h2>

      <div className="space-y-4">
        {workouts.map((workout) => (
          <WorkoutCard
            key={workout.id}
            workout={workout}
            onDelete={onDelete}
            onUpdate={onUpdate}
          />
        ))}
      </div>
    </div>
  );
}

export default WorkoutHistory;