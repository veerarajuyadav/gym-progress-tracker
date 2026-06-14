import { useState } from "react";

function WorkoutForm({ onSave }) {
  const [date, setDate] = useState("");
  const [workoutName, setWorkoutName] = useState("");
  const [session, setSession] = useState(null);

  const [exerciseName, setExerciseName] = useState("");
  const [exercises, setExercises] = useState([]);

  const [weight, setWeight] = useState("");
  const [reps, setReps] = useState("");
  const [rpe, setRpe] = useState("");

  const [selectedExerciseId, setSelectedExerciseId] = useState(null);

  const createSession = () => {
    if (!date || !workoutName) return;

    setSession({
      date,
      workoutName,
    });

    setDate("");
    setWorkoutName("");
  };

  const addExercise = () => {
    if (!exerciseName.trim()) return;

    const newExercise = {
      id: Date.now(),
      name: exerciseName,
      sets: [],
    };

    setExercises([...exercises, newExercise]);
    setExerciseName("");
  };

  const deleteExercise = (id) => {
    setExercises(
      exercises.filter(
        (exercise) => exercise.id !== id
      )
    );

    if (selectedExerciseId === id) {
      setSelectedExerciseId(null);
    }
  };

  const addSet = () => {
    if (
      !selectedExerciseId ||
      !weight ||
      !reps ||
      !rpe
    )
      return;

    setExercises(
      exercises.map((exercise) => {
        if (exercise.id === selectedExerciseId) {
          return {
            ...exercise,
            sets: [
              ...exercise.sets,
              {
                id: Date.now(),
                weight,
                reps,
                rpe,
              },
            ],
          };
        }

        return exercise;
      })
    );

    setWeight("");
    setReps("");
    setRpe("");
  };

  const deleteSet = (exerciseId, setId) => {
    setExercises(
      exercises.map((exercise) => {
        if (exercise.id === exerciseId) {
          return {
            ...exercise,
            sets: exercise.sets.filter(
              (set) => set.id !== setId
            ),
          };
        }

        return exercise;
      })
    );
  };

  const finishExercise = () => {
    setSelectedExerciseId(null);

    setWeight("");
    setReps("");
    setRpe("");
  };

  const finishWorkoutSession = () => {
  if (exercises.length === 0) {
    alert(
      "Add at least one exercise before finishing."
    );
    return;
  }

  const completedWorkout = {
    id: Date.now(),
    date: session.date,
    workoutName: session.workoutName,
    exercises,
  };

  onSave(completedWorkout);

  alert("Workout Session Saved!");

  setSession(null);
  setExercises([]);
  setSelectedExerciseId(null);

  setWeight("");
  setReps("");
  setRpe("");
};

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
      <h2 className="text-2xl font-bold mb-6">
        Create Workout Session
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="date"
          value={date}
          onChange={(e) =>
            setDate(e.target.value)
          }
          className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2"
        />

        <input
          type="text"
          placeholder="Workout Name"
          value={workoutName}
          onChange={(e) =>
            setWorkoutName(e.target.value)
          }
          className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2"
        />
      </div>

      <button
        onClick={createSession}
        className="mt-4 bg-green-500 hover:bg-green-600 px-5 py-2 rounded-lg font-medium"
      >
        Create Session
      </button>

      {session && (
        <div className="mt-8 border-t border-slate-800 pt-6">
          <h3 className="text-xl font-bold">
            {session.workoutName}
          </h3>

          <p className="text-slate-400 mt-1">
            {session.date}
          </p>

          {/* Add Exercise */}

          <div className="mt-6 flex gap-3">
            <input
              type="text"
              placeholder="Exercise Name"
              value={exerciseName}
              onChange={(e) =>
                setExerciseName(e.target.value)
              }
              className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 flex-1"
            />

            <button
              onClick={addExercise}
              className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg"
            >
              Add Exercise
            </button>
          </div>

          {/* Exercise List */}

          <div className="mt-6 space-y-6">
            {exercises.map((exercise) => (
              <div
                key={exercise.id}
                className="bg-slate-800 rounded-lg p-4"
              >
                <div className="flex justify-between items-center">
                  <h4 className="text-lg font-semibold">
                    {exercise.name}
                  </h4>

                  <button
                    onClick={() =>
                      deleteExercise(exercise.id)
                    }
                    className="text-red-500"
                  >
                    Delete Exercise
                  </button>
                </div>

                <div className="mt-3 flex gap-3">
                  <button
                    onClick={() =>
                      setSelectedExerciseId(
                        exercise.id
                      )
                    }
                    className="bg-green-500 hover:bg-green-600 px-3 py-1 rounded"
                  >
                    Add Sets
                  </button>

                  {selectedExerciseId ===
                    exercise.id && (
                    <button
                      onClick={finishExercise}
                      className="bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded"
                    >
                      Finish Exercise
                    </button>
                  )}
                </div>

                {exercise.sets.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {exercise.sets.map(
                      (set, index) => (
                        <div
                          key={set.id}
                          className="flex justify-between bg-slate-900 rounded-lg p-3"
                        >
                          <span>
                            Set {index + 1} •{" "}
                            {set.weight}kg •{" "}
                            {set.reps} reps •
                            {" "}RPE {set.rpe}
                          </span>

                          <button
                            onClick={() =>
                              deleteSet(
                                exercise.id,
                                set.id
                              )
                            }
                            className="text-red-500"
                          >
                            Delete
                          </button>
                        </div>
                      )
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {selectedExerciseId && (
            <div className="mt-8 bg-slate-800 rounded-lg p-4">
              <h4 className="font-semibold mb-4">
                Add Set
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <input
                  type="number"
                  placeholder="Weight"
                  value={weight}
                  onChange={(e) =>
                    setWeight(e.target.value)
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
                  placeholder="RPE"
                  value={rpe}
                  onChange={(e) =>
                    setRpe(e.target.value)
                  }
                  className="bg-slate-900 border border-slate-700 rounded-lg px-4 py-2"
                />
              </div>

              <button
                onClick={addSet}
                className="mt-4 bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg"
              >
                Add Set
              </button>
            </div>
          )}

          {session && exercises.length > 0 && (
            <button
              onClick={finishWorkoutSession}
              className="mt-8 bg-purple-600 hover:bg-purple-700 px-5 py-2 rounded-lg font-medium"
            >
              Finish Workout Session
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default WorkoutForm;