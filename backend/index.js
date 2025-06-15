require('dotenv').config();
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
  const { lat, lng, panoId, heading, pitch, locationDesc } = req.body;


  if (!lat || !lng) {
    return res.status(400).json({ message: 'Missing lat or lng' });
  }

  try {
    // Reverse geocode to get the real-world address
    const geocodeResp = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json`, {
      params: {
        latlng: `${lat},${lng}`,
        key: process.env.GOOGLE_MAPS_API_KEY
      }
    });

    const address = geocodeResp.data.results[0]?.formatted_address || "an unknown location";

    // Use refined prompt based on real address
    const refinedPrompt = `
A user is currently looking at this location in Google Street View:

- Address: ${address}
- GPS: (${lat}, ${lng})
- Street View Available: ${panoId ? "Yes" : "Unknown"}
${panoId ? `- Panorama ID: ${panoId}` : ""}
${heading !== undefined ? `- Heading: ${heading.toFixed(1)}°` : ""}
${pitch !== undefined ? `- Pitch: ${pitch.toFixed(1)}°` : ""}
${locationDesc ? `- View Description: ${locationDesc}` : ""}

Please describe what a person would likely see at this location based on the metadata above.
Is it residential, commercial, industrial, a park, or near the waterfront?

Be concise and do not speculate or guess beyond the metadata. Say if the view is limited or vague.
`.trim();


    // Call the LLM
    const response = await axios.post(
      "https://chatapi.akash.network/api/v1/chat/completions",
      {
        model: "Meta-Llama-3-1-8B-Instruct-FP8",
        messages: [
          {
            role: "user",
            content: refinedPrompt
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
