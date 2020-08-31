<script>
import WobbleChart from "../components/WobbleChart";
import RangeBar from "../components/RangeBar";
import Hours from "../components/Hours";
import { mapGetters } from "vuex";

export default {
  name: "home",
  components: {
    WobbleChart: WobbleChart,
    Hours: Hours,
    RangeBar: RangeBar,
  },


  data() {
    return {
      title: "home",
    };
  },


  computed: {
    ...mapGetters([
      "currentLocation",
      "precipThisHour",
      "current",
      // 'minutely',
      "hourly",
      "daily",
      "summary",
      "hours",
      "days",
      "weekRange",
      "loading",
    ]),

    shadowClass () {
      let str = 'nightShadow';
      if (this.current.time > this.daily[0].sunriseTime && this.current.time < this.daily[0].sunsetTime) {
        str = 'dayShadow';
      }
      return str;
    }
  },


  methods: {
    precipType(type) {
      let symbol =
        type === "rain"
          ? `💧`
          : type === "rain"
          ? `❄️`
          : type === "sleet"
          ? `🧊`
          : " ";
      return symbol;
    },

    checkIcon(obj) {
      let str = obj.icon;
      if (obj.cloudCover > 0.6 && str.startsWith("partly"))
        str = str.replace("partly", "mostly");
      if (str === "rain" && obj.precipIntensity < 0.035) str = "drizzle";
      if (str === "snow" && obj.precipIntensity < 0.035) str = "flurries";
      return str;
    },
  },
  

  mounted: function () {},
};
</script>

<template>
  <section id="home" v-if="!loading">
    <div class="grid_main">
      <div class="today">
        <div class="forecastTime">
          <span>{{ current.time* 1000 | date('dddd') }},</span>
          <span>{{ current.time* 1000 | date('mmmm dS') }}</span>
          <span>{{ current.time* 1000 | date('h:MM tt') }}</span>
        </div>
        <!-- forecastTime -->

        <div class="nowcast">
          <div class="snapshot">
            <WeatherIcon :icon="checkIcon(current)"
                        :class="shadowClass" />

            <div class="nowTemp">{{current.temperature | number | suffix('°')}}</div>
          </div>
          <!-- snapshot -->

          <div class="nowSummary">{{current.summary}}</div>
        </div>
        <!-- nowcast -->

        <transition name="fade" mode="out-in">
          <div class="precipChart" :key="current.time" v-if="precipThisHour">
            <WobbleChart />

            <div class="title">{{summary.minutely}}</div>
          </div>
        </transition>
        <!-- precipChart -->

        <div class="todayMeta">
          <div class="dl">
            <div class="dt">High</div>
            <div class="dayHigh dd">{{daily[0].temperatureHigh | number | suffix('°')}}</div>
            <div class="dt">Low</div>
            <div class="dayLow dd">{{daily[0].temperatureLow | number | suffix('°')}}</div>
          </div>

          <div class="dl">
            <div class="dt">Sunrise</div>
            <div class="sunrise dd">{{daily[0].sunriseTime*1000 | date('h:MM tt')}}</div>
            <div class="dt">Sunset</div>
            <div class="sunset dd">{{daily[0].sunsetTime*1000 | date('h:MM tt')}}</div>
          </div>
        </div>
        <!-- todayMeta -->
      </div>
      <!-- today -->

      <div class="todayHours">
        <div class="summary">{{daily[0].summary}}</div>
        <hours :hours="hourly.slice(0,24)" />
      </div>

      <hr />

      <div class="week">
        <div class="weekSummary">
          <div>{{summary.daily}}</div>
        </div>

        <accordion v-for="(day,i) of days" :key="i">
          <template #header>
            <div class="pnlHeader">
              <div class="dayIcon">
                <WeatherIcon :icon="daily[i].icon" 
                :class="{}"/>
              </div>

              <div class="weekday">
                <div v-if="i===0">Today</div>
                <div v-else>{{(current.time*1000) + (86400000*(i)) | date('ddd')}}</div>

                <div class="precip">
                  <!-- <div v-if='daily[i].precipProbability > 0.09'> -->

                  <div>
                    <span>{{ precipType(daily[i].precipType) }}</span>

                    <span v-if="daily[i].precipProbability < 0.01">0%</span>
                    <span v-else>{{ daily[i].precipProbability*100 | number | suffix('%')}}</span>
                  </div>
                </div>
              </div>
              <!-- weekday -->

              <range-bar
                :domain="weekRange"
                :high="daily[i].temperatureHigh"
                :low="daily[i].temperatureLow"
              ></range-bar>
            </div>
          </template>
          <!-- #header -->

          <template #panel>
            <div class="pnlBody">
              <div class="summary">{{daily[i].summary}}</div>
              <hours :hours="day" />
            </div>
          </template>
          <!-- #panel -->
        </accordion>
      </div>
      <!-- week -->
    </div>
    <!-- grid_main -->
  </section>
