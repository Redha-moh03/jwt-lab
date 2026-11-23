import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { createAEntry } from "../services/entries.service";
import { useAuth } from "../context/AuthContext";
function CreateEntry() {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: "",
    entryBody: "",
    isPublic: false,
  });
  const navigate = useNavigate();
  const [error, setError] = useState("");

  function handleChange(event) {
    try {
      const { name, type, value, checked } = event.target;

      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    } catch (err) {
      setError(err.response.data.message);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      await createAEntry(formData);
      navigate("/my-entries");
    } catch (err) {
      setError(err.response.data.message);
    }
  }

  return (
    <div>
      <h1>Create a entry</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          value={formData.title}
          name="title"
          onChange={handleChange}
          required
        ></input>
        <label htmlFor="entryBody">Entry</label>
        <input
          type="text"
          id="entryBody"
          value={formData.entryBody}
          name="entryBody"
          onChange={handleChange}
          required
        ></input>
        <label htmlFor="isPublic">Public entry</label>
        <input
          type="checkBox"
          id="isPublic"
          value={formData.isPublic}
          name="isPublic"
          onChange={handleChange}
        ></input>
        <button>Create entry</button>
      </form>
      <p>{error}</p>
    </div>
  );
}

export default CreateEntry;
