import { getMyEntries } from "../services/entries.service";
import { useState, useEffect } from "react";
import { Link } from "react-router";
function myEntries() {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState("");

  async function loadEntries() {
    try {
      const response = await getMyEntries();
      setEntries(response);
    } catch (err) {
      setError(err.response.data.message);
    }
  }
  useEffect(() => {
    loadEntries();
  }, []);
  return (
    <div>
      <h1>My entries</h1>
      {entries.map((oneEntry) => (
        <div key={oneEntry._id}>
          <p>{oneEntry.title}</p>
          <p>{oneEntry.entryBody}</p>
          <button>Delete entry</button>
          <Link to={`/my-entries/${oneEntry._id}`}>Edit entry</Link>
        </div>
      ))}
      <p>{error}</p>
    </div>
  );
}

export default myEntries;
