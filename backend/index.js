import express from 'express';
import cors from 'cors'; 
import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import userRoute from './routes/userRoute.js';
import scheduleRoute from './routes/scheduleRoute.js';
import exercisesRoute from './routes/exercisesRoute.js';
import generatePDFRoute from './routes/generatePDFRoute.js';
const app = express();

app.use(cors()); // Utilize the cors middleware to handle CORS requests
app.use(express.json());

app.use('/users', userRoute);
app.use('/schedules', scheduleRoute);
app.use('/exercises', exercisesRoute);
app.use('/generate-pdf', generatePDFRoute); // Use the route for PDF generation

app.get('/', (request, response) => {
  console.log(request);
  return response.status(234).send('Welcome to MERN stack tutorial');
});

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log('App connected to database');
    app.listen(PORT, () => {
      console.log(`App is listening to port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error.message);
  });
