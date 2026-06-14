import { useState, useEffect } from "react";
import WorkoutForm from "../components/workouts/WorkoutForm";
import WorkoutHistory from "../components/workouts/WorkoutHistory";

function Workouts() {
  const [workouts, setWorkouts] = useState(() => {
    const saved = localStorage.getItem("workoutHistory");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(
      "workoutHistory",
      JSON.stringify(workouts)
    );
  }, [workouts]);

  const addWorkout = (workout) => {
    setWorkouts((prev) => [
      workout,
      ...prev,
    ]);
  };

  const deleteWorkout = (id) => {
    setWorkouts((prev) =>
      prev.filter(
        (workout) => workout.id !== id
      )
    );
  };

  const updateWorkout = (
    updatedWorkout
  ) => {
    setWorkouts((prev) =>
      prev.map((workout) =>
        workout.id === updatedWorkout.id
          ? updatedWorkout
          : workout
      )
    );
  };

  return (
    <div>
      <h1 className="text-3xl font-bold">
        Workout Sessions
      </h1>

      <p className="text-slate-400 mt-2">
        Create and track your workouts.
      </p>

      <div className="mt-8">
        <WorkoutForm
          onSave={addWorkout}
        />
      </div>

      <WorkoutHistory
        workouts={workouts}
        onDelete={deleteWorkout}
        onUpdate={updateWorkout}
      />
    </div>
  );
}

export default Workouts;