

# Market Documentation

Welcome to the Market API repository. Below you'll find documentation on the API endpoints, setup instructions, databases used, and middleware employed.

## Postman Collection

In the Postman collection, you'll find five folders:

1. **Auth:** Contains endpoints for user login.
2. **Products, Branches, Cashiers:** These folders house endpoints for CRUD operations under the supervision of the Admin for Products, Branches, and Cashiers.
3. **Receipts:** Only cashiers can create receipts.

## API Versions

Two versions of the API exist with the same endpoints:

1. **versionNo1 (v1):** Fetches data from MongoDB.
2. **versionNo2 (v2):** Fetches data from MySQL.

## Main Endpoints

- `{{URL}}/market/v{versionNo}/users`
- `{{URL}}/market/v{versionNo}/branches`
- `{{URL}}/market/v{versionNo}/products`
- `{{URL}}/market/v{versionNo}/receipts`

## Prerequisites

To run the code:

- Bearer token authentication is required to access protected routes.
- For Version 1, run `node server.js`.
- For Version 2, run `node server-v2.js`.

## Databases

- Online MongoDB (Atlas) is used. Details are provided in the `.env` file.
- XAMPP is used locally to connect to the MySQL database. The exported database exists in the specified path.
Certainly, here's the updated section:

## Middlewares

### Error Handlers

Two types of error handlers are implemented:

- **Development:** Provides detailed error information like error stack and message.
- **Production:** Less detailed error information. Set `NODE_ENV=production` to switch to production mode.

### Implemented Middlewares:

1. **mongoSanitize():**
   - Protects against attacks tampering with database queries.
   - Cleans user input to prevent MongoDB database from malicious code.

2. **xss():**
   - Guards against XSS attacks.
   - Cleans user input to prevent harmful scripts from running in web pages.

3. **hpp():**
   - Prevents parameter pollution attacks.
   - Limits the number of query parameters a client can send, allowing only specified safe parameters.

4. **Multer():**
   - Handles file uploads in Node.js web applications.

5. **APIFeatures:**
   - Generic middleware to handle any kind of filtration, sorting on the data with MongoDB.

6. **APIFeatures-v2:**
   - Performs the same functionalities as APIFeatures but with a MySQL database.
