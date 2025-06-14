// setup and config
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const axios = require('axios');

// initialize apps
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// POST AkashChat Description
app.post('/api/describe-location', async (req, res) => {
  const { lat, lng } = req.body;


  if (!lat || !lng) {
    return res.status(400).json({ message: 'Missing lat or lng' });
  }

  const coordinates = `${lat},${lng}`;

  const pdfTextSnippet = `
Gothenburg is rich in cultural and historical landmarks such as Götaplatsen, the iconic Poseidon statue, the former Eriksberg shipyard with its orange crane, and Haga with its preserved 19th-century wooden houses. The city also boasts significant institutions like Chalmers University and Sahlgrenska Hospital, and areas like Avenyn and Brunnsparken that evolved through centuries of urban planning.
  `;

  const context = `Based on official city history:\n${pdfTextSnippet}`;

  try {
    const response = await axios.post(
      "https://chatapi.akash.network/api/v1/chat/completions",
      {
        model: "Meta-Llama-3-1-8B-Instruct-FP8",
        messages: [
          {
            role: "user",
            content: `${context}\n\nWhere is ${coordinates}? What's interesting or historic nearby?`
          }
        ]
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer sk-BR1rgkypD84HhpWF2PMPWw"
        },
        timeout: 30000
      }
    );

    const aiMessage = response.data.choices[0].message.content;
    res.json({ description: aiMessage });

  } catch (error) {
    console.error('AkashChat error:', error.message);
    res.status(500).json({ message: 'Failed to get description from AI' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
