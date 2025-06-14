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
  data() {
    return {
      map: null,
      locationMarker: null,
      panorama: null,
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
                zoom: 1,
              }
            );
            this.map.setStreetView(this.panorama);

            this.panorama.addListener("position_changed", () => {
              const newPosition = this.panorama.getPosition();
              this.updateLocation(newPosition)
            });
            // ---Initiate markers---
            const busIcon = document.createElement("img");
            busIcon.src =
                "https://developers.google.com/maps/documentation/javascript/examples/full/images/bus_icon.svg";
            const busMarkerData = {
              position: { lat: 57.687016, lng: 11.976506 },
              title: "Bus Stop",
              icon: busIcon.src,
            };
            const busMarkerMap = new google.maps.Marker(busMarkerData)
            busMarkerMap.setMap(this.map)
            const busMarkerPanorama = new google.maps.Marker(busMarkerData)
            busMarkerPanorama.setMap(this.panorama)
            // ----------------------


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
    },
    updateLocation(newPosition) {
      this.map.setCenter(newPosition)
      this.locationMarker.setPosition(newPosition)
    },

sendCurrentStreetViewLocation() {
  if (!this.panorama) {
    alert("Street View not ready.");
    return;
  }

  const pos = this.panorama.getPosition();

  const geocoder = new window.google.maps.Geocoder();

  geocoder.geocode({location: pos}, (results, status) => {
    if (status === "OK" && results[0]) {
      const fullAddress = results[0].formatted_address;

      let city = "";
      const addressComponents = results[0].address_components;
      for (const component of addressComponents) {
        if (component.types.includes("locality")) {
          city = component.long_name;
          break;
        }
      }

      const dataToSend = {
        address: fullAddress,
        city: city
      };

      console.log("Sending address data:", dataToSend);

      fetch("http://localhost:3000/api/locations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(dataToSend)
      })
          .then(res => res.json())
          .then(data => {
            console.log("Server response:", data);
            alert("Current view address sent successfully!");
          })
          .catch(err => {
            console.error("Error sending location:", err);
            alert("Failed to send location.");
          });
    } else {
      alert("Failed to get address from coordinates.");
    }
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
  box-shadow: 0 2px 6px rgba(0,0,0,0.3);
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

html, body, #app {
  margin: 0;
  padding: 0;
  height: 100%;
}
</style>
