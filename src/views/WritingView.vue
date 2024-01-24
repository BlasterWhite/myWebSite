<script setup lang="ts">
import data from "@/assets/projects.json";
import { computed, ref, watch } from "vue";
import ShowProject from "@/components/showProject.vue";
import projectModal from "@/components/writing/projectModal.vue";
import type { Project } from "@/types/project";

const projects = ref<Project[]>([
  {
    title: "My Project",
    tags: [],
    id: "-1",
    date: new Date().toLocaleDateString(),
    thumbnail: "",
    data: "",
    markdown:
      '# My Project\n## Description\n\n1. My list\n2. Thing\n3. Others\n\n```js\nconsole.log("Thing");\n```\n\n---',
    active: true,
  },
]);

projects.value[0] = data[0];

const playground = ref(projects.value[0].markdown);
const singleLineMarkdown = computed(() => {
  return playground.value.replace(/"/g, '\\"').replace(/\n/g, "\\n");
});

watch(playground, (newValue) => {
  projects.value[0].markdown = newValue;
});

const projectSelected = ref(0);

watch(projectSelected, (newValue) => {
  playground.value = data[newValue].markdown;
});

const openModal = ref(false);
</script>

<template>
  <div class="writing-project">
    <main>
      <div id="playground">
        <h1>Playground</h1>
        <div>
          <label for="projectSelected">Project template: </label>
          <select name="projectSelected" v-model="projectSelected">
            <option
              v-for="(project, index) in data"
              :key="index"
              :value="index"
            >
              {{ project.title }}
            </option>
          </select>
        </div>
        <p>Here is where you can write your code</p>
        <textarea v-model="playground"></textarea>
        <h3>Single line markdown</h3>
        <textarea
          id="singleLine"
          v-model="singleLineMarkdown"
          readonly
        ></textarea>
      </div>
      <p>→</p>
      <button @click="openModal = true">Save</button>
      <div id="preview">
        <h1>Preview</h1>
        <p>Here is where you can see your code</p>
        <div id="preview-content">
          <show-project
            :is-loading="false"
            :projects="projects"
            :project-selected="0"
          />
        </div>
      </div>
    </main>
    <project-modal
      v-if="openModal"
      :markdown="singleLineMarkdown"
      @close="openModal = false"
    />
  </div>
</template>

<style scoped lang="scss">
.writing-project {
  main {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 100vh;
    width: 100vw;
    color: #f9f9f9;

    & > p {
      position: absolute;
      user-select: none;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 999;
      font-size: 2rem;
      font-weight: bold;
    }

    button {
      position: absolute;
      top: 1rem;
      right: 1rem;
      z-index: 999;
      background-color: #f9f9f9;
      color: #2a2a2a;
      border: none;
      border-radius: 10px;
      padding: 0.5rem 1rem;
      font-size: 1.2rem;
      font-family: "JetBrains Mono", monospace;
      cursor: pointer;
      transition: all 0.2s ease-in-out;

      &:hover {
        background-color: #2a2a2a;
        color: #f9f9f9;
      }
    }

    #playground,
    #preview {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      padding: 0 0 1rem 0;
      width: 50%;
      height: 100%;
    }

    #playground {
      background-color: #2a2a2a;

      textarea {
        &:not(#singleLine) {
          height: 100%;
          padding: 1rem;
        }
        width: 100%;
        background-color: #2a2a2a;
        color: #f9f9f9;
        border: none;
        border-radius: 10px;
        font-size: 1.2rem;
        font-family: "JetBrains Mono", monospace;
        resize: none;

        &:focus {
          outline: none;
        }
      }

      select {
        background-color: #2a2a2a;
        color: #f9f9f9;
        border: 1px solid #f9f9f9;
        border-radius: 10px;
        font-size: 1.2rem;
        font-family: "JetBrains Mono", monospace;
        resize: none;
        text-align: center;

        &:focus {
          outline: none;
        }
      }
    }

    #preview {
      background-color: #1c1c1c;

      #preview-content {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
