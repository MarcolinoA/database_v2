/*
import express from "express";
import { Schedule } from "../models/ScheduleModel";

const scheduleRoute = express.Router();

//add new schedule
scheduleRoute.post("/", async (request, response) => {
  try {
    if (
      !request.body.name ||
      !request.body.series ||
      !request.body.rep ||
      !request.body.break
    ) {
      return response.status(400).send({
        message: "Send all required fields: id, name, schedule, status",
      });
    }
    const newSchedule = {
      name: request.body.name,
      series: request.body.series,
      rep: request.body.rep,
      break: request.body.break,
    };

    const schedule = await Schedule.create(newSchedule);

    return response.status(201).send(schedule);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//get all schedules
scheduleRoute.get("/", async (request, response) => {
  try {
    const { user_id } = request.query; // Ottieni user_id dai parametri della richiesta
    const schedule = await Schedule.find({ ID: user_id }); // Modifica la query per filtrare per user_id

    return response.status(200).send({
      count: schedule.length,
      data: schedule,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//get a schedule
scheduleRoute.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const schedule = await Schedule.findById(id);

    return response.status(200).send(schedule);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//update a schedule
scheduleRoute.put("/:id", async (request, response) => {
  try {
    if (!request.body.name || !request.body.series || !request.body.rep || !request.body.break) {
      return response.status(400).send({
        message: "Send all required field: id, name, schedule, status",
      });
    }
    const { id } = request.params;
    const result = await Schedule.findByIdAndUpdate(id, request.body);
    if (!result) {
      return response.status(404).json({ message: "Schedule not found" });
    }
    return response
      .status(200)
      .send({ message: "Schedule update successfully" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//delete schedule
scheduleRoute.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const result = await Schedule.findByIdAndDelete(id);
    if (!result) {
      return response.status(404).json({ message: "Schedule not found" });
    }

    return response.status(200).json({ message: "Schedule deleted successfully" });
  } catch (error) {
    console.log(error.message);
    return response.status(500).json({ message: "Internal server error" });
  }
})

export default scheduleRoute;
*/

import express from 'express';
import Schedule from '../models/scheduleModel.js';

const router = express.Router();

// Aggiungi una nuova scheda
router.post("/", async (req, res) => {
  try {
    const { name, exercises, user } = req.body;

    // Crea una nuova scheda utilizzando il modello Mongoose
    const newSchedule = new Schedule({
      name,
      user,
    });

    // Salva la nuova scheda nel database
    const savedSchedule = await newSchedule.save();

    res.status(201).json(savedSchedule);
  } catch (error) {
    console.error('Errore durante la creazione della scheda:', error);
    res.status(500).send({ message: 'Errore durante la creazione della scheda' });
  }
});

//stampa tutte le schede
router.get("/", async (req, res) => {
  try {
    const schedule = await Schedule.find({});
    res.status(200).send({
      count: schedule.length,
      data: schedule,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Elimina una scheda
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Schedule.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ message: "Schedule not found" });
    }

    return res.status(200).json({ message: "Schedule deleted successfully" });
  } catch (error) {
    console.error('Errore durante l\'eliminazione della scheda:', error);
    res.status(500).send({ message: 'Errore durante l\'eliminazione della scheda' });
  }
});

export default router;