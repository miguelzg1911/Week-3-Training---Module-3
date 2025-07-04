# Week-3-Training---Module-3

# Product Management

This project is a product management tool that includes:

- A **CLI application** (`gestion_api.js`) to perform CRUD operations on products via a JSON REST API.
- A **simple web interface** (`index.html` + `script.js` + CSS in `Styles/styles.css`) to interact with the same API.
- A backend API simulated with [json-server](https://github.com/typicode/json-server) serving the `db.json` file.

---

## Project Structure

Entrenamiento.Semana3-Modulo3/
├── node_modules/ # Dependencies folder
├── Styles/
│ └── styles.css # CSS styles for web interface
├── .gitignore
├── db.json # JSON database file for json-server
├── gestion_api.js # CLI app for product CRUD operations
├── index.html # Web frontend
├── package-lock.json
├── package.json
├── script.js # JS for web frontend logic


---

## Prerequisites

- [Node.js](https://nodejs.org/) (v14 or later recommended)
- npm (comes with Node.js)
- `json-server` package (installed locally or globally)

---

## Setup and Running Instructions

### 1. Install dependencies

From inside the project root `Entrenamiento.Semana3-Modulo3`, run:

``bash
npm install

This will install the required packages including node-fetch.

### 2. Start the JSON Server API

Run this command to launch the API server, which serves data from db.json:

npx json-server --watch db.json --port 3000

You should see output indicating the server is running at http://localhost:3000.

### 3. Running the CLI application

Open a new terminal (keeping JSON Server running), and execute:

node gestion_api.js

Follow the interactive menu to list, create, update, or delete products.

### 4. Using the Web Frontend

Open index.html in your browser (you can simply open the file or serve it with a simple HTTP server).

The web interface connects to the JSON Server API at http://localhost:3000/products to manage products.
Notes

    Make sure json-server is running before using either the CLI app or the web interface.

    The API endpoint is set to http://localhost:3000/products in both gestion_api.js and script.js. If you change the port or API URL, update both files accordingly.

    To install json-server globally for convenience, run:

npm install -g json-server

Then you can start it with:

json-server --watch db.json --port 3000
