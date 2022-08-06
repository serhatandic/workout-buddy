import { useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";


const WorkoutForm = () => {
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const { dispatch } = useWorkoutsContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const workout = { title, load, reps };

    const response = await fetch("/api/workouts", {
      method: "POST",
      body: JSON.stringify(workout),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields)
    }
    if (response.ok) {
      setError(null);
      setTitle("");
      setLoad("");
      setReps("");

      dispatch({ type: "CREATE_WORKOUT", payload: json });
      console.log("new workout added");
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Workout</h3>

      <label>Exercise Title</label>
      <input
        type="text"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
        className={emptyFields.includes("title") ? "error" : ""}
      ></input>

      <label>Load in (kg)</label>
      <input
        type="number"
        value={load}
        onChange={(e) => {
          setLoad(e.target.value);
        }}
        className={emptyFields.includes("load") ? "error" : ""}
      ></input>

      <label>Reps</label>
      <input
        type="number"
        value={reps}
        onChange={(e) => {
          setReps(e.target.value);
        }}
        className={emptyFields.includes("reps") ? "error" : ""}
      ></input>

      <button>Add Workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default WorkoutForm;
