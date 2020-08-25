<script>
  export default {
    name: 'Accordion',
    props: {
      opened: {
        type: Boolean,
        default: false,

      },
    },


    data() {
      return {
        isOpen: this.opened,
      };
    },
    

    methods: {
      start(el) {
        el.style.height = el.scrollHeight + 'px';
      },
      end(el) {
        el.style.height = '';
      }
    }
  };
</script>

<template>
  <section class='accordion'>
    <div class="header" @click="isOpen = !isOpen">
      <slot name="header"></slot>
    </div>
    
    <transition 
      name="collapse"
      @enter="start"
      @after-enter="end"
      @before-leave="start"
      @after-leave="end">

      <div class="content" v-show="isOpen">
        <div class="panel">
          <slot name="panel"></slot>
        </div>
      </div>
    </transition>
  </section>
</template>
<style scoped lang='scss'>
  @import '../scss/imports';

  .accordion {
    border-bottom: 1px solid #e8e8e8;
    .header {
      padding: 1rem 0;
      cursor: pointer;
    }
    .panel {
      padding: 0 0 0.5rem;
      min-height: 5rem;
    }

    .collapse-enter-active, .collapse-leave-active {
      will-change: height, opacity;
      -webkit-transition: height 0.3s ease, opacity 0.3s ease;
      transition: height 0.3s ease, opacity 0.3s ease;
      overflow: hidden;
    }

    .collapse-enter, .collapse-leave-to {
      height: 0 !important;
      opacity: 0;
    }
  }
</style>
