import express from "express";
import lineController from '../controllers/lineController'

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
