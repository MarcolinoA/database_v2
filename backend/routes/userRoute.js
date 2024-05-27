import express from 'express';
import User from "../models/userModel.js"; 
import Schedule from '../models/scheduleModel.js';
import Exercise from '../models/exercisesModel.js';
import ScheduleExercise from '../models/scheduleExercises.js';

const router = express.Router();

/* USER ROUTES */

// Add a new user
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

// Get all users
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

// Get a single user
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error('Error while retrieving user details:', error);
    res.status(500).send({ message: 'Error while retrieving user details' });
  }
});

// Update user data
router.put("/:id", async (request, response) => {
  try {
    if (
      !request.body.name ||
      !request.body.surname ||
      !request.body.birth ||
      !request.body.gender
    ) {
      return response.status(400).send({
        message: "Send all required fields: name, surname, birth, gender",
      });
    }
    const { id } = request.params;
    const result = await User.findByIdAndUpdate(id, request.body);
    if (!result) {
      return response.status(404).json({ message: "User not found" });
    }
    return response.status(200).send({ message: "User updated successfully" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Delete a user
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

/* SCHEDULE ROUTES */

// Create a new schedule for a user
router.post("/:userId/schedules", async (req, res) => {
  try {
    const { userId } = req.params;
    const { name, status, exercises } = req.body;

    // Check if all required fields are present in the request
    if (!name || !status || !exercises) {
      return res.status(400).send({ message: "Send all required fields: name, status, exercises" });
    }

    // Create a new schedule in the database
    const newSchedule = new Schedule({
      name,
      status,
      exercises,
      user: userId, // Associate the schedule with the correct user
    });

    // Save the new schedule to the database
    const savedSchedule = await newSchedule.save();

    res.status(201).json({ message: "Schedule created successfully", schedule: savedSchedule });
  } catch (error) {
    console.error("Error while creating schedule:", error.message);
    res.status(500).send({ message: "Error while creating schedule" });
  }
});

// Get schedules of a specific user
router.get("/:userId/schedules", async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find schedules associated with this user
    const schedules = await Schedule.find({ user: userId });
    res.status(200).json({ count: schedules.length, data: schedules });
  } catch (error) {
    console.error('Error while retrieving user schedules:', error);
    res.status(500).send({ message: 'Error while retrieving user schedules' });
  }
});

// Delete a schedule of a user
router.delete("/:userId/schedules/:scheduleId", async (request, response) => {
  try {
    const { userId, scheduleId } = request.params;
    // Use a method to delete the specific schedule
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
// Update a user's schedule
router.put("/:userId/schedules/:scheduleId", async (request, response) => {
  try {
    const { userId, scheduleId } = request.params; // Get userId and scheduleId from parameters
    const { name, status, exercises } = request.body; // Get data from the request body

    // Check that all required fields are present
    if (!name || !status || !exercises) {
      return response.status(400).send({
        message: "Send all required fields: name, status, exercises",
      });
    }

    // Find and update the correct schedule using userId and scheduleId
    const updatedSchedule = await Schedule.findByIdAndUpdate(
      scheduleId,
      { name, status, exercises },
      { new: true } // Option to get the updated document
    );

    // Check if the schedule was found and updated successfully
    if (!updatedSchedule) {
      return response.status(404).json({ message: "Schedule not found" });
    }

    // Respond with success and the updated document
    return response.status(200).json({ message: "Schedule updated successfully", updatedSchedule });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

/* ROUTE EXERCISES OF A USER'S SCHEDULE */

// Add an exercise to a specific user's schedule
router.post("/:userId/schedules/:scheduleId/exercises/:exerciseId", async (req, res) => {
  try {
    const { userId, scheduleId, exerciseId } = req.params;
    const { series, rep, day } = req.body; // Additional data for the exercise

    // Check if the schedule exists
    const schedule = await Schedule.findById(scheduleId);
    if (!schedule) {
      return res.status(404).json({ message: "Schedule not found" });
    }

    // Check if the exercise exists
    const exercise = await Exercise.findById(exerciseId);
    if (!exercise) {
      return res.status(404).json({ message: "Exercise not found" });
    }

    // Create a new exercise for the schedule
    const newScheduleExercise = new ScheduleExercise({
      name: exercise.name,
      group: exercise.group,
      image: exercise.image,
      equipment: exercise.equipment,
      rep: rep,
      series: series,
      day: day
    });

    // Save the new exercise
    await newScheduleExercise.save();

    // Add the exercise to the schedule only if it's not already present
    if (!schedule.exercises.includes(newScheduleExercise._id)) {
      schedule.exercises.push(newScheduleExercise._id);
      await schedule.save();
    }

    res.status(200).json({ message: "Exercise added to schedule successfully", data: newScheduleExercise });
  } catch (error) {
    console.error('Error adding exercise to schedule:', error);
    res.status(500).send({ message: 'Error adding exercise to schedule' });
  }
});

// Retrieve specific exercises of a user's schedule
router.get("/:userId/schedules/:scheduleId/exercises", async (req, res) => {
  try {
    const { userId, scheduleId } = req.params;

    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the schedule exists for this user
    const schedule = await Schedule.findOne({ _id: scheduleId, user: userId });
    if (!schedule) {
      return res.status(404).json({ message: "Schedule not found for this user" });
    }

    // Find exercises associated with this schedule
    const exercises = await ScheduleExercise.find({ _id: { $in: schedule.exercises } });
    if (!exercises || exercises.length === 0) {
      return res.status(404).json({ message: "Exercises not found for this schedule" });
    }

    res.status(200).json({ count: exercises.length, data: exercises });
  } catch (error) {
    console.error('Error retrieving exercises of schedule:', error);
    res.status(500).json({ message: 'Error retrieving exercises of schedule' });
  }
});


// Retrieve a specific exercise of a user's schedule
router.get("/:userId/schedules/:scheduleId/exercises/:exerciseId", async (req, res) => {
  try {
    const { userId, scheduleId, exerciseId } = req.params;

    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the schedule exists for this user
    const schedule = await Schedule.findOne({ _id: scheduleId, user: userId });
    if (!schedule) {
      return res.status(404).json({ message: "Schedule not found for this user" });
    }

    // Find the specific exercise in the schedule
    const exercise = await ScheduleExercise.findOne({ _id: exerciseId, _id: { $in: schedule.exercises } });
    if (!exercise) {
      return res.status(404).json({ message: "Exercise not found for this schedule" });
    }

    res.status(200).json({ data: exercise });
  } catch (error) {
    console.error('Error retrieving exercise of schedule:', error);
    res.status(500).json({ message: 'Error retrieving exercise of schedule' });
  }
});
// Update rep and series of a specific exercise
router.put("/:userId/schedules/:scheduleId/exercises/:exerciseId", async (req, res) => {
  try {
    const { userId, scheduleId, exerciseId } = req.params;
    const { rep, series, day } = req.body;

    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the schedule exists for this user
    const schedule = await Schedule.findOne({ _id: scheduleId, user: userId });
    if (!schedule) {
      return res.status(404).json({ message: "Schedule not found for this user" });
    }

    // Find the exercise to modify in the schedule
    const exercise = await ScheduleExercise.findById(exerciseId);
    if (!exercise) {
      return res.status(404).json({ message: "Exercise not found" });
    }

    // Update the rep and series fields of the exercise
    exercise.rep = rep;
    exercise.series = series;
    exercise.day = day;
    await exercise.save();

    res.status(200).json({ message: "Exercise updated successfully", data: exercise });
  } catch (error) {
    console.error('Error updating exercise:', error);
    res.status(500).json({ message: 'Error updating exercise' });
  }
});

// Delete an exercise from a user's schedule
router.delete("/:userId/schedules/:scheduleId/exercises/:exerciseId", async (req, res) => {
  try {
    const { userId, scheduleId, exerciseId } = req.params;

    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the schedule exists
    const schedule = await Schedule.findById(scheduleId);
    if (!schedule) {
      return res.status(404).json({ message: "Schedule not found" });
    }

    // Check if the exercise exists in the user's schedule
    const exerciseIndex = schedule.exercises.indexOf(exerciseId);
    if (exerciseIndex === -1) {
      return res.status(404).json({ message: "Exercise not found in this schedule" });
    }

    // Remove the exercise from the schedule
    schedule.exercises.splice(exerciseIndex, 1);
    await schedule.save();

    res.status(200).json({ message: "Exercise removed from schedule successfully" });
  } catch (error) {
    console.error('Error removing exercise from schedule:', error);
    res.status(500).json({ message: 'Error removing exercise from schedule' });
  }
});

export default router;
