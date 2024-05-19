const pool = require('../database');
const genericFeatures = require("../../utils/apiFeatures-v2")


const createProductDatabase = async () => {
    const query = ` 
    CREATE TABLE IF NOT EXISTS market.receipts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    productName VARCHAR(100)  NOT NULL,
    productCategory VARCHAR(100)  NOT NULL,
    productPrice FLOAT NOT NULL,
    productQuantity INT NOT NULL,
    receiptTotalPrice FLOAT NOT NULL,
    cashier INT NOT NULL,
    branch INT NOT NULL,
    isDeleted tinyint(1) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (branch) REFERENCES branches(id),
    FOREIGN KEY (cashier) REFERENCES cashiers(id) 
    );
`
    await pool.query(query);

}

// (async () => {
//     await createProductDatabase()
// })();

const createProduct = async (name, category, image, price) => {
    const [result] = await pool.query(
        'INSERT INTO products (name, category, price, image) VALUES (?, ?, ?, ?)',
        [name, category, price, image]
    );
    return { id: result.insertId, name, category, price };
};

const insertMany = async (products) => {
    // Constructing the bulk insert query
    const values = products.map(product => [product.name, product.category, product.price, product.image]);

    const sql = 'INSERT INTO products (name, category, price, image) VALUES ? ';
    const [rows] = await pool.query(sql, [values])
    return rows
}

const findMultipleProductsWithIds = async (ids) => {
    const [rows] = await pool.query(
        `select name, price, category from products where id in (${[ids]})`
    )
    return rows
}

const findProductById = async (id) => {
    const [rows] = await pool.query(
        'SELECT id, name, price, category, image FROM products WHERE id = ? and isDeleted = false',
        [id]
    );
    return rows[0];
};



const findProductByField = async (field, value) => {
    const [rows] = await pool.query(
        `SELECT id, name, price, image FROM products WHERE ${field} = '${value}' and isDeleted = false`,
        [value]
    );
    return rows[0];
}

const findAllProducts = async (requestQuery) => {
    const { query, queryParams } = genericFeatures(requestQuery, "products")
    const [rows] = await pool.query(query, queryParams)

    return rows;
};

const findByIdAndUpdate = async (id, updateFields) => {
    let updateQuery = 'UPDATE products SET ';
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
    const product = findProductById(id)

    return product;
}


const findByIdAndDelete = async (id) => {
    const updateQuery = 'UPDATE products SET isDeleted = true WHERE id = ? and isDeleted = false';

    // Values to update
    const [rows] = await pool.query(updateQuery, [id])
    return rows[0]
}


module.exports = {
    createProduct,
    findProductById,
    findByIdAndUpdate,
    findByIdAndDelete,
    findAllProducts,
    findProductByField,
    insertMany,
    findMultipleProductsWithIds
}