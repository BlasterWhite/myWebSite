<script lang="ts">
import { defineComponent } from "vue";

interface Product {
  title: string;
  date: string;
  thumbnail: string;
  data: string;
}

export default defineComponent({
  name: "ShowProject",
  props: {
    projects: {
      type: Array as () => Product[],
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
  <div
    :class="'project-showcase ' + (isLoading ? 'loading' : '')"
    v-html="projects[projectSelected].data"
  ></div>
</template>

<style lang="scss">
@use "../assets/variables" as v;

$contaier-color: #f6f6f6;

.project-showcase {
  width: calc(100% - 32px);
  margin-left: 32px;
  height: 100%;
  min-height: 300px;
  background-color: $contaier-color;
  border-radius: 10px;
  padding: 32px;

  &.loading {
    animation: loading 1.5s infinite;
    user-select: none;
  }

  img {
    max-width: 1000px;
    height: auto;
    border-radius: 10px;
    margin-bottom: 16px;
  }

  p {
    margin-bottom: 16px;
  }

  div.categories {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    margin-bottom: 16px;

    &::before {
      content: "Categories: ";
      font-weight: 600;
      margin-right: 8px;
    }

    span {
      background: rgb(24, 24, 90);
      color: white;
      padding: 4px 8px;
      border-radius: 4px;
      margin-right: 8px;
      font-weight: 600;

      &.html {
        background: rgb(255, 99, 71);
      }

      &.css {
        background: rgb(0, 191, 255);
      }

      &.js {
        background: rgb(255, 215, 0);
        color: #000;
      }

      &.vue,
      &.nodejs {
        background: rgb(0, 128, 0);
      }

      &.arduino {
        background: rgb(0, 129, 132);
      }

      &.python {
        background: rgb(0, 0, 255);
      }

      &.sql {
        background: rgb(255, 0, 255);
      }
    }
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
