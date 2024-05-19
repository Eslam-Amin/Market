const AppError = require('../../utils/appError');
const pool = require('../database');




const createBranchDatabase = async () => {
    const query = ` 
    CREATE TABLE IF NOT EXISTS market.branches (
        id int(11) NOT NULL PRIMARY KEY,
        name varchar(50) NOT NULL,
        address varchar(100) NOT NULL,
        phone varchar(25) NOT NULL UNIQUE,
        isDeleted tinyint(1) DEFAULT 0
    );
`
    await pool.query(query);

}

// (async () => {
//     await createBranchDatabase()
// })();


const createBranch = async (name, address, phone) => {
    const [result] = await pool.query(
        'INSERT INTO branches (name, address, phone) VALUES (?, ?, ?)',
        [name, address, phone]
    );
    return { id: result.insertId, name, address, phone };
};


const findBranchById = async (id) => {
    const [rows] = await pool.query(
        'SELECT id, name, address, phone FROM branches WHERE id = ? and isDeleted=false',
        [id]
    );
    return rows[0];
};

const findBranchByField = async (field, value) => {
    const [rows] = await pool.query(
        `SELECT id, name, address, phone FROM branches WHERE ${field} = ${value} and isDeleted=false`
    );
    return rows[0];
};


const findAllBranches = async (requestQuery) => {
    const { query, queryParams } = genericFeatures(requestQuery, "branches")
    const [rows] = await pool.query(query, queryParams);
    return rows;
};

const findByIdAndUpdate = async (id, updateFields) => {
    let updateQuery = 'UPDATE branches SET ';
    const values = [];

    // Dynamically construct the query based on updateFields object
    for (const field in updateFields) {
        updateQuery += `${field} = ?, `;
        values.push(updateFields[field]);
    }

    // Remove the trailing comma and space
    updateQuery = updateQuery.slice(0, -2);
    updateQuery += ' WHERE id = ? and isDeleted=false';
    values.push(id);
    await pool.query(updateQuery, values)
    const branch = findBranchById(id)

    return branch;
}

const findByIdAndDelete = async (id) => {
    const updateQuery = 'UPDATE branches SET isDeleted = true WHERE id = ? and isDeleted = false';

    // Values to update
    const [rows] = await pool.query(updateQuery, [id])
    return rows[0]
}


module.exports = {
    createBranch,
    findBranchById,
    findAllBranches,
    findBranchByField,
    findByIdAndUpdate,
    findByIdAndDelete

}