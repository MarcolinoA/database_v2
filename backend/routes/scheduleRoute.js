import express from "express";
import { Schedule } from "../models/scheduleModel.js";

const scheduleRoute = express.Router();

//add new schedule
scheduleRoute.post("/", async (request, response) => {
  try {
    if (
      !request.body.name ||
      !request.body.schedule ||
      !request.body.status
    ) {
      return response.status(400).send({
        message: "Send all required fields: name, schedule, status",
      });
    }
    const newSchedule = {
      name: request.body.name,
      schedule: request.body.schedule,
      status: request.body.status,
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
    const schedule = await Schedule.find({});

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
    if (!request.body.name || !request.body.schedule || !request.body.status) {
      return response.status(400).send({
        message: "Send all required field: name, schedule, status",
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
scheduleRoute.delete("/:id/", async (request, response) => {
  try {
    const { id } = request.params;
    const result = await Schedule.findByIdAndDelete(id);
    if (!result) {
      return response.status(404).json({ message: "Schedule not found" });
    }

    return response
      .status(201)
      .json({ message: "Schedule deleted successfully" });
  } catch (error) {}
});

export default scheduleRoute;
