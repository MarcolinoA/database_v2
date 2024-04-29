/*

import express from "express";
import { User } from "../models/userModel.js";

const router = express.Router();

//add new user
router.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const user = await User.findById(id).populate("schedules"); // Popola i dati delle schede

    if (!user) {
      return response.status(404).json({ message: "User not found" });
    }

    return response.status(200).send(user);
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

    if (!user) {
      return response.status(404).json({ message: "User not found" });
    }

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
*/

import express from 'express';
import User from "../models/userModel.js"; 
import Schedule from '../models/scheduleModel.js';

const router = express.Router();

// Aggiungi un nuovo utente
router.post("/", async (req, res) => {
  try {
    const { name, surname, birth, gender } = req.body;

    const newUser = new User({
      name,
      surname,
      birth,
      gender,
    });

    const savedUser = await newUser.save();

    res.status(201).json(savedUser);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Recupera tutti gli utenti
router.get("/", async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send({
      count: users.length,
      data: users,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// recupera un singolo utente
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error('Errore durante il recupero dei dettagli dell\'utente:', error);
    res.status(500).send({ message: 'Errore durante il recupero dei dettagli dell\'utente' });
  }
});

//ottieni le schede di un utente specifico
router.get("/:userId/schedules", async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Trova le schede associate a questo utente
    const schedules = await Schedule.find({ user: userId });
    res.status(200).json({ count: schedules.length, data: schedules });
  } catch (error) {
    console.error('Errore durante il recupero delle schede dell\'utente:', error);
    res.status(500).send({ message: 'Errore durante il recupero delle schede dell\'utente' });
  }
});

//modifica i dati di un utente
router.put("/:id", async (request, response) => {
  try {
    if (
      !request.body.name ||
      !request.body.surname ||
      !request.body.birth ||
      !request.body.gender
    ) {
      return response.status(400).send({
        message: "Send all required field: name, surname, birth, gender",
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

// Elimina un utente
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
