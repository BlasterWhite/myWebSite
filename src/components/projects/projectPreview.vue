<template>
  <div
    v-if="isVisible"
    class="project-preview"
    :style="'background-image: url(' + props.modelValue?.thumbnail + ');'"
  >
    <div v-if="props.modelValue?.ongoing" class="ongoing">
      <span>Ongoing</span>
    </div>
    <div class="title">
      {{ props.modelValue?.title || "Project" }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, type PropType } from "vue";
import type { Project } from "@/types/project";

interface ProjectSearch extends Project {
  inSearch: boolean;
}

const props = defineProps({
  modelValue: {
    type: Object as PropType<ProjectSearch>,
    required: true,
  },
});

const isVisible = computed(
  () => props.modelValue?.inSearch && props.modelValue?.active,
);
</script>

<style scoped lang="scss">
.project-preview {
  width: 400px;
  height: 200px;
  border-radius: 8px;
  overflow: hidden;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  .ongoing {
    position: absolute;
    top: 0;
    right: 0;
    background: #ff0000;
    color: #fff;
    padding: 0.5rem;
    font-size: 0.75rem;
    font-weight: 600;
    z-index: 3;
    border-bottom-left-radius: 8px;
  }

  .title {
    font-size: 1.5rem;
    font-weight: 600;
    margin: 0;
    color: #fff;
    text-decoration: none;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    transition: 0.3s ease-in-out;

    &:hover {
      background: rgba(0, 0, 0, 0.75);
      color: #fff;
      transition: 0.3s ease-in-out;
      cursor: pointer;
    }
  }
}
</style>
