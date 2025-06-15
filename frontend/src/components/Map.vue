<template>
  <div class="container">
    <div class="street-view-container" ref="streetView"></div>
    <div class="map-container" ref="map"></div>
    <button class="send-btn" @click="sendCurrentStreetViewLocation">Send Your Current View</button>
  </div>
</template>

<script>

export default {
  name: "MapWithStreetView",
  data() {
    return {
      map: null,
      locationMarker: null,
      panorama: null,
      description: "",
      streetViewImageUrl: ""
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
        navigator.geolocation.getCurrentPosition(position => {
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

            // Add user location marker
            this.locationMarker =  new window.google.maps.Marker({
            position: userLocation,
            map: this.map,
            title: "You are here",
            icon: {
              url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
              scaledSize: new window.google.maps.Size(40, 40)
            }
          });

          this.panorama = new window.google.maps.StreetViewPanorama(
            this.$refs.streetView,
            {
              position: userLocation,
              pov: { heading: 165, pitch: 0 },
              zoom: 1
            }
          );

          this.map.setStreetView(this.panorama);

          this.panorama.addListener("position_changed", () => {
            const newPosition = this.panorama.getPosition();
            this.updateLocation(newPosition);
          });
        },
        error => {
          alert("Location permission denied or unavailable. Can't show map.");
          new window.google.maps.Map(this.$refs.map, {
            center: { lat: 0, lng: 0 },
            zoom: 2
          });
        });
      } else {
        alert("Geolocation not supported by your browser.");
        new window.google.maps.Map(this.$refs.map, {
          center: { lat: 0, lng: 0 },
          zoom: 2
        });
      }
    },
    updateLocation(newPosition) {
      this.map.setCenter(newPosition);
      this.locationMarker.setPosition(newPosition);
    },
    sendCurrentStreetViewLocation() {
      if (!this.panorama) {
        alert("Street View not ready.");
        return;
      }

      const position = this.panorama.getPosition();
      const pov = this.panorama.getPov();
      const panoId = this.panorama.getPano();
      const locationDesc = this.panorama.getLocation()?.description;

      fetch("http://localhost:3000/api/describe-location", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          lat: position.lat(),
          lng: position.lng(),
          panoId,
          heading: pov.heading,
          pitch: pov.pitch,
          locationDesc
        })
      })
        .then(response => response.json())
        .then(data => {
          console.log("AI Description:", data.description);
          alert(`AI Description:\n${data.description}`);
        })
        .catch(error => {
          console.error("Error sending location:", error);
          alert("Failed to send location");
        });
    }
  }
};
</script>

<style scoped>
.container {
  position: relative;
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
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
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  border-radius: 8px;
  overflow: hidden;
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

html,
body,
#app {
  margin: 0;
  padding: 0;
  height: 100%;
}
</style>
