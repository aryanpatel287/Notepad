import { useState, useEffect } from 'react';
import NoteCard from '../components/NoteCard';
import NoteModal from '../components/NoteModal';
import '../styles/dashboard.css';

function Dashboard() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingNote, setEditingNote] = useState(null);

  // App Load Flow - Fetch notes on mount
  useEffect(() => {
    fetchNotes();
  }, []);

  // READ - Fetch all notes
  const fetchNotes = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/notes');
      if (!response.ok) throw new Error('Failed to fetch notes');
      const data = await response.json();
      setNotes(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      setNotes([]); // Show empty state instead of loading forever
    } finally {
      setLoading(false);
    }
  };

  // CREATE - Add new note
  const handleCreate = async (noteData) => {
    try {
      const response = await fetch('http://localhost:5000/api/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(noteData),
      });
      if (!response.ok) throw new Error('Failed to create note');
      const newNote = await response.json();
      setNotes([newNote, ...notes]); // Add to top
      setShowModal(false);
    } catch (err) {
      alert('Error creating note: ' + err.message);
    }
  };

  // UPDATE - Edit existing note
  const handleUpdate = async (id, noteData) => {
    try {
      const response = await fetch(`http://localhost:5000/api/notes/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(noteData),
      });
      if (!response.ok) throw new Error('Failed to update note');
      const updatedNote = await response.json();
      setNotes(notes.map((note) => (note._id === id ? updatedNote : note)));
      setShowModal(false);
      setEditingNote(null);
    } catch (err) {
      alert('Error updating note: ' + err.message);
    }
  };

  // DELETE - Remove note
  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this note?')) return;
    
    try {
      const response = await fetch(`http://localhost:5000/api/notes/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete note');
      setNotes(notes.filter((note) => note._id !== id));
    } catch (err) {
      alert('Error deleting note: ' + err.message);
    }
  };

  // UI Actions
  const openCreateModal = () => {
    setEditingNote(null);
    setShowModal(true);
  };

  const openEditModal = (note) => {
    setEditingNote(note);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingNote(null);
  };

  if (loading) {
    return (
      <div className="dashboard">
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading your notes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>My Notes</h1>
        <button className="btn-add" onClick={openCreateModal}>
          <span className="icon">+</span>
          New Note
        </button>
      </header>

      {error && (
        <div className="error-banner">
          <p>⚠️ {error}</p>
          <p className="error-hint">Make sure the backend server is running on port 5000</p>
        </div>
      )}

      {notes.length === 0 && !error ? (
        <div className="empty-state">
          <div className="empty-icon">📝</div>
          <h2>No notes yet</h2>
          <p>Create your first note to get started</p>
          <button className="btn-primary" onClick={openCreateModal}>
            Create Note
          </button>
        </div>
      ) : (
        <div className="notes-grid">
          {notes.map((note) => (
            <NoteCard
              key={note._id}
              note={note}
              onEdit={() => openEditModal(note)}
              onDelete={() => handleDelete(note._id)}
            />
          ))}
        </div>
      )}

      {showModal && (
        <NoteModal
          note={editingNote}
          onSave={editingNote ? handleUpdate : handleCreate}
          onClose={closeModal}
        />
      )}
    </div>
  );
}

export default Dashboard;
