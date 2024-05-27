import express from 'express';
import Schedule from '../models/scheduleModel.js';

const router = express.Router();

// Create a new schedule
router.post("/", async (req, res) => {
  try {
    // Extract data from the request body
    const { name, status, exercises, user } = req.body;

    // Create a new schedule using the Mongoose model
    const newSchedule = new Schedule({
      name,
      status,
      exercises,
      user,
    });

    // Save the new schedule to the database
    const savedSchedule = await newSchedule.save();

    // Send a response with status 201 (Created) and the saved schedule in JSON format
    res.status(201).json(savedSchedule);
  } catch (error) {
    // Log any errors that occur to the console
    console.error('Error creating schedule:', error);

    // Send a response with status 500 (Internal Server Error) and an error message
    res.status(500).send({ message: 'Error creating schedule' });
  }
});

// Get all schedules
router.get("/", async (req, res) => {
  try {
    // Retrieve all schedules from the database
    const schedule = await Schedule.find({});

    // Send a response with status 200 (OK), including the count of schedules and the schedule data
    res.status(200).send({
      count: schedule.length,
      data: schedule,
    });
  } catch (error) {
    // Log any errors that occur to the console
    console.log(error.message);

    // Send a response with status 500 (Internal Server Error) and the error message
    res.status(500).send({ message: error.message });
  }
});

// Get a single schedule by ID
router.get("/:id", async (req, res) => {
  try {
    // Extract the schedule ID from the request parameters
    const { id } = req.params;

    // Retrieve the schedule by ID from the database
    const schedule = await Schedule.findById(id);

    // If the schedule is not found, send a 404 (Not Found) response
    if (!schedule) {
      return res.status(404).send({ message: "Schedule not found" });
    }

    // Send a response with status 200 (OK) and the schedule data
    res.status(200).send(schedule);
  } catch (error) {
    // Log any errors that occur to the console
    console.log(error.message);

    // Send a response with status 500 (Internal Server Error) and the error message
    res.status(500).send({ message: error.message });
  }
});

// Delete a schedule
router.delete("/:id", async (req, res) => {
  try {
    // Extract the schedule ID from the request parameters
    const { id } = req.params;

    // Find the schedule by ID and delete it from the database
    const result = await Schedule.findByIdAndDelete(id);

    // If the schedule is not found, send a 404 (Not Found) response
    if (!result) {
      return res.status(404).json({ message: "Schedule not found" });
    }

    // If the schedule is successfully deleted, send a 200 (OK) response with a success message
    return res.status(200).json({ message: "Schedule deleted successfully" });
  } catch (error) {
    // Log any errors that occur to the console
    console.error('Error deleting schedule:', error);

    // Send a response with status 500 (Internal Server Error) and an error message
    res.status(500).send({ message: 'Error deleting schedule' });
  }
});

export default router;

