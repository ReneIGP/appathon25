// setup and config
const express = require('express');
const cors = require('cors');
require('dotenv').config();

// initialize apps
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Sample data: replace with database later if needed
const locations = [
  { id: 1, name: 'City Hall', lat: 57.7089, lng: 11.9746 },
  { id: 2, name: 'Opera House', lat: 57.7072, lng: 11.9668 }
];

// GET all locations
app.get('/api/locations', (req, res) => {
  res.json(locations);
});

// GET location by ID
app.get('/api/locations/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const location = locations.find(loc => loc.id === id);
    if (!location) return res.status(404).json({ message: 'Location not found' });
    res.json(location);
  });
  
// POST a new location
app.post('/api/locations', (req, res) => {
const { name, lat, lng } = req.body;
if (!name || lat === undefined || lng === undefined) {
    return res.status(400).json({ message: 'Missing name, lat or lng' });
}

// new location structure for entity
const newLocation = {
    id: locations.length + 1,
    name,
    lat,
    lng,
};

locations.push(newLocation);
res.status(201).json(newLocation);
});
  

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
