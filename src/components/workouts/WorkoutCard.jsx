import { useState } from "react";

function WorkoutCard({
  workout,
  onDelete,
  onUpdate,
}) {
  const [showDetails, setShowDetails] =
    useState(false);

  const [isEditing, setIsEditing] =
    useState(false);

  const [editedName, setEditedName] =
    useState(workout.workoutName);

  const [editedDate, setEditedDate] =
    useState(workout.date);

  const [editingExerciseId, setEditingExerciseId] =
    useState(null);

  const [editedExerciseName, setEditedExerciseName] =
    useState("");

  const saveChanges = () => {
    const updatedWorkout = {
      ...workout,
      workoutName: editedName,
      date: editedDate,
    };

    onUpdate(updatedWorkout);
    setIsEditing(false);
  };

  const deleteExercise = (exerciseId) => {
    const updatedWorkout = {
      ...workout,
      exercises: workout.exercises.filter(
        (exercise) =>
          exercise.id !== exerciseId
      ),
    };

    onUpdate(updatedWorkout);
  };

  const deleteSet = (
    exerciseId,
    setId
  ) => {
    const updatedWorkout = {
      ...workout,
      exercises: workout.exercises.map(
        (exercise) => {
          if (
            exercise.id === exerciseId
          ) {
            return {
              ...exercise,
              sets: exercise.sets.filter(
                (set) =>
                  set.id !== setId
              ),
            };
          }

          return exercise;
        }
      ),
    };

    onUpdate(updatedWorkout);
  };

  const saveExerciseName = (
    exerciseId
  ) => {
    const updatedWorkout = {
      ...workout,
      exercises: workout.exercises.map(
        (exercise) => {
          if (
            exercise.id === exerciseId
          ) {
            return {
              ...exercise,
              name: editedExerciseName,
            };
          }

          return exercise;
        }
      ),
    };

    onUpdate(updatedWorkout);

    setEditingExerciseId(null);
    setEditedExerciseName("");
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
                onChange={(e) =>
                  setEditedName(
                    e.target.value
                  )
                }
                className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 w-full"
              />

              <input
                type="date"
                value={editedDate}
                onChange={(e) =>
                  setEditedDate(
                    e.target.value
                  )
                }
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
              <h3 className="text-xl font-bold">
                {workout.workoutName}
              </h3>

              <p className="text-slate-400">
                {workout.date}
              </p>

              <p className="mt-2 text-green-400">
                {workout.exercises.length} Exercises
              </p>
            </>
          )}
        </div>

        <div className="flex gap-4">
          <button
            onClick={() =>
              setShowDetails(
                !showDetails
              )
            }
            className="text-blue-400"
          >
            {showDetails
              ? "Hide"
              : "View"}
          </button>

          <button
            onClick={() =>
              setIsEditing(
                !isEditing
              )
            }
            className="text-yellow-400"
          >
            Edit
          </button>

          <button
            onClick={() =>
              onDelete(workout.id)
            }
            className="text-red-500"
          >
            Delete
          </button>
        </div>
      </div>

      {showDetails && (
        <div className="mt-6 space-y-6">
          {workout.exercises.map(
            (exercise) => (
              <div
                key={exercise.id}
                className="bg-slate-900 rounded-lg p-4"
              >
                <div className="flex justify-between items-center mb-3">
                  {editingExerciseId ===
                  exercise.id ? (
                    <div className="flex gap-2 w-full">
                      <input
                        type="text"
                        value={
                          editedExerciseName
                        }
                        onChange={(e) =>
                          setEditedExerciseName(
                            e.target.value
                          )
                        }
                        className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 flex-1"
                      />

                      <button
                        onClick={() =>
                          saveExerciseName(
                            exercise.id
                          )
                        }
                        className="text-green-400"
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    <>
                      <h4 className="font-bold text-lg">
                        {exercise.name}
                      </h4>

                      <div className="flex gap-3">
                        <button
                          onClick={() => {
                            setEditingExerciseId(
                              exercise.id
                            );

                            setEditedExerciseName(
                              exercise.name
                            );
                          }}
                          className="text-yellow-400"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() =>
                            deleteExercise(
                              exercise.id
                            )
                          }
                          className="text-red-500"
                        >
                          Delete
                        </button>
                      </div>
                    </>
                  )}
                </div>

                {exercise.sets.map(
                  (set, index) => (
                    <div
                      key={set.id}
                      className="flex justify-between py-2"
                    >
                      <span>
                        Set {index + 1}
                        {" • "}
                        {set.weight}kg
                        {" • "}
                        {set.reps} reps
                        {" • "}
                        RPE {set.rpe}
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
            )
          )}
        </div>
      )}
    </div>
  );
}

export default WorkoutCard;