<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ListProjects",
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
  data() {
    return {
      componentWidth: 0,
      slideValue: 0,
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
      if (element) {
        document
          .getElementsByClassName("selected")[0]
          ?.classList.remove("selected");
        element.classList.add("selected");
        this.$emit("select", i);
      }
    },

    getComponentWidth() {
      const element = this.$refs.componentRef as HTMLElement;
      this.componentWidth = element.offsetWidth ? element.offsetWidth : 0;
    },

    slide(value: number) {
      this.slideValue += value;
      if (this.slideValue > 0) this.slideValue = 0;
      if (this.slideValue < -400 * (this.projects.length - 1))
        this.slideValue = -400 * (this.projects.length - 1);
      const element = this.$refs.componentRef as HTMLElement;
      element.style.transform = `translateX(${this.slideValue}px)`;
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
  <div class="list">
    <div class="list-projects loading" v-if="isLoading" ref="componentRef">
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
    <div class="list-projects" v-else></div>
    <div class="next btn" @click="slide(-432)">
      <span class="material-symbols-outlined"> arrow_forward_ios</span>
    </div>
    <div class="prev btn" @click="slide(432)">
      <span class="material-symbols-outlined"> arrow_back_ios_new</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "../assets/variables" as v;

$contaier-color: #f6f6f6;

.list {
  overflow: hidden;
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
  position: absolute;
  top: 50%;
  user-select: none;
  transform: translateY(-50%);
  background-color: #0002;
  padding: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  height: 100%;

  &.next {
    right: 0px;
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 1) 100%
    );
  }

  &.prev {
    left: 0px;
    background: linear-gradient(
      270deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 1) 100%
    );
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
