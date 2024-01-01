import express from "express";
import cors from "cors"; 
import bodyParser, {BodyParser} from "body-parser";

require("dotenv").config({
    path: '../.env'
})

const app = express();

app.set("PORT", process.env.BACKEND_PORT || 3000);

//Allow josn body
app.use(express.json())
app.use(express.urlencoded({extended: false}));

// CORS
app.use(cors({
    credentials: true
}));

// STATIC FILES
app.use("/articles/images",express.static("./uploads/articles"))

// ROUTES INVENTORY
app.use("/invt",require("./routes/Inventory"));
// ROUTES AUTH
app.use("/auth",require("./routes/Auth"));
// ROUTES Articles
app.use("/articles",require("./routes/Articles"));

app.listen(app.get("PORT"), () => {
    console.log(`Server running in http://127.0.0.1:${app.get("PORT")}`)
});