<template>
  <div class="startpage">
    <div class="content-box">
      <h1>🗺️ Ready to Explore? 🗺️</h1>
      <p>Let’s get lost in the streets together 🌍✨</p>
      <button class="start-btn" @click="startAdventure">Start</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Startpage",
  methods: {
    startAdventure() {
      //map method
    }
  }
};
</script>

<style scoped>
html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}

/* Main container */
.startpage {
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
  font-family: 'Comic Sans MS', cursive, sans-serif;
  background-image: url('@/assets/World Map Blue Wall Mural _ Wallsauce US.jpg');
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #2c3e50;
  text-align: center;
  overflow: hidden; 
  padding: 20px;
}

/* White box for content */
.content-box {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(44, 62, 80, 0.15);
  padding: 40px 30px;
  max-width: 650px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
   text-align: center;
}

h1 {
  font-size: 3rem;
  margin-bottom: 10px;
  animation: float 3s ease-in-out infinite;
  color: #34495e;
  word-break: break-word;
}

p {
  font-size: 1.5rem;
  margin-bottom: 30px;
  color: #2c3e50;
  max-width: 90vw;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.start-btn {
  background-color: #2e9fcc;
  border: none;
  color: white;
  padding: 15px 30px;
  font-size: 1.2rem;
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.start-btn:hover {
  background-color: #27ae60;
  transform: scale(1.1);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
}

@media (max-width: 600px) {
  h1 {
    font-size: 2rem;
  }
  p {
    font-size: 1.2rem;
  }
  .start-btn {
    font-size: 1rem;
    padding: 12px 24px;
  }
  .content-box {
    padding: 20px 10px;
    max-width: 95vw;
  }
}
</style>