<template>
  <div class="controller">
    <div @click="slide(432, false)" class="btn">
      <span class="material-symbols-outlined"> arrow_back_ios_new</span>Previous
    </div>
    <div @click="slide(-432, true)" class="btn">
      Next
      <span class="material-symbols-outlined"> arrow_forward_ios</span>
    </div>
  </div>
  <div class="list">
    <div
      class="list-projects loading"
      v-if="isLoading"
      ref="componentRef"
      @mousemove="dragging"
      @mousedown="draggingStart"
      @mouseup="draggingStop"
      @mouseleave="draggingStop"
      @touchmove="dragging"
      @touchstart="draggingStart"
      @touchend="draggingStop"
    >
      <div
        v-for="i in 10"
        :key="i"
        @click="select(i)"
        :id="'listProject' + i"
        :class="projectSelected === i ? 'selected' : ''"
      >
        {{ i }}
      </div>
    </div>
    <div class="list-projects" v-else>
      <div
        v-for="(project, index) in projects"
        :key="index"
        @click="select(index)"
        :id="'listProject' + index"
        :class="projectSelected === index ? 'selected' : ''"
        :style="`background: url(${project.thumbnail}); background-size: cover; background-position: center; overflow: hidden;`"
        @mousemove="dragging"
        @mousedown="draggingStart"
        @mouseup="draggingStop"
        @mouseleave="draggingStop"
        @touchmove="dragging"
        @touchstart="draggingStart"
        @touchend="draggingStop"
      >
        <p class="tag" v-if="index < competences_bachelor.length">
          {{ competences_bachelor[index] }}
        </p>
        <p class="title">
          {{ project.title }}
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type { Project } from "@/types/project";

export default defineComponent({
  name: "ListProjects",
  props: {
    projects: {
      type: Array as () => Project[],
      default: [] as Project[],
    },
    isLoading: {
      type: Boolean,
      default: true,
    },
    projectSelected: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      componentWidth: 0,
      slideValue: 0,
      isDragging: false,
      prevX: 0,
      prevScrollLeft: 0,
      actualProject: this.projectSelected,
      competences_bachelor: [
        "Application development",
        "Optimizing IT applications",
        "Administer complex communicating IT systems",
        "Managing information data",
        "Project management",
        "Working in an IT team",
      ],
    };
  },

  emits: ["select"],

  mounted() {
    this.getComponentWidth();
    window.addEventListener("resize", this.getComponentWidth);
  },

  methods: {
    select(i: number) {
      const element = document.getElementById("listProject" + i);
      if (element && !this.isDragging) {
        document
          .getElementsByClassName("selected")[0]
          ?.classList.remove("selected");
        element.classList.add("selected");
        this.$emit("select", i);
        this.actualProject = i;
      }
    },

    getComponentWidth() {
      const element = this.$refs.componentRef as HTMLElement;
      if (!element) return;
      this.componentWidth = element.offsetWidth ? element.offsetWidth : 0;
    },

    slide(value: number, next: boolean) {
      const list = document.getElementsByClassName("list")[0] as HTMLElement;
      list.scrollLeft -= value;

      if (next) {
        if (this.actualProject + 1 < this.projects.length) {
          this.actualProject++;
          this.select(this.actualProject);
        }
      } else {
        if (this.actualProject - 1 >= 0) {
          this.actualProject--;
          this.select(this.actualProject);
        }
      }
    },

    dragging(e: MouseEvent | TouchEvent) {
      if (!this.isDragging) return;
      const list = document.getElementsByClassName("list")[0] as HTMLElement;
      e.preventDefault();
      let delta = 0;
      if (e instanceof MouseEvent) {
        delta = e.pageX - this.prevX;
      } else {
        delta = e.touches[0].pageX - this.prevX;
      }

      list.scrollLeft = this.prevScrollLeft - delta;
    },

    draggingStart(e: MouseEvent | TouchEvent) {
      this.isDragging = true;
      if (e instanceof MouseEvent) {
        this.prevX = e.pageX;
      } else {
        this.prevX = e.touches[0].pageX;
      }
      this.prevScrollLeft =
        document.getElementsByClassName("list")[0].scrollLeft;
    },

    draggingStop() {
      this.isDragging = false;
    },
  },
});
</script>

<style scoped lang="scss">
@use "../assets/variables" as v;

$contaier-color: #f6f6f6;

.controller {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.list {
  overflow: hidden;
  scroll-behavior: smooth;
}

.list-projects {
  padding: 16px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  transition: all 0.2s ease-in-out;

  div {
    background-color: $contaier-color;
    height: 200px;
    width: 400px;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    margin: 0 16px;
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    .title,
    .tag {
      background-color: rgba(0, 0, 0, 0.479);
      position: absolute;
      display: flex;
      width: 100%;
      height: 100%;
      text-align: center;
      padding: 4px;
      color: white;
      font-weight: 600;
      font-size: 1.5rem;
      justify-content: center;
      align-items: center;
      user-select: none;
      transition: 0.3s;
    }

    .title {
      opacity: 0;
    }

    .tag {
      opacity: 1;
    }

    &.selected {
      border: 4px solid v.$color-blue;
    }

    &:hover {
      transform: scale(1.05);

      .tag {
        opacity: 0;
      }

      .title {
        opacity: 1;
      }
    }
  }

  &.loading {
    div {
      animation: loading 1.5s infinite;
      user-select: none;
    }
  }
}

h1 {
  font-size: 2rem;
  font-weight: 600;
  margin: 0;
  padding: 0;

  &::after {
    content: "";
    display: block;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: -10px;
    width: 8px;
    border-radius: 3px;
    height: 50%;
    background-color: v.$color-blue;
    margin: 0;
    padding: 0;
  }
}

.btn {
  user-select: none;
  margin: 0 16px;
  display: flex;
  justify-content: center;
  align-items: center;
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
