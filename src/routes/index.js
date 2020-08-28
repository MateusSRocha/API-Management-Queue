import express from "express";

const users = [
  {
    id: 1,
    name: "Steve",
    email: "Brown@gmail.com",
    gender: "Masculino",
  },
  {
    id: 2,
    name: "Janine",
    email: "Smith@gmail.com",
    gender: "Feminino",
  },
  {
    id: 3,
    name: "Karen",
    email: "Jones@gmail.com",
    gender: "Feminino",
  },
  {
    id: 4,
    name: "Ben",
    email: "William@gmail.com",
    gender: "Masculino",
  },
];

const line = [];

const indexRouter = express.Router();

indexRouter.get("/users/:id", (req, res) =>
  res.status(200).json(users[req.params.id])
);

indexRouter.post("/createUser", (req, res) => {
  const { name, email, gender } = req.body;

  if (!name || !email || !gender) {
    return res.status(400).send("One or more required fields are missing");
  }

  let id = users.length;

  users.forEach((user) => {
    if (user.email === email || user.name === name) id = -1;
  });

  if (id === -1)
    return res.send("A user with that name or email already exists");

  users[id] = { id, name, email, gender };

  return res.status(200).send({ id, name, email, gender });
});

indexRouter.post("/addToLine", (req, res) => {
  let { id } = req.body;
  users[id].id = line.length + 1;

  line.forEach((user) => {
    if (user.email === users[id].email || user.name === users[id].name) id = -1;
  });

  if (id === -1)
    return res.send("A user with that name or email already exists in the line");

  if (line.push(users[id]))
    res
      .status(200)
      .send("Position " + line[line.length - 1].id + " in the queue ");
});

indexRouter.get("/findPosition", (req, res) => {
  const { email } = req.body;
  let indice = -1;
  line.forEach((user, index) => {
    if (user.email === email) indice = index + 1;
  });
  indice === -1
    ? res.status(400).send("This email dont exists")
    : res.status(200).send("Position " + indice + " in the queue");
});

indexRouter.get("/showLine", (req, res) => {
  let string = "";
  line.forEach((user, index) => {
    string += `Position ${index + 1}:
    name: ${user.name},
    email: ${user.email},
    gender: ${user.gender},
    \n`;
  });
  res.status(200).send(string);
});

indexRouter.get("/filterLine", (req, res) => {
  const { gender } = req.body;
  let string = "";
  line.forEach((user, index) => {
    if (user.gender === gender) {
      string += `Position ${index + 1}:
      name: ${user.name},
      email: ${user.email},
      gender: ${user.gender},
      \n`;
    }
  });
  res.status(200).send(string);
});

indexRouter.delete("/popLine", (req, res) => {
  line[0]
    ? res.status(200).send(line.shift())
    : res.status(400).send("Empty line");
});

export default indexRouter;
