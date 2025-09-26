<template>
  <div id="map" class="h-full"></div>
</template>

<script>
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});
export default {
  name: "MapComponent",
  props: {
    lokasi1Lat: { type: String, required: true },
    lokasi1Lng: { type: String, required: true },
    lokasi2Lat: { type: String, required: true },
    lokasi2Lng: { type: String, required: true },
  },
  data() {
    return {
      map: null,
      routingControl: null,
    };
  },

  watch: {
    lokasi1Lat: "updateRoute",
    lokasi1Lng: "updateRoute",
    lokasi2Lat: "updateRoute",
    lokasi2Lng: "updateRoute",
  },

  mounted() {
    this.initMap();
    this.updateRoute();
  },

  methods: {
    initMap() {
      this.map = L.map("map").setView(
        [this.lokasi1Lat || -7.5, this.lokasi1Lng || 110.8],
        10
      );

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
      }).addTo(this.map);
    },
    updateRoute() {
      if (
        this.lokasi1Lat != null &&
        this.lokasi1Lng != null &&
        this.lokasi2Lat != null &&
        this.lokasi2Lng != null
      ) {
        // Hapus route lama
        if (this.routingControl) {
          this.map.removeControl(this.routingControl);
        }

        // Buat route baru
        this.routingControl = L.Routing.control({
          waypoints: [
            L.latLng(this.lokasi1Lat, this.lokasi1Lng),
            L.latLng(this.lokasi2Lat, this.lokasi2Lng),
          ],
          routeWhileDragging: true,
          show: false,
        }).addTo(this.map);

        // Zoom agar semua titik terlihat
        this.map.fitBounds(
          [
            [this.lokasi1Lat, this.lokasi1Lng],
            [this.lokasi2Lat, this.lokasi2Lng],
          ],
          {
            padding: [20, 20], // pixel, [x, y]
          }
        );
      }
    },
  },
};
</script>

<style>
#map {
  /* height: 100vh; */
  width: 100%;
}
</style>
