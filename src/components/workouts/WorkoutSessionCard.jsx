function WorkoutSessionCard({ session }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
      <h2 className="text-2xl font-bold">
        {session.workoutName}
      </h2>

      <p className="text-slate-400 mt-1">
        {session.date}
      </p>

      <div className="mt-6 space-y-6">
        {session.exercises.map((exercise) => (
          <div key={exercise.id}>
            <h3 className="text-lg font-semibold">
              {exercise.name}
            </h3>

            <div className="mt-2 space-y-2">
              {exercise.sets.map((set, index) => (
                <div
                  key={index}
                  className="flex gap-6 text-slate-300"
                >
                  <span>
                    Set {index + 1}
                  </span>

                  <span>
                    {set.weight} kg
                  </span>

                  <span>
                    {set.reps} reps
                  </span>

                  <span>
                    RPE {set.rpe}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WorkoutSessionCard;