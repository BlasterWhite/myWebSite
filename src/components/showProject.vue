<script lang="ts">
import { defineComponent } from "vue";
import { marked } from "marked";

interface Product {
  title: string;
  date: string;
  thumbnail: string;
  data: string;
  markdown: string;
}

const tags = [
  {
    key: "SKILL_TEAM_WORK",
    value: '<span class="ts">Team Work</span>',
  },
  {
    key: "SKILL_HTML",
    value: '<span class="html">HTML</span>',
  },
  {
    key: "SKILL_JS",
    value: '<span class="js">JavaScript</span>',
  },
  {
    key: "SKILL_CSS",
    value: '<span class="css">CSS</span>',
  },
  {
    key: "SKILL_VUEJS",
    value: '<span class="vue">VueJS</span>',
  },
  {
    key: "SKILL_SASS",
    value: '<span class="css">Sass</span>',
  },
  {
    key: "SKILL_SQL",
    value: '<span class="sql">SQL</span>',
  },
  {
    key: "SKILL_ARDUINO",
    value: '<span class="arduino">Arduino</span>',
  },
  {
    key: "SKILL_PYTHON",
    value: '<span class="python">Python</span>',
  },
  {
    key: "SKILL_NODEJS",
    value: '<span class="nodejs">NodeJS</span>',
  },
  {
    key: "SKILL_TS",
    value: '<span class="ts">TypeScript</span>',
  },
  {
    key: "SKILL_NETWORK",
    value: '<span class="network">Network</span>',
  },
  {
    key: "SKILL_C",
    value: '<span class="c">C language</span>',
  },
  {
    key: "SKILL_PHP",
    value: '<span class="php">PHP</span>',
  },
];

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
  methods: {
    setTags(text: string) {
      let newText = text;
      tags.forEach((tag) => {
        newText = newText.replace(tag.key, tag.value);
      });
      return newText;
    },
  },
  computed: {
    html() {
      return this.setTags(
        this.projects[this.projectSelected].markdown
          ? marked.parse(this.projects[this.projectSelected].markdown)
          : "",
      );
    },
  },
});
</script>

<template>
  <div
    :class="'project-showcase ' + (isLoading ? 'loading' : '')"
    v-html="html"
  ></div>
</template>

<style lang="scss">
@use "../assets/variables" as v;

$contaier-color: #f6f6f6;

.project-showcase {
  width: calc(100% - calc(32px * 2));
  margin-left: 32px;
  height: 100%;
  min-height: 300px;
  background-color: $contaier-color;
  border-radius: 10px;
  padding: 32px;
  text-align: left;
  color: #1a1a1a;

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
    font-size: 1.2rem;
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
    border-radius: 5px;
  }

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

  hr {
    margin: 16px 16px;
    color: rgba(0, 0, 0, 0.2);
    border: 0.5px solid rgba(0, 0, 0, 0.2);
    border-radius: 8px;
  }

  span {
    background: rgb(24, 24, 90);
    color: white;
    padding: 4px 8px;
    border-radius: 4px;
    margin-right: 8px;
    font-weight: 600;

    & > img {
      width: 10px;
      height: 10px;
      color: red;
      top: 50%;
      transform: translateY(50%);
    }

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

    &.python,
    &.network {
      background: rgb(0, 0, 255);
    }

    &.sql {
      background: rgb(255, 0, 255);
    }

    &.ts {
      background: rgb(0, 122, 204);
    }

    &.c,
    &.php {
      background: rgb(36, 110, 150);
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
