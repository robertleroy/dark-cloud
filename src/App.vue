<script>
import { mapGetters } from "vuex";

export default {
  name: "app",
  data() {
    return {
      title: "Vue",
    };
  },

  computed: {
    ...mapGetters([
      "currentLocation",
      "showSearchDialog",
      "loading",
      "alerts",
      "daily",
    ]),

    locationString() {
      return this.currentLocation.city
        ? this.currentLocation.city + ", " + this.currentLocation.region
        : this.currentLocation.localName;
    },
  },

  methods: {
    openSearchDialog() {
      this.$store.commit("setShowSearchDialog", true);
    },

    closeSearchDialog() {
      if (this.showSearchDialog) {
        this.$store.commit("setShowSearchDialog", false);
      }
    },
  },

  mounted: function () {    
    if (navigator.geolocation) {
      this.$store.dispatch("getGeolocation");
    } else {
      this.$store.dispatch('getIp');
    }
  },

};
</script>

<template>
  <section id="app" v-cloak>
    <transition name="slideDown" mode="out-in">
      <SearchDlg :key="showSearchDialog" v-if="showSearchDialog" />
    </transition>

    <header>
      <transition name="fade" mode="out-in">
        <div
          class="group"
          :key="loading"
          v-if="currentLocation.country"
          @click="openSearchDialog">
          <div class="location h4 btn">{{locationString}}</div>
          <div class="icon btn search" title="my location">search</div>
        </div>

        <div class="loader btn" v-else :key="loading" @click="openSearchDialog">
          <!-- <div>loading ...</div> -->
          <div></div>
        </div>
      </transition>
    </header>

    <main>
      <transition name="fade" mode="out-in">
        <router-view />
      </transition>
    </main>

    <footer :class="{ transparent: $route.name==='WindyMap'}">
      <nav>
        <div class="spacer"></div>

        <router-link to="/" class>Home</router-link>
        <span>|</span>
        <router-link to="/map" class>Map</router-link>
        <span v-if="alerts">|</span>
        <router-link v-if="alerts" to="/alerts" class="tomato">Alerts</router-link>

        <div class="aboutBtn">
          <router-link to="/about">
            <div class="icon btn" @click="closeSearchDialog">help_outline</div>
          </router-link>
        </div>
      </nav>
    </footer>
  </section>
</template>


<style lang='scss'>
@import "./scss/baseline";
@import url("https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&display=swap");
#app {
  font-family: "Lato", $sans-serif;
  position: relative;

  display: grid;
  grid-template-rows: auto 1fr;
  height: 100vh;
}

header {
  z-index: 5;
  padding: 1rem 0;

  min-height: 4rem;
  text-align: center;
  background: $backgroundColor;
  @include shadow(1);

  .group {
    max-width: 768px;
    margin: auto;

    display: grid;
    grid-auto-flow: column;
    justify-content: center;
    align-items: center;
    grid-gap: 0 1rem;

    .location {
      text-decoration: underline;
      text-decoration-color: rgba(0, 0, 0, 0.3);
      line-height: 1;
    }
  }
}

main {
  overflow-y: auto;
}

footer {
  position: sticky;
  bottom: 0;

  background: $backgroundColor;
  z-index: 100;

  @include shadow(3);

  nav {
    max-width: 768px;
    margin: auto;

    display: flex;
    justify-content: center;
    align-items: center;
    grid-gap: 0 1rem;
    padding: 0.5rem 0;
  }

  .spacer,
  .aboutBtn {
    flex: 1;
    align-self: flex-end;
    text-align: right;
    padding-right: 2rem;
  }

  span {
    color: var(--vue-blue);
  }
}

.transparent {
  background: transparent;
}

.tomato {
  color: tomato;
}

// ANIMATION //

.loader {
  display: inline-block;

  font-family: "Inconsolata", "Monaco", "Menlo", "Consolas", "Courier New",
    Courier, monospace;
  opacity: 0.6;
}

.loader div {
  display: inline-block;
  animation: spinner 2s linear infinite;

  height: 0.5rem;
  border-radius: 0.25rem;
  width: 15rem;
  background: var(--blueGray-100);
}

@keyframes spinner {
  from {
    transform: rotateY(0deg);
  }
  to {
    transform: rotateY(360deg);
  }
}

.slideDown-enter-active,
.slideDown-leave-active {
  position: absolute;
  transition: all 0.3s;
}

.slideDown-enter,
.slideDown-leave-to {
  transform: translateY(-100vw);
}
</style>
