import express from "express";
import lineController from '../controllers/lineController'

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

indexRouter.post("/createUser", lineController.createUser);

indexRouter.post("/addToLine", lineController.addToLine);

indexRouter.get("/findPosition", lineController.findPosition);

indexRouter.get("/showLine", lineController.showLine);

indexRouter.get("/filterLine", lineController.filterLine);

indexRouter.delete("/popLine", lineController.popLine);

export default indexRouter;
