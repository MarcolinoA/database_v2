import express from "express";
import { Exercises } from "../models/exercisesModel.js"; 

const exerciseRoute = express.Router();

//add new exercise
exerciseRoute.post("/", async (request, response) => {
  try {
    if (
      !request.body.name ||
      !request.body.group ||
      !request.body.desc ||
      !request.body.img
    ) {
      return response.status(400).send({
        message: "Send all required fields: name, group, desc, img",
      });
    }
    const newExercise = {
      name: request.body.name,
      group: request.body.group,
      desc: request.body.desc,
      img: request.body.img,
    };

    const exercises = await Exercises.create(newExercise);

    return response.status(201).send(exercises);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//get all users
exerciseRoute.get("/", async (request, response) => {
  try {
    const exercises = await Exercises.find({});

    return response.status(200).send({
      count: exercises.length,
      data: exercises,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//get a user
exerciseRoute.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const exercise = await Exercises.findById(id);

    return response.status(200).send(exercise);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//update a user
exerciseRoute.put("/:id", async (request, response) => {
  try {
    if (
      !request.body.name ||
      !request.body.group ||
      !request.body.desc ||
      !request.body.img
    ) {
      return response.status(400).send({
        message: "Send all required field: index, name, surname, birth, gender",
      });
    }
    const { id } = request.params;
    const result = await Exercises.findByIdAndUpdate(id, request.body);
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
exerciseRoute.delete("/:id/", async (request, response) => {
  try {
    const { id } = request.params;
    const result = await Exercises.findByIdAndDelete(id);
    if (!result) {
      return response.status(404).json({ message: "User not found" });
    }

    return response.status(201).json({ message: "User deleted successfully" });
  } catch (error) {}
});

export default exerciseRoute;
