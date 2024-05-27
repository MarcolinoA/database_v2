/* Routes for exercises */
import express from 'express';
import Exercise from '../models/exercisesModel.js';

const router = express.Router();

// Add a new exercises
router.post("/", async (req, res) => {
  try {
    // extract data from request body
    const { name, group, equipment, image } = req.body;

    // create a new instance of the Exercise model with the extracted data
    const newExercise = new Exercise({
      name,
      group,
      equipment,
      image
    });

    // save the exercise to the database
    const savedExercise = await newExercise.save();

    // send a response with status 201 (Created) and the saved exercise in JSON
    res.status(201).json(savedExercise);
  } catch (error) {
    // Log any errors that occur to the console    
    console.log(error.message);
    // Send a response with status 500 (Internal Server Error) and the error message
    res.status(500).send({ message: error.message });
  }
});

// Get all exercises
router.get("/", async (req, res) => {
  try {
    // Retrieve all exercises from the database
    const exercises = await Exercise.find({});
    
    // Send a response with status 200 (OK), including the count of exercises and the exercise data
    res.status(200).send({
      count: exercises.length,
      data: exercises,
    });
  } catch (error) {
    // Log any error that occur to the console
    console.log(error.message);

    // Send a response with status 500 (Internal Server Error) and the error message
    res.status(500).send({ message: error.message });
  }
});

// Delete an exercise
router.delete("/:id/", async (request, response) => {
  try {
    // Extract the exercise by ID and delete it from the database
    const { id } = request.params;
    
    // Find the exercise by ID and delete it from the database
    const result = await Exercise.findByIdAndDelete(id);
    
    // If  no exercise is found, send a 404 (Not Found) response
    if (!result) {
      return response.status(404).json({ message: "Exercise not found" });
    }

    //If the exercise is successfully deleted, send a 201 (Created) response with a success message
    return response.status(201).json({ message: "Exercise deleted successfully" });
  } catch (error) {
    // If an error occurs, log it to the console (missing in the original code)
    console.log(error.message);

    // Send a 500 (Internal Server Error) response with the error message
    response.status(500).send({ message: error.message });
  }
});

// Modify an exercise
router.put("/:id", async (request, response) => {
  try {
    // Check if all required fields are provided in the request body
    if (
      !request.body.name ||
      !request.body.group ||
      !request.body.equipment ||
      !request.body.image
    ) {
      // If any reuired field is missing, send a 400 (Bad Request) response with an error message
      return response.status(400).send({
        message: "Send all required field: name, group, image",
      });
    }

    // Extract the exercise ID from the request parameters
    const { id } = request.params;
    // Find the exercise by ID and update it eith the data from the request body
    const result = await Exercise.findByIdAndUpdate(id, request.body);
    
    // If no exercise id found, send a 404 (Not Found) response with an error message
    if (!result) {
      return response.status(404).json({ message: "Exercise not found" });
    }

    // If the exercise is successfully updated, send a 200 (OK) response with a success message
    return response.status(200).send({ message: "Exercise update successfully" });
  } catch (error) {
    // Log any errors that occur to the console
    console.log(error.message);
    // Send a 500 (Internal Server Error) response with the error message
    response.status(500).send({ message: error.message });
  }
});

// GET route to retrieve all unique muscle groups
router.get("/groups", async (req, res) => {
  try {
    // Retrieve all exercises from the database
    const exercises = await Exercise.find({});

    // Extract muscle groups from the exercises
    const muscleGroups = exercises.map(exercise => exercise.group);

    // Remove duplicate muscle groups
    const uniqueMuscleGroups = [...new Set(muscleGroups)];

    // Send a response with status 200 (OK), including the count of unique muscle groups and the muscle group data
    res.status(200).send({
      count: uniqueMuscleGroups.length,
      data: uniqueMuscleGroups,
    });
  } catch (error) {
    // Log any errors that occur to the console
    console.log(error.message);

    // Send a response with status 500 (Internal Server Error) and the error message
    res.status(500).send({ message: error.message });
  }
});

// GET route to retrieve all exercises for a specific muscle group
router.get("/groups/:group", async (req, res) => {
  // Extract the muscle group from the request parameters
  const { group } = req.params;
  try {
    // Retrieve exercises that belong to the specified muscle group
    const exercises = await Exercise.find({ group });

    // Send a response with status 200 (OK), including the count of exercises and the exercise data
    res.status(200).send({
      count: exercises.length,
      data: exercises,
    });
  } catch (error) {
    // Log any errors that occur to the console
    console.log(error.message);

    // Send a response with status 500 (Internal Server Error) and the error message
    res.status(500).send({ message: error.message });
  }
});

// GET route to retrieve all exercises with a specific name
router.get("/names/:name", async (req, res) => {
  // Extract the exercise name from the request parameters
  const { name } = req.params;

  // Check if the name parameter is provided
  if (!name) {
    // If the name is not provided, send a 400 (Bad Request) response with an error message
    return res.status(400).send({ message: "Il nome dell'esercizio non è valido." });
  }

  try {
    // Use a regex with 'i' option to ignore case when searching for exercises by name
    const exercises = await Exercise.find({ name: { $regex: new RegExp(name, 'i') } });

    // If no exercises are found, send a 404 (Not Found) response with an error message
    if (exercises.length === 0) {
      return res.status(404).send({ message: "Nessun esercizio trovato con il nome specificato." });
    }

    // Send a response with status 200 (OK), including the count of exercises and the exercise data
    res.status(200).send({
      count: exercises.length,
      data: exercises,
    });
  } catch (error) {
    // Log any errors that occur to the console
    console.log(error.message);

    // Send a response with status 500 (Internal Server Error) and an error message
    res.status(500).send({ message: "Errore durante il recupero degli esercizi con lo stesso nome." });
  }
});

export default router;