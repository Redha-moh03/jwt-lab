import { getAllEntries } from "../services/entries.service";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router";
function AllEntries() {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState("");
  const { user } = useAuth();
  async function loadAllEntries() {
    try {
      const response = await getAllEntries();
      setEntries(response);
    } catch (err) {
      setError(err.response.data.message);
    }
  }
  useEffect(() => {
    loadAllEntries();
  }, []);
  return (
    <div>
      <h1>All entries</h1>
      {entries.map((oneEntry) => {
        return (
          <div key={oneEntry._id}>
            <p>{oneEntry.title}</p>
            {oneEntry.owner === user._id ? (
              <>
                <button>delete entry</button>
                <Link to={`/my-entries/${oneEntry._id}`}>edit entry</Link>
              </>
            ) : null}
          </div>
        );
      })}
      <p>{error}</p>
    </div>
  );
}

export default AllEntries;
