<template>
  <div class="container">
    <div class="street-view-container" ref="streetView"></div>
    <div class="map-container" ref="map"></div>

    <button class="send-btn" @click="openChatRoom">Send Your Current View</button>

    <ChatRoom
      v-if="showChat"
      :lat="currentLat"
      :lng="currentLng"
      @close="showChat = false"
    />
  </div>
</template>

<script>
import ChatRoom from './ChatPopup.vue';

export default {
  name: "MapWithStreetView",
  components: { ChatRoom },
  data() {
    return {
      map: null,
      panorama: null,
      showChat: false,
      currentLat: null,
      currentLng: null,
    };
  },
  mounted() {
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    if (!window.google) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
      script.async = true;
      script.defer = true;
      script.onload = this.initMap;
      document.head.appendChild(script);
    } else {
      this.initMap();
    }
  },
  methods: {
    initMap() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          position => {
            const userLocation = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

            this.map = new window.google.maps.Map(this.$refs.map, {
              center: userLocation,
              zoom: 15,
              disableDefaultUI: true,
              gestureHandling: 'none',
            });

            this.panorama = new window.google.maps.StreetViewPanorama(
              this.$refs.streetView,
              {
                position: userLocation,
                pov: { heading: 165, pitch: 0 },
                zoom: 1,
              }
            );
            this.map.setStreetView(this.panorama);

            this.panorama.addListener("position_changed", () => {
              const pos = this.panorama.getPosition();
              this.map.setCenter(pos);
            });
          },
          () => alert("Location permission denied or unavailable.")
        );
      } else {
        alert("Geolocation not supported by your browser.");
      }
    },
    openChatRoom() {
      if (!this.panorama) {
        alert("Street View not ready");
        return;
      }
      const pos = this.panorama.getPosition();
      this.currentLat = pos.lat();
      this.currentLng = pos.lng();
      this.showChat = true;
    }
  }
};
</script>

<style scoped>
.container {
  position: relative;
  height: 100vh;
  width: 100%;
}

.street-view-container {
  height: 100%;
  width: 100%;
}

.map-container {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 200px;
  height: 200px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 6px rgba(0,0,0,0.3);
  z-index: 10;
}

.send-btn {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  padding: 15px 40px;
  background: #2e9fcc;
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  z-index: 20;
}
</style>
