import { useState } from "react";

function WorkoutCard({
  workout,
  onDelete,
  onUpdate,
}) {
  const [showDetails, setShowDetails] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [editedName, setEditedName] = useState(workout.workoutName);
  const [editedDate, setEditedDate] = useState(workout.date);

  const [editingExerciseId, setEditingExerciseId] = useState(null);
  const [editedExerciseName, setEditedExerciseName] = useState("");

  const [editingSetId, setEditingSetId] = useState(null);
  const [editedWeight, setEditedWeight] = useState("");
  const [editedReps, setEditedReps] = useState("");
  const [editedRpe, setEditedRpe] = useState("");

  const [addingSetExerciseId, setAddingSetExerciseId] = useState(null);
  const [newWeight, setNewWeight] = useState("");
  const [newReps, setNewReps] = useState("");
  const [newRpe, setNewRpe] = useState("");

  const [addingExercise, setAddingExercise] = useState(false);
  const [newExerciseName, setNewExerciseName] = useState("");

  const saveChanges = () => {
    onUpdate({
      ...workout,
      workoutName: editedName,
      date: editedDate,
    });
    setIsEditing(false);
  };

  const deleteExercise = (exerciseId) => {
    onUpdate({
      ...workout,
      exercises: workout.exercises.filter(
        (exercise) => exercise.id !== exerciseId
      ),
    });
  };

  const deleteSet = (exerciseId, setId) => {
    onUpdate({
      ...workout,
      exercises: workout.exercises.map((exercise) => {
        if (exercise.id !== exerciseId) return exercise;

        return {
          ...exercise,
          sets: exercise.sets.filter((set) => set.id !== setId),
        };
      }),
    });
  };

  const saveExerciseName = (exerciseId) => {
    onUpdate({
      ...workout,
      exercises: workout.exercises.map((exercise) => {
        if (exercise.id !== exerciseId) return exercise;

        return {
          ...exercise,
          name: editedExerciseName,
        };
      }),
    });

    setEditingExerciseId(null);
    setEditedExerciseName("");
  };

  const saveSetChanges = (exerciseId, setId) => {
    onUpdate({
      ...workout,
      exercises: workout.exercises.map((exercise) => {
        if (exercise.id !== exerciseId) return exercise;

        return {
          ...exercise,
          sets: exercise.sets.map((set) => {
            if (set.id !== setId) return set;

            return {
              ...set,
              weight: editedWeight,
              reps: editedReps,
              rpe: editedRpe,
            };
          }),
        };
      }),
    });

    setEditingSetId(null);
    setEditedWeight("");
    setEditedReps("");
    setEditedRpe("");
  };

  const addSetToExercise = (exerciseId) => {
    if (!newWeight || !newReps || !newRpe) return;

    onUpdate({
      ...workout,
      exercises: workout.exercises.map((exercise) => {
        if (exercise.id !== exerciseId) return exercise;

        return {
          ...exercise,
          sets: [
            ...exercise.sets,
            {
              id: Date.now(),
              weight: newWeight,
              reps: newReps,
              rpe: newRpe,
            },
          ],
        };
      }),
    });

    setAddingSetExerciseId(null);
    setNewWeight("");
    setNewReps("");
    setNewRpe("");
  };

  const addExerciseToWorkout = () => {
    if (!newExerciseName.trim()) return;

    onUpdate({
      ...workout,
      exercises: [
        ...workout.exercises,
        {
          id: Date.now(),
          name: newExerciseName,
          sets: [],
        },
      ],
    });

    setNewExerciseName("");
    setAddingExercise(false);
  };

  return (
    <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          {isEditing ? (
            <div className="space-y-3">
              <input
                type="text"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 w-full"
              />

              <input
                type="date"
                value={editedDate}
                onChange={(e) => setEditedDate(e.target.value)}
                className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2"
              />

              <button
                onClick={saveChanges}
                className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg"
              >
                Save Changes
              </button>
            </div>
          ) : (
            <>
              <h3 className="text-xl font-bold">{workout.workoutName}</h3>
              <p className="text-slate-400">{workout.date}</p>
              <p className="mt-2 text-green-400">
                {workout.exercises.length} Exercises
              </p>
            </>
          )}
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="text-blue-400"
          >
            {showDetails ? "Hide" : "View"}
          </button>

          <button
            onClick={() => setIsEditing(!isEditing)}
            className="text-yellow-400"
          >
            Edit
          </button>

          <button
            onClick={() => onDelete(workout.id)}
            className="text-red-500"
          >
            Delete
          </button>
        </div>
      </div>

      {showDetails && (
        <div className="mt-6 space-y-6">
          {workout.exercises.map((exercise) => (
            <div key={exercise.id} className="bg-slate-900 rounded-lg p-4">
              <div className="flex justify-between items-center mb-3">
                {editingExerciseId === exercise.id ? (
                  <div className="flex gap-2 w-full">
                    <input
                      type="text"
                      value={editedExerciseName}
                      onChange={(e) =>
                        setEditedExerciseName(e.target.value)
                      }
                      className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 flex-1"
                    />

                    <button
                      onClick={() => saveExerciseName(exercise.id)}
                      className="text-green-400"
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <>
                    <h4 className="font-bold text-lg">{exercise.name}</h4>

                    <div className="flex gap-3">
                      <button
                        onClick={() => {
                          setEditingExerciseId(exercise.id);
                          setEditedExerciseName(exercise.name);
                        }}
                        className="text-yellow-400"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() =>
                          setAddingSetExerciseId(exercise.id)
                        }
                        className="text-green-400"
                      >
                        Add Set
                      </button>

                      <button
                        onClick={() => deleteExercise(exercise.id)}
                        className="text-red-500"
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>

              {exercise.sets.map((set, index) => (
                <div key={set.id} className="flex justify-between py-2">
                  {editingSetId === set.id ? (
                    <div className="flex gap-2 flex-wrap">
                      <input
                        type="number"
                        value={editedWeight}
                        onChange={(e) => setEditedWeight(e.target.value)}
                        className="bg-slate-800 border border-slate-700 rounded px-2 py-1 w-24"
                      />

                      <input
                        type="number"
                        value={editedReps}
                        onChange={(e) => setEditedReps(e.target.value)}
                        className="bg-slate-800 border border-slate-700 rounded px-2 py-1 w-24"
                      />

                      <input
                        type="number"
                        value={editedRpe}
                        onChange={(e) => setEditedRpe(e.target.value)}
                        className="bg-slate-800 border border-slate-700 rounded px-2 py-1 w-24"
                      />

                      <button
                        onClick={() =>
                          saveSetChanges(exercise.id, set.id)
                        }
                        className="text-green-400"
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    <>
                      <span>
                        Set {index + 1} • {set.weight}kg • {set.reps} reps • RPE {set.rpe}
                      </span>

                      <div className="flex gap-3">
                        <button
                          onClick={() => {
                            setEditingSetId(set.id);
                            setEditedWeight(set.weight);
                            setEditedReps(set.reps);
                            setEditedRpe(set.rpe);
                          }}
                          className="text-yellow-400"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => deleteSet(exercise.id, set.id)}
                          className="text-red-500"
                        >
                          Delete
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}

              {addingSetExerciseId === exercise.id && (
                <div className="mt-4 flex gap-2 flex-wrap">
                  <input
                    type="number"
                    placeholder="Weight"
                    value={newWeight}
                    onChange={(e) => setNewWeight(e.target.value)}
                    className="bg-slate-800 border border-slate-700 rounded px-2 py-1 w-24"
                  />

                  <input
                    type="number"
                    placeholder="Reps"
                    value={newReps}
                    onChange={(e) => setNewReps(e.target.value)}
                    className="bg-slate-800 border border-slate-700 rounded px-2 py-1 w-24"
                  />

                  <input
                    type="number"
                    placeholder="RPE"
                    value={newRpe}
                    onChange={(e) => setNewRpe(e.target.value)}
                    className="bg-slate-800 border border-slate-700 rounded px-2 py-1 w-24"
                  />

                  <button
                    onClick={() => addSetToExercise(exercise.id)}
                    className="text-green-400"
                  >
                    Save Set
                  </button>
                </div>
              )}
            </div>
          ))}

          <div className="border-t border-slate-700 pt-4">
            {addingExercise ? (
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Exercise Name"
                  value={newExerciseName}
                  onChange={(e) => setNewExerciseName(e.target.value)}
                  className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 flex-1"
                />

                <button
                  onClick={addExerciseToWorkout}
                  className="text-green-400"
                >
                  Save Exercise
                </button>
              </div>
            ) : (
              <button
                onClick={() => setAddingExercise(true)}
                className="text-green-400 font-semibold"
              >
                + Add Exercise
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default WorkoutCard;
