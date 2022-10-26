const express = require("express");
const bodyParser = require("body-parser");
const dateModule = require(__dirname + "/date.js");

console.log(dateModule);

const app = express();
const port = 3000;

const items = ["Buy Food", "Cook Food", "Eat Food"];
const workItems = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
    const day = dateModule.getDate();

    res.render("list", { listTitle: day, newListItems: items });
});

app.post("/", (req, res) => {
    const item = req.body.newItem;

    if (req.body.addItem === "Work") {
        workItems.push(item);
        res.redirect("/work");
    } else {
        items.push(item);
        res.redirect("/");
    }
});

app.get("/work", (req, res) => {
    res.render("list", { listTitle: "Work List", newListItems: workItems });
});

app.listen(port, function () {
    console.log(`Server is running on port: ${port}`);
});
