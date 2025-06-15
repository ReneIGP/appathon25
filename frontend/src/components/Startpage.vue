<template>
  <div class="startpage">
    <div class="overlay"></div>
    <div class="content-box">
      <h1>
        Mapventure
      </h1>
      <p>
        Explore the future without leaving the past
      </p>
      <button class="start-btn" @click="startAdventure">
        Start Your Journey
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Startpage",
  methods: {
    startAdventure() {
      this.$router.push({ name: 'Map' });
    }
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Inter:wght@400;600&display=swap');

.startpage {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-image: url('@/assets/world.jpg');
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: -1; /* if you want it behind other content */
}

.overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom right, rgba(30, 20, 10, 0.6), rgba(0, 0, 0, 0.7));
  backdrop-filter: blur(3px);
  z-index: 1;
}

.content-box {
  position: relative;
  z-index: 2;
  background: rgba(255, 248, 235, 0.75); /* more translucent */
  border-radius: 16px;
  padding: 30px 25px; /* smaller padding */
  max-width: 450px; /* smaller width */
  text-align: center;
  box-shadow: 0 20px 60px rgba(0,0,0,0.5), inset 0 0 15px rgba(0,0,0,0.15);
  backdrop-filter: blur(2px);
  animation: floatIn 1.2s ease-out forwards;
  opacity: 0;
  transform: translateY(30px);
}

@keyframes floatIn {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

h1 {
  font-family: 'Playfair Display', serif;
  font-size: 2.5rem;
  color: #2c1d15;
  text-shadow: 0 0 10px rgba(44,29,21,0.6);
}

p {
  font-family: 'Inter', sans-serif;
  font-size: 1.2rem;
  color: #3d2a1f;
  margin: 15px 0 25px;
  text-shadow: 0 1px 2px rgba(0,0,0,0.3);
}

.start-btn {
  font-family: 'Playfair Display', serif;
  background: linear-gradient(135deg, #3d2a1f, #6e4c3e);
  color: #fefcf9;
  padding: 12px 28px;
  border: none;
  border-radius: 40px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 8px 20px rgba(0,0,0,0.5);
}

.start-btn:hover {
  transform: translateY(-2px) scale(1.05);
  box-shadow: 0 12px 30px rgba(0,0,0,0.7);
}

@media (max-width: 600px) {
  .content-box {
    max-width: 90vw;
    padding: 20px 15px;
  }
  h1 {
    font-size: 2rem;
  }
  p {
    font-size: 1rem;
  }
}
</style>
