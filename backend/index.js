import express from 'express';
import cors from 'cors'; 
import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import userRoute from './routes/userRoute.js';
import scheduleRoute from './routes/scheduleRoute.js';
import exercisesRoute from './routes/exercisesRoute.js';
import generatePDFRoute from './routes/generatePDFRoute.js'; // Importa la rotta per la generazione del PDF

const app = express();

app.use(cors()); // Usa il middleware cors per gestire le richieste CORS
app.use(express.json());

app.use('/users', userRoute);
app.use('/schedules', scheduleRoute);
app.use('/exercises', exercisesRoute);
app.use('/generate-pdf', generatePDFRoute); // Usa la rotta per la generazione del PDF

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
