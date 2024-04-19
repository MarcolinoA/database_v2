import express, { request, response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { User } from "./models/UserModel.js";

const app = express();

app.use(express.json());

app.get("/", (request, response) => {
	console.log(request);
	return response.status(234).send("Welcome to MERN stack tutorial");
})

//add new user
app.post("/users", async (request, response) => {
	try {
		if(
			!request.body.name ||
			!request.body.surname ||
			!request.body.birth ||
			!request.body.gender
		) {
			return response.status(400).send({
				message: "Send all required fields: name, surname, bith, gender"
			})
		}
		const newUser = {
			name: request.body.name,
			surname: request.body.surname,
			birth: request.body.birth,
			gender: request.body.gender
		}

		const user = await User.create(newUser);

		return response.status(201).send(user)
	} catch (error) {
		console.log(error.message);
		response.status(500).send({ message: error.message})
	}
})

//get all users
app.get("/users", async (request, response) => {
	try {
		const users = await User.find({});

		return response.status(200).send({
			count: users.length,
			data: users
		})
	
	} catch (error) {
		console.log(error.message);
		response.status(500).send({ message: error.message })
	}
})

//get a user
app.get("/users/:id", async (request, response) => {
	try {
		const { id } = request.params;
		const user = await User.findById(id);

		return response.status(200).send(user)
	} catch (error) {
		console.log(error.message);
		response.status(500).send({ message: error.message })
	}
})

//update a user
app.put("/users/:id", async (request, response) => {
	try {
		if(
			!request.body.name ||
			!request.body.surname ||
			!request.body.birth ||
			!request.body.gender
		) {
			return response.status(400).send({
				message: "Send all required field: name, surname, birth, gender"
			})
		}
		const { id } = request.params;
		const result = await User.findByIdAndUpdate(id, request.body);
		if (!result) {
			return response.status(404).json({ message: "User not found" })
		}
		return response.status(200).send({ message: "User update successfully" })
	} catch (error) {
		console.log(error.message);
		response.status(500).send({ message: error.message })
	}
})

//delete user
app.delete("/users/:id/", async (request, response) => {
	try {
		const { id } = request.params;
		const result = await User.findByIdAndDelete(id);
		if(!result) {
			return response.status(404).json({ message: "User not found" })
		}

		return response.status(201).json({ message: "User update successfully" });
	} catch (error) {
		
	}
})

mongoose
	.connect(mongoDBURL)
	.then(() => {
		console.log("App connected to database");
		app.listen(PORT, () => {
			console.log(`App is listening to port ${PORT}`);
		});
	})
	.catch(() => {
		console.log(error);
	})
