// models/user.js
const pool = require('../database');
const bcrypt = require('bcrypt');
const genericFeatures = require("../../utils/apiFeatures-v2")


const createCashierDatabase = async () => {
    const query = ` 
    CREATE TABLE IF NOT EXISTS market.cashiers (
        id int(11) NOT NULL PRIMARY KEY,
        name varchar(50) NOT NULL,
        email varchar(100) NOT NULL UNIQUE,
        password varchar(255) NOT NULL,
        image varchar(255) DEFAULT NULL,
        branch int(11) NOT NULL,
        isDeleted tinyint(1) DEFAULT 0,
        FOREIGN KEY (branch) REFERENCES branch(id)
    );
`
    console.log("cashier database created")
    await pool.query(query);

}

const createAdminDatabase = async () => {
    const query = `
          CREATE TABLE IF NOT EXISTS market.admins(
            id int(11) NOT NULL PRIMARY KEY,
            name varchar(50) NOT NULL,
            email varchar(100) NOT NULL UNIQUE,
            password varchar(255) NOT NULL,
            isDeleted tinyint(1) DEFAULT 0
        );
            `
    console.log("admin database created")
    await pool.query(query);
}


// (async () => {
//     await createCashierDatabase()
// })();
// (async () => {
//     await createAdminDatabase()
// })();






const createCashier = async (name, email, password, image, branch) => {
    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await pool.query(
        'INSERT INTO cashiers (name, email, password, image, branch) VALUES (?, ?, ?, ?, ?)',
        [name, email, hashedPassword, image, branch]
    );
    return { id: result.insertId, name, email, image, branch };
};

const findCashierByEmail = async (email) => {
    const [rows] = await pool.query(
        'SELECT id, name, email, password, branch FROM cashiers WHERE email = ? and isDeleted = false',
        [email]
    );
    return rows[0];
};

const findAdminByEmail = async (email) => {
    const [rows] = await pool.query(
        'SELECT id, name, email, password FROM admins WHERE email = ?',
        [email]
    );
    return rows[0];
};

const findAdminById = async (id) => {
    const [rows] = await pool.query(
        'SELECT id, name, email FROM admins WHERE id = ?',
        [id]
    );
    return rows[0];
};

const findCashierById = async (id) => {
    const [rows] = await pool.query(
        'SELECT id, name, email, branch FROM cashiers WHERE id = ? and isDeleted = false',
        [id]
    );
    return rows[0];
};

const findCashierByField = async (field, value) => {
    const [rows] = await pool.query(
        `SELECT id, name, email, branch FROM cashiers WHERE ${field} = ${value} and isDeleted = false`,
        [value]
    );
    return rows[0];
}
const findAllCashiers = async (requestQuery) => {
    const { query, queryParams } = genericFeatures(requestQuery, "cashiers", " id, name, email, image, branch ")

    const [rows] = await pool.query(
        query, queryParams
    );
    return rows;
};

const findByIdAndUpdate = async (id, updateFields) => {
    let updateQuery = 'UPDATE cashiers SET ';
    const values = [];

    // Dynamically construct the query based on updateFields object
    for (const field in updateFields) {
        updateQuery += `${field} = ?, `;
        values.push(updateFields[field]);
    }

    // Remove the trailing comma and space
    updateQuery = updateQuery.slice(0, -2);
    updateQuery += ' WHERE id = ?';
    values.push(id);
    await pool.query(updateQuery, values)
    const cashier = findCashierById(id)

    return cashier;
}

const findByIdAndDelete = async (id) => {
    const updateQuery = 'UPDATE cashiers SET isDeleted = true WHERE id = ? and isDeleted = false';

    // Values to update
    const [rows] = await pool.query(updateQuery, [id])
    return rows[0]
}


module.exports = {
    createCashier,
    findCashierByEmail,
    findCashierById,
    findAllCashiers,
    findAdminByEmail,
    findByIdAndUpdate,
    findAdminById,
    findByIdAndDelete,
    findCashierByField
};
