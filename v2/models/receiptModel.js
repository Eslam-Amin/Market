const pool = require('../database');
const genericFeatures = require("../../utils/apiFeatures-v2")


const createReceiptDatabase = async () => {
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
    console.log("receipt database created")
    await pool.query(query);

}

// (async () => {
//     await createReceiptDatabase()
// })();


const createReceipt = async (products) => {

    const values = products.map(product => [product.name, product.category, product.price,
    product.quantity, product.receiptTotalPrice, product.cashier, product.branch]);

    const sqlQuery = `INSERT INTO receipts (productName, productCategory, productPrice, 
        productQuantity, receiptTotalPrice, cashier, branch) VALUES  ? `;

    const [result] = await pool.query(sqlQuery, [values]
    );
    return { id: result.insertId, products };

};

const findAllReceipts = async (requestQuery) => {

    const fields = " productName, productPrice, productCategory, productQuantity, receiptTotalPrice, cashier, branch, created_at "
    const { query, queryParams } = genericFeatures(requestQuery, "receipts", fields)

    const [rows] = await pool.query(query, queryParams)
    return rows
}


module.exports = {
    createReceipt,
    findAllReceipts
}