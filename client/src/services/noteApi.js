import axios from "axios";

const BASE_URL = "http://localhost:5000/api/notes";

export const getNotes = () => axios.get(BASE_URL);
export const createNote = (data) => axios.post(BASE_URL, data);
export const updateNote = (id, data) => axios.put(`${BASE_URL}/${id}`, data);
export const deleteNote = (id) => axios.delete(`${BASE_URL}/${id}`);
