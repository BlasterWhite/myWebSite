<template>
  <div class="timeline">
    <div v-for="elem in elements" :key="elem.title" :class="'container'">
      <div class="row">
        <span class="material-symbols-outlined"> {{ elem.icon }} </span>
        <span class="title">{{ elem.title }}</span>
        <span v-if="elem.date?.start" class="dates">
          {{ dayjs(elem.date.start).format("MMM YYYY") }} -
          {{ elem.date.end ? dayjs(elem.date.end).format("MMM YYYY") : "Now" }}
        </span>
      </div>
      <p v-html="elem.description"></p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import dayjs from "dayjs";

type element = {
  title: string;
  description: string;
  date: {
    start: Date;
    end?: Date;
  };
  icon: string;
};

export default defineComponent({
  name: "TimeLine",
  props: {
    pElements: {
      type: Array as () => element[],
      default: [] as element[],
    },
    pInverse: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    dayjs() {
      return dayjs;
    },
    elements() {
      return (
        this.pElements
          .map((e) => e) // Hack to copy the array and not modify the props
          .sort((a, b) => {
            if (this.pInverse) {
              return a.date.start.getTime() - b.date.start.getTime();
            }
            return b.date.start.getTime() - a.date.start.getTime();
          }) || []
      );
    },
    nbElements() {
      return this.elements.length;
    },
  },
});
</script>

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
    min-height: 100px;
    width: 500px;
    text-align: center;
    border-radius: 8px;
    background: $contaier-color;
    color: $text-color;
    filter: drop-shadow(4px 8px 8px rgba(0, 0, 0, 0.12));

    @media (max-width: 1100px) {
      width: 100%;
      height: auto;
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

    div.row {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      gap: 8px;
      margin: 8px 0;

      span {
        font-size: 24px;
        font-weight: 500;
      }

      span.title {
        font-size: 24px;
        font-weight: 500;
      }

      span.dates {
        font-size: 14px;
        font-weight: 400;
        opacity: 0.5;
      }

      @media (max-width: 1100px) {
        flex-direction: column;
        gap: 4px;

        span.material-symbols-outlined {
          display: none;
        }
      }
    }

    p {
      font-size: 18px;
      font-weight: 400;
      margin: 8px 0 0 0;
      line-height: 24px;

      & span {
        &::after {
          content: "";
          display: inline-block;
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          background: red;
          height: 2px;
          transition: 0.3s;
          z-index: -1;
        }

        &:hover::after {
          height: 100%;
        }

        &[red]::after {
          background: v.$color-red;
        }

        &[blue]::after {
          background: v.$color-blue;
        }

        &[green]::after {
          background: v.$color-green;
        }

        &[yellow]::after {
          background: v.$color-yellow;
        }

        &[orange]::after {
          background: v.$color-orange;
        }

        &[purple]::after {
          background: v.$color-purple;
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
