<template>
  <div :class="'project-showcase ' + (isLoading ? 'loading' : '')">
    <div class="project-showcase-header">
      <div class="project-showcase-header-title">
        <h1 class="project-showcase-header-title-label">
          {{ projects[projectSelected].title }}
        </h1>
        <span class="project-showcase-header-title-date">{{
          projects[projectSelected].date
        }}</span>
        <span
          v-if="projects[projectSelected]?.ongoing"
          class="project-showcase-header-title-ongoing"
        >
          <span></span>
          Ongoing
        </span>
      </div>
      <div class="project-showcase-header-tags">
        <span
          v-for="tag in projects[projectSelected].tags"
          :key="tag"
          class="tag"
          :class="'tag-' + tag.toLowerCase()"
        >
          {{ tag }}
        </span>
      </div>
    </div>
    <div class="project-showcase-container" v-html="html"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { marked } from "marked";
import type { Project } from "@/types/project";

export default defineComponent({
  name: "ShowProject",
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
      default: 1,
    },
  },
  computed: {
    html() {
      return this.postHtml(
        this.projects[this.projectSelected].markdown
          ? marked.parse(this.projects[this.projectSelected].markdown)
          : "",
      );
    },
  },
  methods: {
    postHtml(text: string) {
      let newText = text;
      newText = newText.replace(
        /<a href="([^"]+)">([^<]+)<\/a>/g,
        '<a href="$1" target="_blank">$2</a>',
      );
      return newText;
    },
  },
});
</script>

<style lang="scss">
@use "../assets/variables" as v;

.project-showcase {
  height: 100%;
  min-height: 300px;
  background-color: v.$background-content;
  border-radius: v.$border-radius;
  color: v.$color-text;
  padding: 1rem;

  &-header {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 0.5rem;

    &-title {
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: flex-end;
      justify-content: flex-start;
      gap: 0.5rem;

      &-label {
        font-size: 2rem;
        font-weight: 600;
        line-height: 2.25rem;
        margin: 0;
      }

      & &-date {
        font-size: 1rem;
        color: #696969;
      }

      & &-ongoing {
        border: 2px red solid;
        padding: 2px 4px;
        font-size: 0.75rem;
        font-weight: 600;
        border-radius: 50px;

        & > span::before {
          content: "🔴";
          margin: 0;
          animation: blink 1s infinite;
        }
      }
    }

    &-tags {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      flex-wrap: wrap;
      gap: 0.5rem;

      .tag {
        font-size: 0.8rem;
        color: #fff;
        background: #00d1ff;
        background: linear-gradient(45deg, #0b4265 0%, #38b4ff 100%);
        border-radius: 5rem;
        text-transform: capitalize;
        padding: 0.25rem 0.5rem;
        font-weight: 600;

        &-html {
          background: #e34c26;
          background: linear-gradient(45deg, #e34c26 0%, #f16529 100%);
        }

        &-css,
        &-sass,
        &-scss {
          background: #264de4;
          background: linear-gradient(45deg, #264de4 0%, #4077f3 100%);
        }

        &-javascript {
          color: #000;
          background: #f0db4f;
          background: linear-gradient(45deg, #f0db4f 0%, #f5d33f 100%);
        }

        &-vuejs {
          background: #348f2c;
          background: linear-gradient(45deg, #348f2c 0%, #52bd46 100%);
        }

        &-nodejs {
          background: #68a063;
          background: linear-gradient(45deg, #68a063 0%, #89da82 100%);
        }

        &-arduino {
          background: #00979d;
          background: linear-gradient(45deg, #00979d 0%, #00d1da 100%);
        }

        &-python {
          background: #306998;
          background: linear-gradient(45deg, #306998 0%, #4ea9f5 100%);
        }

        &-network,
        &-git {
          background: #d32f2f;
          background: linear-gradient(45deg, #d32f2f 0%, #ff8282 100%);
        }

        &-sql {
          background: #f29111;
          background: linear-gradient(45deg, #f29111 0%, #fcb670 100%);
        }

        &-typescript {
          background: #007acc;
          background: linear-gradient(45deg, #007acc 0%, #48b5ff 100%);
        }

        &-c {
          background: #a8b9cc;
        }

        &-php,
        &-docker {
          background: #4f5b93;
          background: linear-gradient(45deg, #4f5b93 0%, #7d8fe0 100%);
        }

        &-bash {
          background: #4eaa25;
          background: linear-gradient(45deg, #4eaa25 0%, #70f138 100%);
        }
      }
    }
  }

  &-container {
    padding: 2rem;

    h1 {
      font-size: 2rem;
      margin-bottom: 1rem;
      display: flex;
      flex-direction: row;
      align-items: center;

      &::before {
        content: "";
        width: 8px;
        height: 1.5rem;
        margin: 0.5rem 0.5rem 0.5rem 0;
        background: #ec3b3b;
        border-radius: 5px;
      }
    }

    h2 {
      font-size: 1.25rem;
      margin-bottom: 1rem;
      display: flex;
      flex-direction: row;
      align-items: center;

      &::before {
        content: "";
        width: 8px;
        height: 0.7rem;
        margin: 0.25rem 0.5rem 0.25rem 0;
        background: #3ba8ec;
        border-radius: 5px;
      }
    }

    a {
      color: #fff;
      background: #3ba8ec;
      padding: 0.5rem 1rem;
      border-radius: 5px;
      margin: 8px 0;
      text-decoration: none;
      font-weight: 600;
    }

    pre {
      background: #1e1e1e;
      color: #f9f9f9;
      padding: 1rem;
      border-radius: 5px;
      overflow-x: auto;
    }

    img {
      width: 100%;
      height: auto;
      max-width: 1000px;
      border-radius: 10px;
      margin-bottom: 16px;
    }

    p {
      margin: 8px;
    }

    hr {
      margin: 16px 16px;
      color: rgba(0, 0, 0, 0.2);
      border: 0.5px solid rgba(0, 0, 0, 0.2);
      border-radius: 8px;
    }
  }

  /**
     All Tags
     html, css, js, vue, nodejs, arduino, python, network, sql, ts, c, php, bash, docker
   */
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

@keyframes blink {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
