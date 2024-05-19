const dovenv = require("dotenv")
dovenv.config({ path: "./.env" })
const mongoose = require("mongoose");
const mysql = require("mysql");

const app = require("./app");

const PASSWORD = process.env.DB_PASSWORD;
const DB_URL = process.env.DB_URL.replace("<PASSWORD>", PASSWORD);

mongoose.connect(DB_URL,
    // { useNewUrlParser: true, useUnifiedTopology: true }
).then(() => {
    console.log("connected to mongoodb")
}).catch((er) => console.log(er))

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
    console.log(`app is running on port ${PORT}`)
})