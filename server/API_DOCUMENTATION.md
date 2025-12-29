# Notepad Server API Documentation

## Overview
RESTful API for managing notes with full CRUD operations.

## Base URL
```
http://localhost:5000
```

## Endpoints

### 1. Health Check
**GET /** 
Returns server status.

**Response:**
```
Backend server is running
```

---

### 2. Get All Notes
**GET /api/notes**

Retrieves all notes ordered by creation date (newest first).

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Sample Note",
      "content": "This is a sample note",
      "created_at": "2025-12-29T10:00:00.000Z",
      "updated_at": "2025-12-29T10:00:00.000Z"
    }
  ],
  "message": "Notes fetched successfully"
}
```

---

### 3. Get Single Note
**GET /api/notes/:id**

Retrieves a specific note by ID.

**Parameters:**
- `id` (number) - Note ID

**Response (Success):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Sample Note",
    "content": "This is a sample note",
    "created_at": "2025-12-29T10:00:00.000Z",
    "updated_at": "2025-12-29T10:00:00.000Z"
  },
  "message": "Note fetched successfully"
}
```

**Response (Not Found):**
```json
{
  "success": false,
  "data": null,
  "message": "Note not found"
}
```

---

### 4. Create Note
**POST /api/notes**

Creates a new note.

**Request Body:**
```json
{
  "title": "My New Note",
  "content": "Note content here"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 2,
    "title": "My New Note",
    "content": "Note content here",
    "created_at": "2025-12-29T10:30:00.000Z",
    "updated_at": "2025-12-29T10:30:00.000Z"
  },
  "message": "Note created successfully"
}
```

**Validation:**
- Both `title` and `content` are required

---

### 5. Update Note
**PUT /api/notes/:id**

Updates an existing note.

**Parameters:**
- `id` (number) - Note ID

**Request Body:**
```json
{
  "title": "Updated Title",
  "content": "Updated content"
}
```

**Response (Success):**
```json
{
  "success": true,
  "data": null,
  "message": "Note updated successfully"
}
```

**Response (Not Found):**
```json
{
  "success": false,
  "data": null,
  "message": "Note not found"
}
```

**Validation:**
- Both `title` and `content` are required

---

### 6. Delete Note
**DELETE /api/notes/:id**

Deletes a note.

**Parameters:**
- `id` (number) - Note ID

**Response (Success):**
```json
{
  "success": true,
  "data": null,
  "message": "Note deleted successfully"
}
```

**Response (Not Found):**
```json
{
  "success": false,
  "data": null,
  "message": "Note not found"
}
```

---

## Error Responses

All endpoints may return the following error responses:

**400 Bad Request:**
```json
{
  "success": false,
  "data": null,
  "message": "Invalid note ID" // or validation error message
}
```

**404 Not Found:**
```json
{
  "success": false,
  "data": null,
  "message": "Note not found"
}
```

**500 Internal Server Error:**
```json
{
  "success": false,
  "data": null,
  "message": "Failed to [operation] note"
}
```

---

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Database
Update `.env` file with your MySQL credentials:
```env
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=notepad_db
PORT=5000
```

### 3. Initialize Database
```bash
npm run init-db
```

### 4. Start Server
```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

---

## Database Troubleshooting

If you encounter database connection issues:

1. **Check MySQL Service:**
   ```bash
   # Windows
   Get-Service -Name *mysql*
   
   # If stopped, start it:
   Start-Service MySQL80
   ```

2. **Verify MySQL Port:**
   - Default port should be 3306
   - Check `my.ini` (Windows) or `my.cnf` (Linux/Mac)
   - Update `DB_PORT` in `.env` if different

3. **Test MySQL Connection:**
   ```bash
   mysql -u root -p
   ```

4. **Check Firewall:**
   - Ensure port 3306 is not blocked
   - MySQL should accept connections from localhost

5. **Verify Credentials:**
   - Ensure DB_USER has proper permissions
   - Password in `.env` should match MySQL user password

---

## Testing with cURL

### Get all notes:
```bash
curl http://localhost:5000/api/notes
```

### Create a note:
```bash
curl -X POST http://localhost:5000/api/notes \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Note","content":"Test content"}'
```

### Get specific note:
```bash
curl http://localhost:5000/api/notes/1
```

### Update note:
```bash
curl -X PUT http://localhost:5000/api/notes/1 \
  -H "Content-Type: application/json" \
  -d '{"title":"Updated","content":"Updated content"}'
```

### Delete note:
```bash
curl -X DELETE http://localhost:5000/api/notes/1
```

---

## Project Structure

```
server/
├── app.js                    # Express app configuration
├── server.js                 # Server entry point
├── package.json              # Dependencies
├── .env                      # Environment variables
├── controllers/
│   └── noteController.js     # Note business logic
├── routes/
│   └── noteRoutes.js        # API routes
├── src/
│   ├── config/
│   │   └── db.js            # Database connection
│   └── models/
│       └── Note.js          # Note model
├── db/
│   ├── database.js          # Database pool (deprecated)
│   ├── init_db.js          # Database initialization script
│   └── schema.sql          # Database schema
└── middlewares/
    └── errorMiddlewares.js  # Error handling
```

---

## Technologies Used

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MySQL2** - Database driver
- **dotenv** - Environment configuration
- **cors** - Cross-origin resource sharing
- **nodemon** - Development auto-reload
