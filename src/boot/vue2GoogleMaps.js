/**
  Plugin configuration file for Vue2 Google Maps
*/

import * as VueGoogleMaps from "vue2-google-maps";

export default async ({ Vue }) => {
  Vue.use(VueGoogleMaps, {
    load: {
      key: "AIzaSyBus3vBieS6A-mmva0eaVT6dtsEue3hE9w",
      libraries: "places, geocode" // This is required if you use the Autocomplete plugin
      // OR: libraries: 'places,drawing'
      // OR: libraries: 'places,drawing,visualization'
      // (as you require)

      //// If you want to set the version, you can do so:
      // v: '3.26',
    }

    //// If you intend to programmatically custom event listener code
    //// (e.g. `this.$refs.gmap.$on('zoom_changed', someFunc)`)
    //// instead of going through Vue templates (e.g. `<GmapMap @zoom_changed="someFunc">`)
    //// you might need to turn this on.
    // autobindAllEvents: false,

    //// If you want to manually install components, e.g.
    //// import {GmapMarker} from 'vue2-google-maps/src/components/marker'
    //// Vue.component('GmapMarker', GmapMarker)
    //// then disable the following:
    // installComponents: true,
  });
};
