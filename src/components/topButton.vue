<template>
  <div v-if="show" class="top-button" @click="goToTop">
    <span class="material-symbols-outlined"> arrow_upward </span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "TopButton",
  data() {
    return {
      show: false,
    };
  },
  created() {
    // ESLint-disable-next-line @typescript-eslint/no-misused-promises
    window.addEventListener("scroll", this.handleScroll);
  },
  methods: {
    goToTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
    handleScroll() {
      this.show = true;
      window.removeEventListener("scroll", this.handleScroll);
    },
  },
});
</script>

<style lang="scss">
@use "../assets/variables" as v;

.top-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
  background: v.$color-green;
  color: v.$background-color;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.12);
  user-select: none;
}
</style>
