import express from "express";

require("dotenv").config({
    path: '../.env'
})

const app = express();

app.set("PORT", process.env.BACKEND_PORT || 3000);

app.use(express.json());

// ROUTES INVENTORY
app.use("/invt",require("./routes/Inventory"));
// ROUTES AUTH
app.use("/auth",require("./routes/Auth"));
// ROUTES Articles
app.use("/articles",require("./routes/Articles"));

app.listen(app.get("PORT"), () => {
    console.log(`Server running in http://127.0.0.1:${app.get("PORT")}`)
});