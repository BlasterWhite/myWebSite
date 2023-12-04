<script lang="ts">
import { defineComponent } from "vue";
import type { Project } from "@/types/project";

export default defineComponent({
  name: "ListProjects",
  props: {
    projects: {
      type: Array as () => Project[],
      default: [],
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
        "Réaliser un développement d'application",
        "Optimiser des applications informatiques",
        "Admininistrer des systèmes informatiques communicants complexes",
        "Gérer des données de l'information",
        "Conduite de projet",
        "Travailler dans une équipe informatique",
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
      if (element && this.isDragging === false) {
        document
          .getElementsByClassName("selected")[0]
          ?.classList.remove("selected");
        element.classList.add("selected");
        this.$emit("select", i);
        console.log("EMIT ", i);
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

  computed: {
    isTooTight() {
      console.log(this.componentWidth, " < ", 400 * this.projects.length);
      console.log(this.projects.length);

      return this.componentWidth < 400 * this.projects.length;
    },
  },
});
</script>

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
        <p
          style="
            background-color: rgba(0, 0, 0, 0.479);
            width: 100%;
            height: 100%;
            text-align: center;
            padding: 4px;
            color: white;
            font-weight: 600;
            font-size: 1.5rem;
            display: flex;
            justify-content: center;
            align-items: center;
            user-select: none;
          "
        >
          {{ project.title }}
        </p>
      </div>
    </div>
  </div>
</template>

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

  .tag {
    position: absolute;
    top: 0;
    left: 0;
    background-color: v.$color-blue;
    color: white;
    padding: 4px 8px;
    border-radius: 0 0 8px 0;
    font-size: 1rem;
    font-weight: 600;
    user-select: none;
    z-index: 9;
  }

  div {
    background-color: $contaier-color;
    height: 200px;
    width: 400px;
    margin-bottom: 16px;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    margin: 0 16px;
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    &.selected {
      border: 4px solid v.$color-blue;
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
