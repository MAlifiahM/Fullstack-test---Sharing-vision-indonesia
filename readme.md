# Fullstack Test - Sharing Vision Indonesia

## Introduction

This project is built using modern web development technologies for both the frontend and backend to create a robust and
scalable web application.

## Technologies Used

### Frontend

- **React** (v18.3.1) - A JavaScript library for building user interfaces.
- **TypeScript** (v4.9.5) - A typed superset of JavaScript that compiles to plain JavaScript.
- **React Router DOM** (v6.26.1) - A collection of navigational components for React.
- **Tailwind CSS** (v3.4.10) - A utility-first CSS framework for rapid UI development.
- **Axios** (v1.7.5) - A promise-based HTTP client for the browser and Node.js.
- **React Toastify** (v10.0.5) - A library to add notifications to React applications.

### Backend

The backend is built using Go Fiber.

- **Go Fiber** - An Express-inspired web framework written in Go (Golang).

## Getting Started

### Prerequisites

- **Node.js** (v16.x or higher)
- **npm** (Node Package Manager)
- **Go** (v1.16 or higher)
- **MySQL** (v5.7 or higher)

### Installation

1. **Clone the repository**
    ```sh
    git clone https://github.com/your-username/your-repo-name.git
    ```
2. **Navigate to the project directory**
    ```sh
    cd your-repo-name
    ```
3. **Create a Database**
   - Use the MySQL client or any database management tool to create a new database. Make sure the database name matches
     the value specified in the `backend/.env.example` file under the variable `DB_DSN`.
    ```sh
    CREATE DATABASE your_database_name;
    ```
   Replace `your_database_name` with the name provided in the `.env.example` file.
4. **Install frontend dependencies**
    ```sh
    cd frontend
    npm install
    ```
5. **Install backend dependencies**
    ```sh
    cd ../backend
    go get
    ```

### Running the Application

#### Development Server

1. **Start the frontend**
    ```sh
    cd frontend
    npm start
    ```
   This will start the React development server, and your application will be running at `http://localhost:3000`.

2. **Start the backend**
    ```sh
    cd ../backend
    go run cmd/app/main.go
    ```
   This will start the Go Fiber server, and the backend API will be running at `http://localhost:5000`.

#### Production Build

1. **Build the project**
    ```sh
    cd frontend
    npm run build
    ```
   This will create an optimized production build of the frontend.

2. **Start the production server**
    ```sh
    cd ../backend
    go build -o server cmd/app/main.go
    ./server
    ```
   This will serve the production build using the Go Fiber server.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Make your changes and commit them (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a pull request.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.

## Contact

For any questions or suggestions, feel free to contact us at [your-email@example.com].