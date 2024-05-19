Here's a refined version of your README file for your GitHub repository:

---

# Market Documentation

Welcome to the Market API repository. Below, you'll find details about the API endpoints, their usage, and the setup instructions.

## Postman Collection

The Postman collection includes five folders:

1. **Auth**: Contains endpoints for user login.
2. **Products, Branches, Cashiers**: Contains endpoints for performing all CRUD operations on products, branches, and cashiers, managed by the Admin.
3. **Receipts**: Contains endpoints for cashiers to create receipts.

## API Versions

The API is available in two versions, each with the same endpoints:

1. **v1**: Fetches data from MongoDB.
2. **v2**: Fetches data from MySQL.

## Main Endpoints

Replace `{{URL}}` with your base URL and `{versionNo}` with the version number (1 or 2):

- `{{URL}}/market/v{versionNo}/users`
- `{{URL}}/market/v{versionNo}/branches`
- `{{URL}}/market/v{versionNo}/products`
- `{{URL}}/market/v{versionNo}/receipts`

## Prerequisites

- Bearer token authentication is required to access protected routes.
- To start the server for version 1, run: `node server.js`
- To start the server for version 2, run: `node server-v2.js`

## Databases

- **MongoDB**: An online MongoDB (Atlas) database is used. Details are provided in the `.env` file.
- **MySQL**: XAMPP is used on a local machine to connect to the MySQL database. The exported database exists in the specified path (please provide the path).

---

