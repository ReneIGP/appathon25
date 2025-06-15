<template>
  <div class="popup-overlay" @click.self="closePopup">
    <div class="popup-message">
      <button class="close-btn" @click="closePopup">✕</button>
      <div class="popup-content">
        <p>{{ message }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    lat: Number,
    lng: Number,
  },
  data() {
    return {
      message: '',
    };
  },
  mounted() {
    this.fetchDescription();
  },
  watch: {
    lat(newVal, oldVal) {
      if (newVal !== oldVal) this.fetchDescription();
    },
    lng(newVal, oldVal) {
      if (newVal !== oldVal) this.fetchDescription();
    },
  },
  methods: {
    closePopup() {
      this.$emit('close');
    },
    fetchDescription() {
      fetch("http://localhost:3000/api/describe-location", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lat: this.lat, lng: this.lng }),
      })
        .then(res => res.json())
        .then(data => {
          this.message = data.description || 'No description available.';
        })
        .catch(() => {
          this.message = 'Error fetching description.';
        });
    },
  },
};

</script>

<style scoped>
.popup-overlay {
  position: fixed;
  top: 0; left: 0;
  width: 100vw; height: 100vh;
  background: rgba(0,0,0,0.05); 
  z-index: 9999;
  
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;

  pointer-events: none; 
}


.popup-message {
  pointer-events: auto; 
  margin: 24px;
  padding: 24px 32px 24px 24px;
  background: rgba(255,255,255,0.95);
  border-radius: 18px;
  box-shadow: 0 8px 32px rgba(25, 118, 210, 0.18), 0 1.5px 6px rgba(0,0,0,0.08);
  min-width: 200px;
  max-width: 280px;
  max-height: 400px;
  overflow-y: auto;
  position: relative;
  animation: popIn 0.3s ease;
}



.close-btn {
  position: absolute;
  top: 10px; right: 10px;
  background: transparent;
  border: none;
  font-size: 20px;
  color: #333;
  cursor: pointer;
  transition: transform 0.2s;
}
.close-btn:hover {
  transform: scale(1.2);
  background: rgba(0,0,0,0.07);
  border-radius: 50%;
}

.popup-content p {
  margin: 0;
  font-size: 16px;
  color: #222;
}

@keyframes popIn {
  0% { transform: scale(0.9); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
}
</style>