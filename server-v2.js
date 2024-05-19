const dovenv = require("dotenv")
dovenv.config({ path: "./.env" })
const app = require("./app-v2");

const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
    console.log(`app is running on port ${PORT}`)
})