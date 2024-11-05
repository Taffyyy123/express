const express = require("express");
const fs = require("fs");
const app = express();
app.use(express.json());
const PORT = 8080;

const data = require("/Users/24HP0016/Desktop/Back-end/express/mockData.json");

const checkLogin = (req, res, next) => {
  const reqName = req.body.name;
  const reqPass = req.body.password;
  const currentUser = data.find(
    (user) => user.name === reqName && user.password === reqPass
  );
  if (!currentUser) {
    res.send("Name or Password incorrect");
  }
  next();
};

const signUpUser = (req, res, next) => {
  const body = req.body;
  const findingUser = data.find((user) => user.name === body.name);
  if (findingUser) {
    res.send("Already taken");
  } else {
    next();
  }
};

app.get("/users", (req, res) => {
  const url = req.url;
  if (url.startsWith(`/users?`)) {
    const splitedUrl = url.split("?");
    const user = data.find((user) => splitedUrl[1] === user.id);
    res.send(user);
  } else {
    res.send(data);
  }
});
app.post("/login", checkLogin, (req, res) => {
  res.send("amjilltai nevterlee");
});

app.post("/signup", signUpUser, (req, res) => {
  const body = req.body;
  const newUser = {
    id: JSON.stringify(data.length + 1),
    ...body,
  };
  data.push(newUser);
  fs.writeFileSync("mockData.json", JSON.stringify(data), (err) => {
    console.log(err);
  });
  res.send("done");
});

app.delete("/delete", (req, res) => {
  const body = req.body;
  const deletingUser = data.filter((user) => user.id !== body.id);
  fs.writeFileSync("mockData.json", JSON.stringify(deletingUser), (err) => {
    console.log(err);
  });
  res.send("Done");
});
app.listen(PORT);
