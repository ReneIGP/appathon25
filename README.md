# Mapventure
### Interactive city exploration with Google Maps and AI

This website allows users to explore places using Google Maps Street View or by uploading photos of locations. Based on the user's location or the selected image, the AI will identify the place and provide historical and contextual information about it. If no such information about the place is found, new closest place with historical meaning will be prompted. Users location updates as he explores the city.

## Current Features

- 🌍 Explore locations with Google Maps Street View
- 🤖 AI-powered place recognition and history on demand (via button click)
- 📚 Learn about the history and significance of locations
- 📍 User location updates as they move through the city

## Future Features
- Ability to explore places outside Sweden
- User Authorization and account creation
- Introduce ranking of users with most explored places
- Enable achievements for explored spots
- Implement mobile app
- Add chat interaction to ask follow-up questions and get more info about locations in real-time

## Approach
- Create project in Vue using Vite
- Set up User Interface and connect it to Google Maps API
- Create connection between location API and server to receive POST data
- Set GET request from LLM to retrieve location from server
- Create pop up on UI side to show LLM response about the location history

## How to Run the Project

### 1. Install dependencies

```sh
  cd ./frontend
  npm install
  cd ../backend
  npm install
```

### 2. Start the website
In a new terminal run
```sh
  cd frontend
  npm run dev
```

### 2. Start the server
In a new terminal run
```sh
  cd backend
  node index.js
```


Open your browser and go to the local address shown in the first terminal (usually http://localhost:5173).



## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (disable Vetur)
- [Intellij IDEA](https://www.jetbrains.com/idea/#)

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Result

Users can freely explore the city via Street View. When they want info about their current view, they just click the button , triggering a request to the AI backend that responds with historical and contextual details about the location, shown right on screen. Location updates happen live as the user moves.