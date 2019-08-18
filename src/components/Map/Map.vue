<template>
  <main>
    <section class="row q-col-gutter-md">
      <article class="col-xs-12">
        <slot name="map-header"> </slot>
      </article>
    </section>
    <section class="row q-col-gutter-md">
      <article class="col-xs-12">
        <GmapMap
          ref="map"
          v-if="marker"
          :center="marker.position"
          :zoom="17"
          style="width: 100%; height: 300px"
          :options="mapOptions"
        >
          <GmapMarker
            @dragend="onDragEnd"
            ref="marker"
            :position="marker.position"
            :draggable="true"
          />
        </GmapMap>
      </article>
    </section>
  </main>
</template>

<script>
import * as utm from "utm";
export default {
  name: "map-component",
  props: {
    latLngCoord: {
      latitude: {
        type: Number
      },
      longitude: {
        type: Number
      }
    },
    utmCoord: {
      easting: {
        type: Number
      },
      northing: {
        type: Number
      },
      zoneLetter: {
        type: String
      },
      zoneNum: {
        type: Number
      }
    }
  },
  mounted() {
    this.initProps();
    // Initialize geocoder
    this.$gmapApiPromiseLazy().then(() => {
      this.geocoder = new google.maps.Geocoder();
    });
    this.$nextTick(() => {
      this.$refs.map.$gmapApiPromiseLazy().then(this.loadControls);
    });
    this.getPosition();
  },
  data() {
    return {
      geocoder: null,
      marker: {
        position: {
          lat: -2.1620979,
          lng: -79.911651
        }
      },
      mapOptions: {
        mapTypeControl: false,
        streetViewControl: false,
        cancelable: false
      }
    };
  },
  methods: {
    emitLocation(latitude, longitude) {
      this.marker.position.lat = latitude;
      this.marker.position.lng = longitude;
      const latLngCoord = {
        latitude,
        longitude
      };
      const utmCoord = utm.fromLatLon(latitude, longitude);
      const location = {
        latLngCoord,
        utmCoord
      };
      this.$emit("newLocation", location);
    },
    getPosition() {
      navigator.geolocation.getCurrentPosition(
        position => {
          this.emitLocation(
            position.coords.latitude,
            position.coords.longitude
          );
        },
        error => {
          console.error(error);
          this.$q.notify(error.message);
        },
        {}
      );
    },
    /**
     * When user moves the marker across the map
     * Gets the entire information of the place of the marker and sends the location object to the parent
     * @param {Object} param Response from Google Maps API on drag-end action
     */
    onDragEnd(param) {
      this.geocoder.geocode({ location: param.latLng }, results => {
        if (results && results.length > 0) {
          this.emitLocation(
            results[0].geometry.location.lat(),
            results[0].geometry.location.lng()
          );
        }
      });
    },
    initProps() {
      if (this.latLngCoord) {
        this.marker.position = {
          lat: this.latLngCoord.latitude,
          lng: this.latLngCoord.longitude
        };
      } else if (this.utmCoord) {
        const latLngCoord = utm.toLatLon(
          this.utmCoord.easting,
          this.utmCoord.northing,
          this.utmCoord.zoneNum,
          this.utmCoord.zoneLetter
        );
        this.marker.position = {
          lat: latLngCoord.latitude,
          lng: latLngCoord.longitude
        };
      }
    }
  }
};
</script>
