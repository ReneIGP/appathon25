<template>
  <div class="chat-room-overlay" @click.self="closeChat">
    <div class="chat-room">
      <header>
        <h3>Chat Room</h3>
        <button class="close-btn" @click="closeChat">✕</button>
      </header>

      <main class="messages">
        <div v-for="(msg, i) in messages" :key="i" :class="['message', msg.from]">
          <p>{{ msg.text }}</p>
        </div>
        <div v-if="loading" class="message ai"><p>Loading...</p></div>
      </main>

      <form @submit.prevent="sendMessage">
        <input
          v-model="input"
          type="text"
          placeholder="Type your message..."
          autocomplete="off"
          :disabled="loading"
        />
        <button type="submit" :disabled="loading || !input.trim()">Send</button>
      </form>
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
      messages: [],
      input: '',
      loading: false,
    };
  },
  mounted() {
    // Automatically send initial location message on mount
    this.sendLocationDescription();
  },
  methods: {
    closeChat() {
      this.$emit('close');
    },
    sendMessage() {
      if (!this.input.trim()) return;
      // User message
      this.messages.push({ from: 'user', text: this.input.trim() });
      this.fetchResponse(this.input.trim());
      this.input = '';
    },
    sendLocationDescription() {
      this.messages.push({ from: 'user', text: `Tell me about this location: (${this.lat.toFixed(5)}, ${this.lng.toFixed(5)})` });
      this.fetchResponse(`Describe this location at lat=${this.lat} lng=${this.lng}`);
    },
    fetchResponse(prompt) {
      this.loading = true;
      fetch("http://localhost:3000/api/describe-location", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lat: this.lat, lng: this.lng, prompt }),
      })
        .then(res => res.json())
        .then(data => {
          this.messages.push({ from: 'ai', text: data.description || 'No description available.' });
          this.loading = false;
        })
        .catch(() => {
          this.messages.push({ from: 'ai', text: 'Error fetching description.' });
          this.loading = false;
        });
    },
  },
};
</script>

<style scoped>
.chat-room-overlay {
  position: fixed;
  top: 0; left: 0;
  width: 100vw; height: 100vh;
  background: rgba(0,0,0,0.5);
  display: flex; justify-content: center; align-items: center;
  z-index: 9999;
}

.chat-room {
  background: white;
  width: 360px;
  max-width: 90vw;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  max-height: 80vh;
  overflow: hidden;
}

header {
  padding: 10px 15px;
  background: #1976d2;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.close-btn {
  background: transparent;
  border: none;
  font-size: 20px;
  color: white;
  cursor: pointer;
}

.messages {
  flex: 1;
  padding: 15px;
  overflow-y: auto;
  background: #f1f1f1;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.message {
  max-width: 75%;
  padding: 8px 12px;
  border-radius: 12px;
  word-wrap: break-word;
  font-size: 14px;
  line-height: 1.3;
}

.message.user {
  background: #2e9fcc;
  color: white;
  align-self: flex-end;
  border-bottom-right-radius: 0;
}

.message.ai {
  background: #e0e0e0;
  color: #333;
  align-self: flex-start;
  border-bottom-left-radius: 0;
}

form {
  display: flex;
  border-top: 1px solid #ccc;
}

input {
  flex: 1;
  padding: 10px;
  border: none;
  font-size: 14px;
}

input:disabled {
  background: #eee;
}

button {
  padding: 0 15px;
  background: #1976d2;
  border: none;
  color: white;
  cursor: pointer;
  font-weight: 600;
}

button:disabled {
  background: #999;
  cursor: not-allowed;
}
</style>
