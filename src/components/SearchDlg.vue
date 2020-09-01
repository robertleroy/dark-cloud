<script>
export default {
  name: "SearchDlg",
  data() {
    return {
      title: "SearchDlg",
      drag: false,
      searchTerm: "",
      placeholder: "Search..",
      errorMessage: "must be at least 3 characters",
      showErrorMessage: false,
    };
  },


  computed: {
    savedLocations: {
      get: function () {
        return this.$store.getters.savedLocations;
      },
      set: function (value) {
        this.$store.commit("setSavedLocations", value);
      },
    },

    recentLocations: {
      get: function () {
        return this.$store.getters.recentLocations;
      },
      set: function (value) {
        // console.log('setter',value);
        this.$store.commit("setRecentLocations", value);
      },
    },

    dragOptions: function () {
      return {
        animation: 200,
        disabled: false,
        ghostClass: "ghost",
        group: "combined",
        emptyInsertThreshold: 100,
        removeOnSpill: false,
        revertOnSpill: true,
      };
    },
  },


  methods: {
    closeDialog() {
      this.$store.commit("setShowSearchDialog", false);
    },

    removeSavedItem(item) {
      if (confirm(`Remove ${item.city}?`)) {
        const x = this.savedLocations.findIndex((el) => el.id === item.id);
        this.savedLocations.splice(x, 1);
      }
    },

    removeRecentItem(item) {
      // var confirmed = confirm(`Remove ${item.city}?`);
      if (confirm(`Remove ${item.city}?`)) {
        const x = this.recentLocations.findIndex((el) => el.id === item.id);
        this.recentLocations.splice(x, 1);
      }
    },

    setSelection(obj) {
      // set selected
      this.$store.dispatch("dispatchLocation", obj);

      // is it in recent loctions
      const x = this.recentLocations.findIndex((el) => {
        return el.coordinates === obj.coordinates;
      });

      if (x > 0) {
        // send it to front if in recent list
        console.log("shifting");
        this.recentLocations.splice(x, 1);
        this.recentLocations.unshift(obj);
      }
      this.closeDialog();
    },

    geolocate() {
      try {
        if (navigator.geolocation) {
          this.$store.dispatch("getGeolocation");
        } else {
          this.$store.dispatch('getIp');
        }
      } catch {
        console.log("Geolocation error");
          this.$store.commit("setShowSearchDialog", true);
      }
    },

    getTomtom() {
      // if (this.searchTerm.length ) {
        // console.log("search must be 3+ characters long.");
        // this.placeholder = "search must be 3+ characters";
        // this.$refs.searchBox.focus();
      //   return;
      // }
      console.log('dispatch getTomtom',this.searchTerm);
      this.$store.dispatch("getTomtom", this.searchTerm);
    },
  },


  mounted: function () {
    this.$refs.searchBox.focus();
  },
};
</script>


<template>
  <section id="modal">
    <div class="inputBar">
      <div class="barGroup">
        <div class="searchGroup">
          <div class="icon btn" title="my location" @click="geolocate">my_location</div>

            <input type="text"
            ref="searchBox"
            v-model="searchTerm"
            :placeholder="placeholder"
            @keyup.enter="getTomtom">

          <div class="icon btn tomtom" title="search" @click="getTomtom">search</div>
        </div>
        <!-- searchGroup -->

        <div class="icon btn" @click="closeDialog">close</div>
      </div>
      <!-- barGroup -->
    </div>
    <!-- inputBar -->

    <!-- lists ============ -->
    <div class="lists">
      <div class="saved">
        <div class="label">Saved Locations:</div>
        <draggable
          class="list"
          v-model="savedLocations"
          v-bind="dragOptions"
          @start="drag = true"
          @end="drag = false"
          handle=".handle"
        >
          <transition-group :name="!drag ? 'flip-list' : null">
            <div v-for="(item) of savedLocations" :key="item.id" class="list-item">
              <div class="icon handle">drag_handle</div>
              <div
                @click="setSelection(item)"
                class="name handle">
                {{item.city || item.regionName}}, {{item.region}}
              </div>
              <div class="icon btn removeItem" @click="removeSavedItem(item)">delete</div>
            </div>
          </transition-group>
        </draggable>

        <div class="info">~ drag recent searches here to save location ~</div>
      </div>
      <!-- saved -->

      <div class="recent">
        <div class="label">Recent Searches:</div>
        <draggable
          class="list"
          v-model="recentLocations"
          v-bind="dragOptions"
          @start="drag = true"
          @end="drag = false"
          handle=".handle"
        >
          <transition-group :name="!drag ? 'flip-list' : null">
            <div v-for="(item) of recentLocations" :key="item.id" class="list-item">
              <div class="icon handle">drag_handle</div>
              <div
                @click="setSelection(item)"
                class="name handle"
              >{{item.city || item.regionName}}, {{item.region}}</div>
              <div class="icon btn removeItem" @click="removeRecentItem(item)">delete</div>
            </div>
          </transition-group>
        </draggable>
      </div>
      <!-- recent -->
    </div>
    <!-- lists -->
    <!-- lists ============ -->
  </section>
</template>

<style scoped lang='scss'>
@import "../scss/imports";

#modal {
  position: absolute;
  height: 100%;
  width: 100%;
  z-index: 10;
  background: $backgroundColor;

  --searchGap: 0 0.5rem;
  @include media(350px) {
    --searchGap: 0 1rem;
  }
}

.inputBar {
  position: sticky;
  top: 0;
  z-index: 15;
  min-height: 4rem;
  padding: 1rem 0;

  background: $backgroundColor;
  @include shadow(2);
}

.barGroup {
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  grid-gap: var(--searchGap);
  padding: 0 1rem;

  @include media(760px) {
    padding: 0 2rem;
  }
}

.searchGroup {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  grid-gap: var(--searchGap);

  height: 100%;
  width: 100%;
  max-width: 500px;

  margin: auto;

  input {
    text-align: center;
    user-select: none;
  }
}

.lists {
  padding: 1rem 2rem;
  max-width: 500px;
  margin: auto;
}

.list {
  min-height: 32px;
  border-radius: 0.5rem;
  overflow: hidden;
}

.list-item {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  grid-gap: 0.5rem;
  padding: 0 0.5rem;
  border-bottom: 1px solid var(--muted-1);
  cursor: pointer;

  .handle:not(.name) {
    margin-right: 1rem;
    cursor: move;
  }

  .name {
    padding: 1rem 0;
  }

  .icon {
    color: var(--muted-8);
  }
}

.label,
.info {
  font-size: var(--h8);
  color: var(--muted-5);
}

.label {
  line-height: 1;
}

.info {
  font-style: italic;
  text-align: center;
  margin-bottom: 1rem;
}

// #region dropable stuff //
.flip-list-move {
  transition: transform 0.5s;
}

.no-move {
  transition: transform 0s;
}

.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
// #endregion dropable stuff //
</style>