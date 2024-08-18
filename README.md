# AuthDK

AuthDK is a full-stack authentication system designed to handle user registration, login, and password management. It features a modern frontend built with React and a backend powered by NestJS. The application uses MongoDB for data storage and offers a seamless user experience with robust security practices.

## Features

- User registration and login
- Password reset and recovery
- Secure authentication with encryption
- Responsive and user-friendly UI

## Tech Stack

- **Frontend**: React, TypeScript, Redux, React Router
- **Backend**: NestJS, TypeScript
- **Database**: MongoDB

## Getting Started

### Frontend

1. **Clone the repository:**

   ```bash
   git clone https://github.com/diluwara/authdk.git
   ```

2. **Navigate to the frontend directory:**

   ```bash
   cd authdk/frontend
   ```

3. **Install dependencies:**

   ```bash
   npm install
   ```

4. **Start the frontend application:**

   ```bash
   npm run start:local
   ```

   This will run the frontend application locally. You can access it at `http://localhost:3000`.

### Backend

1. **Navigate to the backend directory:**

   ```bash
   cd authdk/backend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Create an `.env` file in the backend directory with the following content:**

   ```env
   MONGO_URI=<your_mongo_database_uri>
   ```

4. **Start the backend application:**

   ```bash
   npm run start
   ```

   This will start the backend server, which listens on `http://localhost:3001` by default.

## Configuration

- **Frontend**: Configured to connect to the backend API using relative paths.
- **Backend**: Connects to MongoDB using the `MONGO_URI` environment variable.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch for your changes.
3. Make your changes and commit them.
4. Open a pull request with a description of your changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.