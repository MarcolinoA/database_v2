import express from 'express';
import Schedule from '../models/scheduleModel.js';

const router = express.Router();

// Crea una nuova scheda
router.post("/", async (req, res) => {
  try {
    const { name, status, exercises, user } = req.body;

    // Crea una nuova scheda utilizzando il modello Mongoose
    const newSchedule = new Schedule({
      name,
      status,
      exercises,
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

//stampa una scheda
router.get("/:id", async (req, res) => {
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

