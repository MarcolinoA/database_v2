/*
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
*/

import express from 'express';
import Exercise from '../models/exercisesModel.js';

const router = express.Router();

// Aggiungi un nuovo utente
router.post("/", async (req, res) => {
  try {
    const { name, group, image } = req.body;

    const newExercise = new Exercise({
      name,
      group,
      image
    });

    const savedExercise = await newExercise.save();

    res.status(201).json(savedExercise);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Recupera tutti gli esercizi
router.get("/", async (req, res) => {
  try {
    const exercises = await Exercise.find({});
    res.status(200).send({
      count: exercises.length,
      data: exercises,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Elimina un utente
router.delete("/:id/", async (request, response) => {
  try {
    const { id } = request.params;
    const result = await Exercise.findByIdAndDelete(id);
    if (!result) {
      return response.status(404).json({ message: "User not found" });
    }

    return response.status(201).json({ message: "User deleted successfully" });
  } catch (error) {}
});

//modifica i dati di una scheda
router.put("/:id", async (request, response) => {
  try {
    if (
      !request.body.name ||
      !request.body.group ||
      !request.body.image
    ) {
      return response.status(400).send({
        message: "Send all required field: name, group, image",
      });
    }
    const { id } = request.params;
    const result = await Exercise.findByIdAndUpdate(id, request.body);
    if (!result) {
      return response.status(404).json({ message: "Exercise not found" });
    }
    return response.status(200).send({ message: "Exercise update successfully" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Recupera tutti i gruppi muscolari
router.get("/groups", async (req, res) => {
  try {
    const exercises = await Exercise.find({}); // Recupera tutti gli esercizi
    const muscleGroups = exercises.map(exercise => exercise.group);
    const uniqueMuscleGroups = [...new Set(muscleGroups)]; // Rimuovi duplicati
    res.status(200).send({
      count: uniqueMuscleGroups.length,
      data: uniqueMuscleGroups,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});


// Recupera gli esercizi per un gruppo muscolare specifico
router.get("/groups/:group", async (req, res) => {
  const { group } = req.params;
  try {
    const exercises = await Exercise.find({ group }); // Filtra gli esercizi per il gruppo muscolare specificato
    res.status(200).send({
      count: exercises.length,
      data: exercises,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

export default router;