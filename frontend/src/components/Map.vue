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
      locationMarker: null,
      tourData: {
        "start": {
          lat: 57.69734940695945,
          lng:  11.979299831420855,
          pov: 0
        },
        "locations": [
          {
            lat: 57.69646401567999,
            lng: 11.980646355554303
          },
          {
            lat: 57.69696269527839,
            lng: 11.979101621389567
          },
          {
            lat: 57.697206489104595,
            lng: 11.979614039709425,
          }
        ]
      }
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

            // Option A: Initialise user's location as User's machine real world location
            // const userLocation = {
            //   lat: position.coords.latitude,
            //   lng: position.coords.longitude
            // };

            // Option B: Initialise user's location as predefined tour start location
            const userLocation = {
              lat: this.tourData.start.lat,
              lng: this.tourData.start.lng
            }

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
              },
              zIndex: 1000
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
              const newPosition = this.panorama.getPosition();
              this.updateLocation(newPosition)
            });
            // ---Initiate markers---
            let markerCounter = 1;
            this.tourData.locations.forEach(coordinates => {


              const newMarkerData = {
                position: coordinates,
                title: "Tour location",
                label: ""+markerCounter,
                icon: {
                  url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
                  scaledSize: new window.google.maps.Size(60, 60)
                }
              }
              markerCounter += 1;
              const newMarkerMap = new google.maps.Marker(newMarkerData)
              newMarkerMap.setMap(this.map)
              const newMarkerPano = new google.maps.Marker(newMarkerData)
              newMarkerPano.setMap(this.panorama)
            })


            // ----------------------

        this.map = new window.google.maps.Map(this.$refs.map, {
          center: userLocation,
          zoom: 15,
          disableDefaultUI: true,
          gestureHandling: 'none',
        });

        // Add user location marker here:
        new window.google.maps.Marker({
          position: userLocation,
          map: this.map,
          title: "You are here",
          icon: {
            path: window.google.maps.SymbolPath.CIRCLE,
            scale: 8,
            fillColor: "#4285F4",
            fillOpacity: 0.9,
            strokeWeight: 2,
            strokeColor: "white",
          },
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

.send-btn {
  position: absolute;
  bottom: 20px;
  right: 20px;
  width: 350px;
  height: 60px;
  background: #4caf50;
  color: white;
  border: none;
  border-radius: 999px;
  cursor: pointer;
  font-size: 20px;
  font-weight: 600;
  
  display: flex;
  align-items: center;
  justify-content: center;

  transition: background-color 0.3s, transform 0.2s;
}

</style>
