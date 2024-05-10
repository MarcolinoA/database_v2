import express from 'express';
import Exercise from '../models/exercisesModel.js';

const router = express.Router();

// Aggiungi un nuovo esercizio
router.post("/", async (req, res) => {
  try {
    const { name, group, equipment, image } = req.body;

    const newExercise = new Exercise({
      name,
      group,
      equipment,
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

// Elimina un esercizio
router.delete("/:id/", async (request, response) => {
  try {
    const { id } = request.params;
    const result = await Exercise.findByIdAndDelete(id);
    if (!result) {
      return response.status(404).json({ message: "Exercise not found" });
    }

    return response.status(201).json({ message: "Exercise deleted successfully" });
  } catch (error) {}
});

//modifica i dati di un esercizio
router.put("/:id", async (request, response) => {
  try {
    if (
      !request.body.name ||
      !request.body.group ||
      !request.body.equipment ||
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

/*
// Recupera gli esercizi per nome
router.get("/names/:name", async (req, res) => {
  const { name } = req.params;
  if (!name) {
    return res.status(400).send({ message: "Il nome dell'esercizio non è valido." });
  }

  try {
    const exercises = await Exercise.find({ name });
    if (exercises.length === 0) {
      return res.status(404).send({ message: "Nessun esercizio trovato con il nome specificato." });
    }
    
    res.status(200).send({
      count: exercises.length,
      data: exercises,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: "Errore durante il recupero degli esercizi con lo stesso nome." });
  }
});

// Recupera gli esercizi per nome
router.get("/names/:name", async (req, res) => {
  const { name } = req.params;
  if (!name) {
    return res.status(400).send({ message: "Il nome dell'esercizio non è valido." });
  }

  try {
    const exercises = await Exercise.find({ name });
    if (exercises.length === 0) {
      return res.status(404).send({ message: "Nessun esercizio trovato con il nome specificato." });
    }
    
    res.status(200).send({
      count: exercises.length,
      data: exercises,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: "Errore durante il recupero degli esercizi con lo stesso nome." });
  }
});
*/

export default router;