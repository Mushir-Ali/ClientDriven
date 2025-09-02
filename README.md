
# ClientDriven

A modern task management dashboard built with React, Tailwind CSS, Node.js, and MongoDB, allowing users to manage tasks, create new tasks, and handle authentication. Admin users can delete tasks, and all actions trigger beautiful toast notifications for better UX.


## Features
- User Authentication

- Sign up with name, email, password, and role (Developer / Manager / Client)

- Login with email and password

- JWT-based authentication. One thing i need to mention here...i was authenticating using firebase. Due to time constraints, this project does not use Firebase for authentication or storage. Some redundancies might exist in the code or structure. I sincerely apologize to the reviewers for any inconvenience and hope the project still demonstrates the core functionality, UI design, and task management features effectively.

## Admin Role

- Admin privileges can only be assigned directly through the database.

- No frontend or API method exists to change a user’s role to admin.

- Admin can delete and edit anyone's tasks, on the other hand user can only update/modify his own tasks. He can't delete tasks as for the case of admin.

## Tech Stack

- Frontend: React, React Router, Tailwind CSS, Lucide Icons, react-hot-toast

- Backend: Node.js, Express.js, MongoDB, Mongoose

- Authentication: JWT (JSON Web Token)
## Backend

Install my-project with npm

```bash
  git clone <your-repo-url>
  cd backend

  npm install
```
    
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`MONGO_URI=<your-mongodb-uri>`

`JWT_SECRET=<your-secret-key>`

`PORT=3000`

## Start backend server

Run backend server by this command

```bash
  nodemon server.js
```

## Frontend

Run frontend server by this command

```bash
  npm run dev
```


## Project Structure

frontend/
│
├─ src/
│ ├─ components/
│ │ ├─ Navbar.jsx
│ │
│ ├─ pages/
│ │ ├─ Dashboard.jsx
│ │ └─ Form.jsx
│ │
│ └─ App.jsx
│

backend/
│ ├─ controllers/
│ │ ├─ TaskController.js
│ │ └─ AuthController.js
│ ├─ models/
│ │ ├─ Task.js
│ │ └─ User.js
│ └─ routes/
│ ├─ taskRoutes.js
│ └─ authRoutes.js


## Future improvements
- Drag-and-drop task reordering
- Task deadlines and reminders
- User role management with more permissions
- Dark mode support
