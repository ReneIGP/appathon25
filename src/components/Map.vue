<template>
  <div class="container">
    <div class="street-view-container" ref="streetView"></div>
    <div class="map-container" ref="map"></div>
  </div>
</template>

<script>
export default {
  name: "MapWithStreetView",
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

          
            const map = new window.google.maps.Map(this.$refs.map, {
              center: userLocation,
              zoom: 15,
              disableDefaultUI: true, 
              gestureHandling: 'none', 
            });

            // Add user location marker
            new window.google.maps.Marker({
              position: userLocation,
              map: map,
              title: "You are here",
              icon: {
                url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
                scaledSize: new window.google.maps.Size(40, 40)
              }
            });

  
            const panorama = new window.google.maps.StreetViewPanorama(
              this.$refs.streetView,
              {
                position: userLocation,
                pov: { heading: 165, pitch: 0 },
                zoom: 1
              }
            );

            map.setStreetView(panorama);
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
  box-shadow: 0 2px 6px rgba(0,0,0,0.3);
  border-radius: 8px;
  overflow: hidden;
  z-index: 10;
}

html, body, #app {
  margin: 0;
  padding: 0;
  height: 100%;
}
</style>
