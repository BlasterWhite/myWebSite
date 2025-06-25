<template>
  <div class="project-fullscreen">
    <div class="project-fullscreen-container">
      <div id="project-fullscreen-close">
        <svg width="24" height="24" viewBox="0 0 24 24" @click="$emit('close')">
          <path
            fill="currentColor"
            d="M12 10.586L16.95 5.636a1 1 0 111.414 1.414L13.414 12l4.95 4.95a1 1 0 11-1.414 1.414L12 13.414l-4.95 4.95a1 1 0 11-1.414-1.414L10.586 12 5.636 7.05a1 1 0 111.414-1.414L12 10.586z"
          />
        </svg>
      </div>
      <show-project
        class="project-fullscreen-container-content"
        :is-loading="false"
        :projects="projects"
        :project-selected="0"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from "vue";
import type { Project } from "@/types/project";
import ShowProject from "@/components/showProject.vue";
import { computed } from "vue";

const props = defineProps({
  modelValue: {
    type: Object as PropType<Project>,
    required: true,
  },
});

const projects = computed(() => [props.modelValue] as Project[]);
</script>

<style scoped lang="scss">
.project-fullscreen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(10px);
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .project-fullscreen-container {
    width: 80%;
    min-height: 80%;
    max-height: calc(100% - 4rem);
    background-color: #f6f6f6;
    border-radius: 8px;
    padding: 0 1rem;
    overflow: hidden;
    position: relative;
    .project-fullscreen-container-content {
      overflow-y: auto;
    }

    #project-fullscreen-close {
      position: absolute;
      top: 1rem;
      right: 1rem;
      z-index: 1;

      &:hover {
        cursor: pointer;
      }
    }
  }
}
</style>
