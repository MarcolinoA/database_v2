import express from "express";
import { User } from "../models/userModel.js";

const router = express.Router();

//add new user
router.post("/", async (request, response) => {
  try {
    if (
      !request.body.index ||
      !request.body.name ||
      !request.body.surname ||
      !request.body.birth ||
      !request.body.gender
    ) {
      return response.status(400).send({
        message: "Send all required fields: index, name, surname, bith, gender",
      });
    }
    const newUser = {
      index: request.body.index,
      name: request.body.name,
      surname: request.body.surname,
      birth: request.body.birth,
      gender: request.body.gender,
    };

    const user = await User.create(newUser);

    return response.status(201).send(user);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//get all users
router.get("/", async (request, response) => {
  try {
    const users = await User.find({});

    return response.status(200).send({
      count: users.length,
      data: users,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//get a user
router.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const user = await User.findById(id);

    return response.status(200).send(user);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//update a user
router.put("/:id", async (request, response) => {
  try {
    if (
      !request.body.index ||
      !request.body.name ||
      !request.body.surname ||
      !request.body.birth ||
      !request.body.gender
    ) {
      return response.status(400).send({
        message: "Send all required field: index, name, surname, birth, gender",
      });
    }
    const { id } = request.params;
    const result = await User.findByIdAndUpdate(id, request.body);
    if (!result) {
      return response.status(404).json({ message: "User not found" });
    }
    return response.status(200).send({ message: "User update successfully" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//delete user
router.delete("/:id/", async (request, response) => {
  try {
    const { id } = request.params;
    const result = await User.findByIdAndDelete(id);
    if (!result) {
      return response.status(404).json({ message: "User not found" });
    }

    return response.status(201).json({ message: "User deleted successfully" });
  } catch (error) {}
});

export default router;
