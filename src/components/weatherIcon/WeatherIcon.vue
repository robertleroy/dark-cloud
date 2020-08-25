<script>
  import {icons} from './icons.js';
  export default {
    name: 'WeatherIcon',
    props: {
      icon: {
        type: String,
        required: false
      }
    },

    data() {
      return {
        title: 'WeatherIcon'
      };
    },

    computed: { 
      svg: function() {
        const iconList = icons;
        let symbol = "";

        if (this.icon) {
          symbol = this.icon;
        } else {          
          try {
            symbol = this.$slots.default[0].text;
          } catch {
            symbol = "clear-day"; 
          }          
        }
        const obj = iconList.find(item => item.name === symbol); 
        return obj;
      }
    }
  };
</script>

<template>
  <svg
    class="weatherIcon"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24">
    <defs v-html="svg.defs"></defs>
    <g v-html="svg.path"></g>
    <slot></slot>
  </svg>
</template>

<style scoped lang='scss'>
  @import '../../scss/imports';

  svg {
    height: 1em;
    width: 1em;
    font-size: 2rem;
    border: none;
    outline: none;
    user-select: none;

    display: inline-grid;
    place-items: center center;
  }

</style>
<!--
<WeatherIcon wicon="clear-day"></WeatherIcon>
<WeatherIcon>clear-night</WeatherIcon>

<weather-icon wicon=""></weather-icon>
<weather-icon></weather-icon>
-->