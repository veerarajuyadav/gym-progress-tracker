import { useState, useEffect } from "react";

function BodyWeight() {
  const [weight, setWeight] = useState("");

  const [weights, setWeights] = useState(() => {
    const savedWeights = localStorage.getItem("weights");
    return savedWeights ? JSON.parse(savedWeights) : [];
  });

  useEffect(() => {
    localStorage.setItem(
      "weights",
      JSON.stringify(weights)
    );
  }, [weights]);

  const addWeight = () => {
    if (!weight) return;

    const newEntry = {
      id: Date.now(),
      value: weight,
      date: new Date().toLocaleDateString(),
    };

    setWeights([newEntry, ...weights]);
    setWeight("");
  };

  const deleteWeight = (id) => {
    setWeights(
      weights.filter(
        (entry) => entry.id !== id
      )
    );
  };

  return (
    <div>
      <h1 className="text-3xl font-bold">
        Body Weight Tracker
      </h1>

      <div className="mt-6 flex gap-4">
        <input
          type="number"
          placeholder="Enter weight (kg)"
          value={weight}
          onChange={(e) =>
            setWeight(e.target.value)
          }
          className="bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 w-64"
        />

        <button
          onClick={addWeight}
          className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg font-medium"
        >
          Add Weight
        </button>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">
          Weight History
        </h2>

        <div className="space-y-3">
          {weights.map((entry) => (
            <div
              key={entry.id}
              className="bg-slate-900 border border-slate-800 rounded-lg p-4 flex justify-between"
            >
              <div>
                <p className="font-medium">
                  {entry.value} kg
                </p>

                <p className="text-slate-400 text-sm">
                  {entry.date}
                </p>
              </div>

              <button
                onClick={() =>
                  deleteWeight(entry.id)
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

export default BodyWeight;