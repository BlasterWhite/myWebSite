<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ShowProject",
  props: {
    projects: {
      type: Array,
      default: [],
    },
    isLoading: {
      type: Boolean,
      default: true,
    },
    projectSelected: {
      type: Number,
      default: 1,
    },
  },
});
</script>

<template>
  <div :class="'project-showcase ' + (isLoading ? 'loading' : '')">
    {{ projectSelected }}
  </div>
</template>

<style scoped lang="scss">
@use "../assets/variables" as v;

$contaier-color: #f6f6f6;

.project-showcase {
  width: calc(100% - 32px);
  margin-left: 32px;
  height: 100%;
  min-height: 300px;
  background-color: $contaier-color;
  border-radius: 10px;

  &.loading {
    animation: loading 1.5s infinite;
    user-select: none;
  }
}

@keyframes loading {
  0% {
    background-color: #f6f6f6;
  }
  50% {
    background-color: #e6e6e6;
  }
  100% {
    background-color: #f6f6f6;
  }
}
</style>
