import express from 'express';
import axios from 'axios';
import https from 'https';

const router = express.Router();

// Create custom HTTPS agent to ignore certificate verification
const httpsAgent = new https.Agent({
  rejectUnauthorized: false
});

// Route to generate the PDF
router.post('/', async (req, res) => {
  const { exercises } = req.body;

  if (!exercises || exercises.length === 0) {
    return res.status(400).send('No exercises provided');
  }

  const documenteroConfig = {
    "document": "xfJd1RNQXelYT7l0dL5h",
    "apiKey": "GPG4ORY-QO6UXEI-QOLG7AY-SIBTLGA",
    "format": "pdf",
    data: exercises,
  };

  try {
    const response = await axios.post('https://app.documentero.com/api', documenteroConfig, {
      responseType: 'arraybuffer', // To handle the PDF as an array of bytes
      httpsAgent: httpsAgent // Use the custom HTTPS agent
    });

    // Set header for downloading the PDF
    res.setHeader('Content-Disposition', 'attachment; filename=generated.pdf');
    res.setHeader('Content-Type', 'application/pdf');

    // Send the PDF to the client
    res.send(response.data);
  } catch (error) {
    console.error('Error generating PDF:', error);
    res.status(500).send('Error generating PDF');
  }
});

export default router;
