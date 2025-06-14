<template>
  <div ref="map" style="width: 100%; height: 400px;"></div>
</template>

<script>
export default {
  name: "Map",
  mounted() {
    // Load Google Maps script
    if (!window.google) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyD0d8O6v_7_CBdIobTLvfTGRjGLcd_DSbs`;
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
            new window.google.maps.Map(this.$refs.map, {
              center: userLocation,
              zoom: 12,
            });
          },
          () => {
            // Fallback: default location (San Francisco)
            new window.google.maps.Map(this.$refs.map, {
              center: { lat: 37.7749, lng: -122.4194 },
              zoom: 12,
            });
          }
        );
      } else {
        // Browser doesn't support Geolocation
        new window.google.maps.Map(this.$refs.map, {
          center: { lat: 37.7749, lng: -122.4194 },
          zoom: 12,
        });
      }
    }
  }
};
</script>

<style scoped>
.map-container {
  position: fixed;

  width: 100vw;
  height: 100vh;
  z-index: 1;
}
</style>