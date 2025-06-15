# Mapventure
### Interactive city exploration with Google Maps and AI

This website allows users to explore places using Google Maps Street View or by uploading photos of locations. Based on the user's location or the selected image, the AI will identify the place and provide historical and contextual information about it. If no such information about the place is found, new closest place with historical meaning will be prompted. Users location updates as he explores the city.

## Current Features

- 🌍 Explore locations with Google Maps Street View
- 📷 Upload or take pictures of places
- 🤖 AI-powered place recognition and history
- 📚 Learn about the history and significance of locations

## Future Features
- Ability to explore places outside Sweden
- User Authorization and account creation
- Introduce ranking of users with most explored places
- Enable achievements for explored spots
- Implement mobile app

## Approach
- Create project in Vue using Vite
- Set up User Interface and connect it to Google Maps API
- Create connection between location API and server to receive POST data
- Set GET request from LLM to retrieve location from server
- Create pop up on UI side to show LLM response about the location history

## How to Run the Project

### 1. Install dependencies

```sh
  npm install
```

### 2. Start the development server

```sh
  npm run dev
```

Open your browser and go to the local address shown in the terminal (usually http://localhost:5173).

### 3. Build for production

```sh
  npm run build
```

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (disable Vetur)
- [Intellij IDEA](https://www.jetbrains.com/idea/#)

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Result
Website is fully usable by the user. Current location is updated automatically as user moves. User can choose building they want to explore without any issues and press on button that will activate LLM's response in a pop up window. If more questions about the place occur, user can continue conversation with LLM to get more information. 