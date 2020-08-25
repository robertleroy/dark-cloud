<script>
export default {
  name: "WindyMap",
  data() {
    return {
      title: "WindyMap",
    };
  },
  computed: {
    mapUrl () {
      let loc = {
        lat: 35.443,
        lon: -97.559
      }
      if (this.$store.state.currentLocation) {
        loc.lat = this.$store.getters.currentLocation.lat,
        loc.lon = this.$store.getters.currentLocation.lon
      }
      return `https://embed.windy.com/embed2.html?lat=${loc.lat}&lon=${loc.lon}&detailLat=${loc.lat}&detailLon=${loc.lon}&width=650&height=450&zoom=6&level=surface&overlay=radar&product=radar&menu=&message=true&marker=&calendar=now&pressure=&type=map&location=coordinates&detail=&metricWind=mph&metricTemp=%C2%B0F&radarRange=-1`
    }
  },

  methods: {},
  mounted() {
    this.$refs.windy.focus();
  },
};
</script>

<template>
  <section id="WindyMap">
    
    <!-- imap weather map
    <iframe width="100%" height="100%"
    src="https://weather.wdtinc.com/imap/imaplite/"
    frameborder="0"></iframe>
    -->

    <!-- Windy weather map -->
    <iframe
      ref="windy"
      width="100%"
      height="100%"
      :src="mapUrl"
      frameborder="0"
    ></iframe>
  </section>
</template>

<style scoped lang='scss'>
@import "../scss/imports";

#WindyMap {
  z-index: 20;
  position: absolute;
  top: 0;
  bottom: 4rem;
  right: 0;
  left: 0;
  background: $backgroundColor;
}
</style>
