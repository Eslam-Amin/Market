
# Market Documentation

Welcome to the Market API repository. Below you'll find documentation on the API endpoints, setup instructions, databases used, middleware employed, and Examples of post requests.

## API Versions

Two versions of the API exist with the same endpoints:

1. **versionNo1 (v1):** Fetches data from MongoDB.
2. **versionNo2 (v2):** Fetches data from MySQL.

## Main Endpoints

- `{{URL}}/market/v{versionNo}/users`
- `{{URL}}/market/v{versionNo}/branches`
- `{{URL}}/market/v{versionNo}/products`
- `{{URL}}/market/v{versionNo}/receipts`

## Pre-requisites

To run the code:

- Bearer token authentication is required to access protected routes.
- For Version 1, run `node server.js`.
- For Version 2, run `node server-v2.js`.

## Databases

- Online MongoDB (Atlas) is used. Details are provided in the `.env` file.
- XAMPP is used locally to connect to the MySQL database. The exported database exists in the specified path:
  - Path: [marketMySQL.sql](https://github.com/Eslam-Amin/Market/blob/main/marketMySQL.sql)

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

7. **jsonwebtoken (JWT):**
   - Created a security layer with JWT to ensure routes are only accessible to authenticated and authorized users.


## Examples of POST Requests

### Branches

- **Create Branch**
  - `POST /market/v{versionNo}/branches`
  - Example Request Body:
    ```json
    {
      "name": "Central Branch",
      "address": "123 Main St, Springfield",
      "phone": "555-1234"
    }
    ```

### Cashiers

- **Create Cashier**
  - `POST /market/v{versionNo}/cashiers`
  - Example Request Body:
    ```json
    {
      "name": "John Doe",
      "email": "john.doe@example.com",
      "password": "securePassword123",
      "image": "base64ImageString",
      "branch": "Central Branch"
    }
    ```

### Products

- **Create Product**
  - `POST /market/v{versionNo}/products`
  - Example Request Body:
    ```json
    {
      "name": "Laptop",
      "category": "Electronics",
      "price": 1200.99,
      "image": "base64ImageString"
    }
    ```

### Receipts

- **Create Receipt**
  - `POST /market/v{versionNo}/receipts`
  - Example Request Body:
    ```json
    {
      "products": [
        {
          "name": "Laptop",
          "price": 1200.99,
          "category": "Electronics",
          "quantity": 1
        },
        {
          "name": "Mouse",
          "price": 25.50,
          "category": "Accessories",
          "quantity": 2
        }
      ]
    }
    ```
 
## Postman Collection

In the Postman collection, you'll find five folders:


1. **Auth:** Contains endpoints for user login.
2. **Products, Branches, Cashiers:** These folders house endpoints for CRUD operations under the supervision of the Admin for Products, Branches, and Cashiers.
3. **Receipts:** Only cashiers can create receipts.


You can test the APIs using the provided Postman collection. Download it [here](https://github.com/Eslam-Amin/Market/blob/main/Market.postman_collection.json).


## Future Work

To enhance the project further, consider the following:

- **Integration of ORM like Prisma:**
  - Consider adding an ORM layer like Prisma to simplify database interactions, especially with MySQL.
  - Prisma offers a modern database toolkit that makes it easy to handle CRUD operations and manage database schemas.
  - Integration of Prisma can streamline database interactions and improve code maintainability.
