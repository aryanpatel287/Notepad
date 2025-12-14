import { useEffect, useState } from "react";
import {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
} from "../services/noteApi";

const Dashboard = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch notes on load
  useEffect(() => {
    const fetchAllNotes = async () => {
      const res = await getNotes();
      setNotes(res.data);
      setLoading(false);
    };
    fetchAllNotes();
  }, []);

  // Create note
  const handleCreate = async (noteData) => {
    const res = await createNote(noteData);
    setNotes((prev) => [res.data, ...prev]);
  };

  // Update note
  const handleUpdate = async (id, noteData) => {
    const res = await updateNote(id, noteData);
    setNotes((prev) => prev.map((note) => (note._id === id ? res.data : note)));
  };

  // Delete note
  const handleDelete = async (id) => {
    await deleteNote(id);
    setNotes((prev) => prev.filter((note) => note._id !== id));
  };

  if (loading) return <p>Loading...</p>;

  return <>{/* UI components added by aryan*/}</>;
};

export default Dashboard;
