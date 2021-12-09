<template>
  <GmapMap
    :center="{lat: 55.7362067, lng: 37.5333641}"
    :zoom="15"
    v-if="ready"
    :options="mapCustomStyles"
    map-type-id="terrain"
  >
    <GmapMarker
      :position="{lat: 55.7362067, lng: 37.5333641}"
      :clickable="true"
      :draggable="false"
      @click="center={lat: 55.7513147, lng: 37.5787119}"
      :icon="markerIcon"
    />
  </GmapMap>
</template>

<script>
import MapStyles from './bigmap-mapstyles.json'

export default {
  name: 'Map',
  data () {
    return {
      ready: false,
      map: null,
      markers: [],
      mapCustomStyles: {
        zoomControl: false,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: false,
        disableDefaultUi: false,
        styles: MapStyles
      },
      markerIcon: {
        path: 'M0.0820312 27.0673C0.0820312 12.4185 12.0273 0.570801 26.7966 0.570801C41.566 0.570801 53.5112 12.4185 53.5112 27.0673C53.5112 46.9396 26.7966 76.275 26.7966 76.275C26.7966 76.275 0.0820312 46.9396 0.0820312 27.0673ZM17.2557 27.0673C17.2557 32.2908 21.53 36.5303 26.7966 36.5303C32.0632 36.5303 36.3376 32.2908 36.3376 27.0673C36.3376 21.8437 32.0632 17.6042 26.7966 17.6042C21.53 17.6042 17.2557 21.8437 17.2557 27.0673Z',
        fillColor: '#4AB7AE',
        fillOpacity: 1,
        strokeWeight: 0,
        scale: 1,
        anchor: { x: 45, y: 65 }
      }
    }
  },
  mounted () {
    this.ready = true
  }
}
</script>
