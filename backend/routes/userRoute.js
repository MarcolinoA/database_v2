import express from 'express';
import User from "../models/userModel.js"; 
import Schedule from '../models/scheduleModel.js';
import Exercise from '../models/exercisesModel.js';
import ScheduleExercise from '../models/scheduleExercises.js';

const router = express.Router();

/* ROUTE UTENTI */

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

/* ROUTE SCHEDE DI UN UTENTE */

//Crea una nuova scheda per un utente
router.post("/:userId/schedules", async (req, res) => {
  try {
    const { userId } = req.params;
    const { name, status, exercises } = req.body;

    // Verifica che tutti i campi richiesti siano presenti nella richiesta
    if (!name || !status || !exercises) {
      return res.status(400).send({ message: "Invia tutti i campi richiesti: name, status, exercises" });
    }

    // Crea una nuova scheda nel database
    const newSchedule = new Schedule({
      name,
      status,
      exercises,
      user: userId, // Associa la scheda all'utente corretto
    });

    // Salva la nuova scheda nel database
    const savedSchedule = await newSchedule.save();

    res.status(201).json({ message: "Scheda creata con successo", schedule: savedSchedule });
  } catch (error) {
    console.error("Errore durante la creazione della scheda:", error.message);
    res.status(500).send({ message: "Errore durante la creazione della scheda" });
  }
});

//stampa le schede di un utente specifico
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

// Elimina una scheda di un utente
router.delete("/:userId/schedules/:scheduleId", async (request, response) => {
  try {
    const { userId, scheduleId } = request.params;
    // Utilizza un metodo per eliminare la scheda specifica
    const result = await Schedule.findOneAndDelete({ _id: scheduleId, user: userId });
    if (!result) {
      return response.status(404).json({ message: "Schedule not found" });
    }
    return response.status(200).json({ message: "Schedule deleted successfully" });
  } catch (error) {
    console.error("Error deleting schedule:", error);
    return response.status(500).json({ message: "Error deleting schedule" });
  }
});