</template>


<style scoped lang='scss'>
@import "../scss/imports";

grid_main {
  display: grid;
  scroll-snap-type: y mandatory;
}

.forecastTime {
  font-size: var(--h8);
  display: grid;
  grid-auto-flow: column;
  justify-content: center;
  grid-gap: 0 0.5rem;
  padding: 0.5rem 1rem;
}

.nowcast {
  margin: 1.5rem 1rem 2rem;

  .snapshot {
    display: flex;
    justify-content: center;
    align-items: center;
    // gap: 0 0.5rem;
    // margin-bottom: 2rem;

    .weatherIcon {
      font-size: 10rem;
      margin-left: -1rem;
    }

    .nowTemp {
      font-size: 3.5rem;
    }
  }

  .nowSummary {    
    font-size: 2rem;
    // font-size: var(--h4);
    text-align: center;
    margin-top: -1.5rem;
    // margin-bottom: 2.5rem;
    // margin-top: 0rem;
    margin-bottom: 3.5rem;
  }

}

.precipChart {
  width: 100%;
  max-width: 500px;
  padding: 1rem;
  margin: -1rem auto 2rem;
  .title {
    text-align: center;
    font-size: var(--h7);
    font-weight: 300;
    margin-top: -0.4rem;
    margin-bottom: -0.5rem;
  }
}

.todayMeta {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  gap: 0.5rem 4rem;

  width: 100%;
  max-width: 500px;
  padding: 1rem;
  margin: 1rem auto 1rem;

  font-variant: small-caps;

  .dl {
    display: grid;
    grid-template-columns: max-content max-content;
    grid-gap: 0 1rem;
  }

  .dt {
    &:after {
      content: ": ";
    }
  }
  .dd {
  }
}

.todayHours {
  scroll-snap-align: start;

  width: 90%;
  max-width: 640px;
  margin: 2rem auto 2rem;

  .summary {
    padding: 1rem 0;
    text-align: center;
    font-size: var(--h5);
  }
}

.week {
  scroll-snap-align: start;

  width: 90%;
  max-width: 640px;
  margin: 3rem auto 0;
}
.weekSummary {
  font-size: var(--h5);
  text-align: center;
  padding: 0 0 1rem 0;
}
.accordion {
  .pnlHeader {
    display: grid;
    grid-template-columns: 5rem 5rem 1fr;
    align-items: center;
    .weekday {
      .precip {
        color: var(--muted-7);
        font-size: var(--h8);
        line-height: 1.3;
        div {
          padding-right: 0.5rem;
        }
        span:first-child {
          font-size: 70%;
          margin-right: 0.2rem;
          vertical-align: 2px;
          -webkit-filter: grayscale(60%);
          filter: grayscale(60%);
        }
      }
    }
    .weatherIcon {
      font-size: 4.5rem;
      // filter: drop-shadow(1px 1px 0px rgba(midnightblue,0.5));
    }
    .dayIcon .wi {
      font-size: 2.1rem;
    }
    .barRange {
    }
  }

  .pnlBody .summary {
    padding: 0 0 0.75rem 0;
    font-weight: 300;
  }
} // accordion

.transparent {
  color: transparent;
}

.dayShadow {
  filter: drop-shadow(0.2rem 0.3rem 0.8rem rgba(#0D47A1,0.4));
}
.nightShadow {
  filter: drop-shadow(0.2rem 0.3rem 0.8rem rgba(#082a5e,0.4));
}
</style>
