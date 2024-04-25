import express from "express";
import { ScheduleInfo } from "../models/scheduleInfoModel.js";

const scheduleInfoRoute = express.Router();

//add new schedule
scheduleInfoRoute.post("/", async (request, response) => {
  try {
    if (
      !request.body.ID ||
      !request.body.name ||
      !request.body.schedule ||
      !request.body.status
    ) {
      return response.status(400).send({
        message: "Send all required fields: id, name, schedule, status",
      });
    }
    const newScheduleInfo = {
      ID: request.body.ID,
      name: request.body.name,
      schedule: request.body.schedule,
      status: request.body.status,
    };

    const scheduleInfo = await ScheduleInfo.create(newScheduleInfo);

    return response.status(201).send(scheduleInfo);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//get all schedules
scheduleInfoRoute.get("/", async (request, response) => {
  try {
    const { user_id } = request.query; // Ottieni user_id dai parametri della richiesta
    const scheduleInfo = await ScheduleInfo.find({ ID: user_id }); // Modifica la query per filtrare per user_id

    return response.status(200).send({
      count: scheduleInfo.length,
      data: scheduleInfo,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//get a schedule
scheduleInfoRoute.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const scheduleInfo = await ScheduleInfo.findById(id);

    return response.status(200).send(scheduleInfo);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//update a schedule
scheduleInfoRoute.put("/:id", async (request, response) => {
  try {
    if (!request.body.ID || !request.body.name || !request.body.schedule || !request.body.status) {
      return response.status(400).send({
        message: "Send all required field: id, name, schedule, status",
      });
    }
    const { id } = request.params;
    const result = await ScheduleInfo.findByIdAndUpdate(id, request.body);
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
scheduleInfoRoute.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const result = await ScheduleInfo.findByIdAndDelete(id);
    if (!result) {
      return response.status(404).json({ message: "Schedule not found" });
    }

    return response.status(200).json({ message: "Schedule deleted successfully" });
  } catch (error) {
    console.log(error.message);
    return response.status(500).json({ message: "Internal server error" });
  }
})

export default scheduleInfoRoute;