// modifica una scheda di un utente
router.put("/:userId/schedules/:scheduleId", async (request, response) => {
  try {
    const { userId, scheduleId } = request.params; // Ottieni userId e scheduleId dai parametri
    const { name, status, exercises } = request.body; // Ottieni i dati dalla richiesta body

    // Controlla che tutti i campi richiesti siano presenti
    if (!name || !status || !exercises) {
      return response.status(400).send({
        message: "Send all required fields: name, status, exercises",
      });
    }

    // Cerca e aggiorna la scheda corretta usando userId e scheduleId
    const updatedSchedule = await Schedule.findByIdAndUpdate(
      scheduleId,
      { name, status, exercises },
      { new: true } // Opzione per ottenere il documento aggiornato
    );

    // Controlla se la scheda è stata trovata ed aggiornata correttamente
    if (!updatedSchedule) {
      return response.status(404).json({ message: "Schedule not found" });
    }

    // Rispondi con successo e il documento aggiornato
    return response.status(200).json({ message: "Schedule updated successfully", updatedSchedule });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

/* ROUTE ESERCICIZI DI UNA SCHEDA DI UN UTENTE */

// Aggiungi un esercizio alla scheda di un utente specifico
router.post("/:userId/schedules/:scheduleId/exercises/:exerciseId", async (req, res) => {
  try {
    const { userId, scheduleId, exerciseId } = req.params;
    const { series, rep } = req.body; // Dati aggiuntivi per l'esercizio

    // Controlla se la scheda esiste
    const schedule = await Schedule.findById(scheduleId);
    if (!schedule) {
      return res.status(404).json({ message: "Schedule not found" });
    }

    // Controlla se l'esercizio esiste
    const exercise = await Exercise.findById(exerciseId);
    if (!exercise) {
      return res.status(404).json({ message: "Exercise not found" });
    }

    // Crea un nuovo esercizio per la scheda
    const newScheduleExercise = new ScheduleExercise({
      name: exercise.name,
      group: exercise.group,
      image: exercise.image,
      equipment: exercise.equipment,
      rep: rep,
      series: series,
    });

    // Salva il nuovo esercizio
    await newScheduleExercise.save();

    // Aggiungi l'esercizio alla scheda solo se non è già presente
    if (!schedule.exercises.includes(newScheduleExercise._id)) {
      schedule.exercises.push(newScheduleExercise._id);
      await schedule.save();
    }

    res.status(200).json({ message: "Exercise added to schedule successfully", data: newScheduleExercise });
  } catch (error) {
    console.error('Errore durante l\'aggiunta dell\'esercizio alla scheda:', error);
    res.status(500).send({ message: 'Errore durante l\'aggiunta dell\'esercizio alla scheda' });
  }
});

// Recupera gli esercizi specifici di una scheda di un utente specifico
router.get("/:userId/schedules/:scheduleId/exercises", async (req, res) => {
  try {
    const { userId, scheduleId } = req.params;

    // Controlla se l'utente esiste
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Controlla se la scheda esiste per questo utente
    const schedule = await Schedule.findOne({ _id: scheduleId, user: userId });
    if (!schedule) {
      return res.status(404).json({ message: "Schedule not found for this user" });
    }

    // Trova gli esercizi associati a questa scheda
    const exercises = await ScheduleExercise.find({ _id: { $in: schedule.exercises } });
    if (!exercises || exercises.length === 0) {
      return res.status(404).json({ message: "Exercises not found for this schedule" });
    }

    res.status(200).json({ count: exercises.length, data: exercises });
  } catch (error) {
    console.error('Errore durante il recupero degli esercizi della scheda:', error);
    res.status(500).json({ message: 'Errore durante il recupero degli esercizi della scheda' });
  }
});


// Recupera un singolo esercizio specifico di una scheda di un utente
router.get("/:userId/schedules/:scheduleId/exercises/:exerciseId", async (req, res) => {
  try {
    const { userId, scheduleId, exerciseId } = req.params;

    // Controlla se l'utente esiste
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Controlla se la scheda esiste per questo utente
    const schedule = await Schedule.findOne({ _id: scheduleId, user: userId });
    if (!schedule) {
      return res.status(404).json({ message: "Schedule not found for this user" });
    }

    // Trova l'esercizio specifico nella scheda
    const exercise = await ScheduleExercise.findOne({ _id: exerciseId, _id: { $in: schedule.exercises } });
    if (!exercise) {
      return res.status(404).json({ message: "Exercise not found for this schedule" });
    }

    res.status(200).json({ data: exercise });
  } catch (error) {
    console.error('Errore durante il recupero dell\'esercizio della scheda:', error);
    res.status(500).json({ message: 'Errore durante il recupero dell\'esercizio della scheda' });
  }
});

// Modifica rep e series di un esercizio specifico
router.put("/:userId/schedules/:scheduleId/exercises/:exerciseId", async (req, res) => {
  try {
    const { userId, scheduleId, exerciseId } = req.params;
    const { rep, series } = req.body;

    // Controlla se l'utente esiste
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Controlla se la scheda esiste per questo utente
    const schedule = await Schedule.findOne({ _id: scheduleId, user: userId });
    if (!schedule) {
      return res.status(404).json({ message: "Schedule not found for this user" });
    }

    // Trova l'esercizio da modificare nella scheda
    const exercise = await ScheduleExercise.findById(exerciseId);
    if (!exercise) {
      return res.status(404).json({ message: "Exercise not found" });
    }

    // Aggiorna i campi rep e series dell'esercizio
    exercise.rep = rep;
    exercise.series = series;
    await exercise.save();

    res.status(200).json({ message: "Exercise updated successfully", data: exercise });
  } catch (error) {
    console.error('Errore durante la modifica dell\'esercizio:', error);
    res.status(500).json({ message: 'Errore durante la modifica dell\'esercizio' });
  }
});

router.delete("/:userId/schedules/:scheduleId/exercises/:exerciseId", async (req, res) => {
  try {
    const { userId, scheduleId, exerciseId } = req.params;

    // Controlla se l'utente esiste
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Controlla se la scheda esiste
    const schedule = await Schedule.findById(scheduleId);
    if (!schedule) {
      return res.status(404).json({ message: "Schedule not found" });
    }

    // Controlla se l'esercizio esiste nella scheda dell'utente
    const exerciseIndex = schedule.exercises.indexOf(exerciseId);
    if (exerciseIndex === -1) {
      return res.status(404).json({ message: "Exercise not found in this schedule" });
    }

    // Rimuovi l'esercizio dalla scheda
    schedule.exercises.splice(exerciseIndex, 1);
    await schedule.save();

    res.status(200).json({ message: "Exercise removed from schedule successfully" });
  } catch (error) {
    console.error('Errore durante la rimozione dell\'esercizio dalla scheda:', error);
    res.status(500).json({ message: 'Errore durante la rimozione dell\'esercizio dalla scheda' });
  }
});

export default router;
