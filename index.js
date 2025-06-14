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
  const lat = 50.00402;
  const lng = 36.23175;


  if (!lat || !lng) {
    return res.status(400).json({ message: 'Missing lat or lng' });
  }

  const coordinates = `${lat},${lng}`;

  // This would be loaded from your PDF, or hardcoded for now
  const pdfTextSnippet = `
  The Facades24 catalog documents the architectural history of Kharkiv, Ukraine.
  Many buildings from the late 19th and early 20th centuries are highlighted, including the work of Oleksiy Beketov and Serhiy Tymoshenko.
  Buildings like the Kharkiv Art Museum, Beketov’s Mansion, and Constitution Square are described as cultural and architectural landmarks in the city.
  `;
  const context = `Based on official architecture info:\n${pdfTextSnippet}`;

  content: `${context}\n\nWhere is ${coordinates}? What’s interesting or historic nearby?`
  
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
