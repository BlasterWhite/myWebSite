<script lang="ts">
import { defineComponent } from "vue";

type element = {
  title: string;
  description: string;
  date: string;
  icon: string;
};

export default defineComponent({
  name: "TimeLine",
  props: {
    pElements: {
      type: Array as () => element[],
      default: [] as element[],
    },
  },

  computed: {
    elements() {
      return this?.pElements || [];
    },
    nbElements() {
      return this.elements.length;
    },
  },
});
</script>

<template>
  <div class="timeline">
    <div v-for="elem in elements" :key="elem.title" :class="'container'">
      <h1>
        <span class="material-symbols-outlined"> {{ elem.icon }} </span>
        {{ elem.title }}
      </h1>
      <p v-html="elem.description"></p>
    </div>
  </div>
</template>

<style lang="scss">
@use "../assets/variables" as v;

$contaier-color: #f6f6f6;
$text-color: #000000;

.timeline {
  color: #ffffff;
  border-radius: 8px;
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  align-items: self-start;
  width: 1100px;

  div.container {
    z-index: 1;
    padding: 8px;
    margin: 0 8px;
    height: 100px;
    width: 500px;
    text-align: center;
    border-radius: 8px;
    background: $contaier-color;
    color: $text-color;
    filter: drop-shadow(4px 8px 8px rgba(0, 0, 0, 0.12));

    @media (max-width: 1100px) {
      width: 100%;
    }

    &:not(:first-child) {
      margin-top: -32px;

      @media (max-width: 1100px) {
        margin-top: 8px;
      }
    }

    &:nth-child(even) {
      align-self: flex-end;

      @media (max-width: 1100px) {
        align-self: flex-start;
        &::before {
          display: none;
        }
      }

      &::before {
        border-radius: 8px 0 0 8px;
        content: "";
        z-index: -1;
        position: absolute;
        top: 50%;
        transform: translateY(-50%) translateZ(-1px);
        left: -50px;
        width: 50px;
        height: 20px;
        background: $contaier-color;
      }
    }

    &:nth-child(odd) {
      align-self: flex-start;

      @media (max-width: 1100px) {
        &::before {
          display: none;
        }
      }

      &::before {
        border-radius: 0 8px 8px 0;
        content: "";
        z-index: -1;
        position: absolute;
        top: 50%;
        transform: translateY(-50%) translateZ(-1px);
        right: -50px;
        width: 50px;
        height: 20px;
        background: $contaier-color;
      }
    }

    &:first-child {
      z-index: 10;

      &::after {
        border-radius: 8px;
        content: "";
        position: absolute;
        top: 50%;
        transform: translate(-50%, 1px, -50%);
        right: -50px;
        width: 20px;
        height: calc(
          calc(calc(50% + 16px) + 7px) * calc(v-bind(nbElements) - 1)
        );
        background: $contaier-color;
      }

      @media (max-width: 1100px) {
        &::after {
          display: none;
        }
      }
    }

    h1 {
      font-size: 28px;
      font-weight: 600;
      margin: 0;
      line-height: 32px;
      height: 32px;

      span.material-symbols-outlined {
        font-size: 32px;
        margin-right: 8px;
      }
    }

    p {
      font-size: 18px;
      font-weight: 400;
      margin: 8px 0 0 0;
      line-height: 24px;
      height: 24px;

      & span {
        &[red] {
          color: v.$color-red;
        }

        &[blue] {
          color: v.$color-blue;
        }

        &[green] {
          color: v.$color-green;
        }

        &[yellow] {
          color: v.$color-yellow;
        }

        &[orange] {
          color: v.$color-orange;
        }

        &[purple] {
          color: v.$color-purple;
        }
      }
    }
  }

  @media (max-width: 1100px) {
    width: 100%;
    margin-top: 0;
  }
}
</style>
