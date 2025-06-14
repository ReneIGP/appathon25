<template>
  <div class="map-container" ref="map"></div>
</template>

<script>
export default {
  name: "Map",
  mounted() {
    if (!window.google) {
      const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
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
            const map = new window.google.maps.Map(this.$refs.map, {
              center: userLocation,
              zoom: 15,
            });
            new window.google.maps.Marker({
              position: userLocation,
              map: map,
              title: "You are here",
              icon: {
                url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
                scaledSize: new window.google.maps.Size(40, 40)
              }
            });
          },
          error => {
            alert("Location permission denied or unavailable. Can't show map.");
            new window.google.maps.Map(this.$refs.map, {
              center: { lat: 0, lng: 0 },
              zoom: 2,
            });
          }
        );
      } else {
        alert("Geolocation not supported by your browser.");
        new window.google.maps.Map(this.$refs.map, {
          center: { lat: 0, lng: 0 },
          zoom: 2,
        });
      }
    }
  }
};
</script>


<style scoped>
.map-container {
  width: 100%;
  height: 100vh;
  position: relative;
}

html, body, #app {
  margin: 0;
  padding: 0;
  height: 100%;
}
</style>
