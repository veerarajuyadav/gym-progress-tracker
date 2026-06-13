import { useState, useEffect } from "react";

function Workouts() {
  const [exercise, setExercise] = useState("");
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");
  const [rpe, setRpe] = useState("");

  const [workouts, setWorkouts] = useState(() => {
    const savedWorkouts =
      localStorage.getItem("workouts");

    return savedWorkouts
      ? JSON.parse(savedWorkouts)
      : [];
  });

  useEffect(() => {
    localStorage.setItem(
      "workouts",
      JSON.stringify(workouts)
    );
  }, [workouts]);

  const addWorkout = () => {
    if (
      !exercise ||
      !sets ||
      !reps ||
      !weight
    )
      return;

    const newWorkout = {
      id: Date.now(),
      exercise,
      sets,
      reps,
      weight,
      rpe,
      date: new Date().toLocaleDateString(),
    };

    setWorkouts([newWorkout, ...workouts]);

    setExercise("");
    setSets("");
    setReps("");
    setWeight("");
    setRpe("");
  };

  const deleteWorkout = (id) => {
    setWorkouts(
      workouts.filter(
        (workout) => workout.id !== id
      )
    );
  };

  return (
    <div>
      <h1 className="text-3xl font-bold">
        Workout Logger
      </h1>

      <div className="grid grid-cols-2 gap-4 mt-6 max-w-3xl">
        <input
          type="text"
          placeholder="Exercise"
          value={exercise}
          onChange={(e) =>
            setExercise(e.target.value)
          }
          className="bg-slate-900 border border-slate-700 rounded-lg px-4 py-2"
        />

        <input
          type="number"
          placeholder="Sets"
          value={sets}
          onChange={(e) =>
            setSets(e.target.value)
          }
          className="bg-slate-900 border border-slate-700 rounded-lg px-4 py-2"
        />

        <input
          type="number"
          placeholder="Reps"
          value={reps}
          onChange={(e) =>
            setReps(e.target.value)
          }
          className="bg-slate-900 border border-slate-700 rounded-lg px-4 py-2"
        />

        <input
          type="number"
          placeholder="Weight (kg)"
          value={weight}
          onChange={(e) =>
            setWeight(e.target.value)
          }
          className="bg-slate-900 border border-slate-700 rounded-lg px-4 py-2"
        />

        <input
          type="number"
          placeholder="RPE"
          value={rpe}
          onChange={(e) =>
            setRpe(e.target.value)
          }
          className="bg-slate-900 border border-slate-700 rounded-lg px-4 py-2"
        />
      </div>

      <button
        onClick={addWorkout}
        className="mt-4 bg-green-500 hover:bg-green-600 px-5 py-2 rounded-lg font-medium"
      >
        Add Exercise
      </button>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">
          Workout History
        </h2>

        <div className="space-y-3">
          {workouts.map((workout) => (
            <div
              key={workout.id}
              className="bg-slate-900 border border-slate-800 rounded-lg p-4 flex justify-between"
            >
              <div>
                <p className="font-semibold">
                  {workout.exercise}
                </p>

                <p className="text-slate-300">
                  {workout.sets} ×{" "}
                  {workout.reps} @{" "}
                  {workout.weight} kg
                </p>

                <p className="text-slate-400 text-sm">
                  RPE {workout.rpe}
                </p>

                <p className="text-slate-500 text-sm">
                  {workout.date}
                </p>
              </div>

              <button
                onClick={() =>
                  deleteWorkout(workout.id)
                }
                className="text-red-500"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Workouts;