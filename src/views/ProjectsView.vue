<template>
  <div class="my-projects">
    <a href="/">← Back to home</a>
    <h1>Explore My Projects</h1>
    <div id="container">
      <div id="search">
        <input
          type="search"
          placeholder="team work, javascript, elasticseach, ..."
          v-model="search"
        />
      </div>
      <div id="projects">
        <project-preview
          v-for="(project, index) in projects"
          :key="index"
          :model-value="project"
          @click="openFullscreen(project)"
        />
      </div>
      <div v-if="noResults" id="noResult">
        <h2>No Results 🤨</h2>
        <h4>
          You can try to search something else, maybe my search system is bad 😕
        </h4>
        <button @click="search = ''">Reset Search</button>
      </div>
    </div>
    <project-fullscreen
      v-if="fullscreen"
      @close="fullscreen = false"
      :model-value="projectInFullscreen"
    />
  </div>
</template>

<script setup lang="ts">
import ProjectPreview from "@/components/projects/projectPreview.vue";
import data from "@/assets/projects.json";
import { computed, ref, watch } from "vue";
import type { Project } from "@/types/project";
import ProjectFullscreen from "@/components/projects/projectFullscreen.vue";

const projects = ref(
  data.map((project) => Object.assign({ inSearch: true }, project)),
);
const search = ref("");

const noResults = computed(() =>
  projects.value.every((project: { inSearch: boolean }) => !project.inSearch),
);
watch(search, (value) => {
  projects.value = data.map((project) =>
    Object.assign(
      { inSearch: isProjectSearch(project, value.trim()) },
      project,
    ),
  );
});

function isProjectSearch(project: Project, search: string): boolean {
  if (project.title.toLowerCase().includes(search.toLowerCase())) return true;
  return project.tags.some((tag: string) =>
    tag.toLowerCase().includes(search.toLowerCase()),
  );
}

const fullscreen = ref(false);
const projectInFullscreen = ref<Project>(projects.value[0] ?? null);
function openFullscreen(project: Project) {
  projectInFullscreen.value = project;
  fullscreen.value = true;
}
</script>

<style scoped lang="scss">
.my-projects {
  padding: 16px 120px;

  h1 {
    font-size: 3rem;
    font-weight: 600;
    margin: 0;
  }

  a {
    font-size: 1.5rem;
    font-weight: 600;
    margin: 0;
    color: #000;
    text-decoration: none;

    &::before {
      content: " ";
      position: absolute;
      width: 0;
      height: 4px;
      bottom: -5px;
      background: #42108f;
      transition: width 0.3s ease-in-out;
    }

    &:hover::before {
      width: 100%;
      transition: width 0.3s ease-in-out;
    }
  }

  #container {
    display: flex;
    gap: 64px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 32px;

    #search {
      width: 80%;
      display: flex;
      gap: 10px;

      input[type="search"] {
        margin: 0 auto;
        flex-grow: 1;
        padding: 8px 16px;
        border-radius: 8px;
        font-size: 1.2rem;
        border: 1px solid #ccc;
      }

      button {
        margin: 0 auto;
        background: #66a633;
        color: white;
        border: none;
        padding: 8px 16px;
        border-radius: 8px;
        font-size: 1.2rem;
        transition: 0.3s ease-in-out;

        &:hover {
          cursor: pointer;
          background: #4d8f1a;
        }
      }
    }

    #projects {
      display: flex;
      flex-wrap: wrap;
      gap: 32px;
      justify-content: center;
      align-items: center;
      margin-top: 32px;
      user-select: none;
    }

    #noResult {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 16px;

      h2 {
        font-size: 2rem;
        font-weight: 600;
        margin: 0;
      }

      h4 {
        font-size: 1.2rem;
        font-weight: 400;
        margin: 0;
      }

      button {
        margin: 0 auto;
        background: #1a1a4d;
        color: white;
        padding: 8px 16px;
        border-radius: 8px;
        font-size: 1.2rem;
        transition: 0.3s ease-in-out;
        border: 2px solid #1a1a4d;

        &:hover {
          cursor: pointer;
          background: none;
          color: #1a1a4d;
        }
      }
    }
  }
}

@media screen and (max-width: 900px) {
  .my-projects {
    padding: 16px 0;
    a {
      font-size: 1rem;
      margin: 0 8px;
    }
    h1 {
      font-size: 1.2rem;
      text-align: center;
    }

    #container {
      margin: 8px;
      gap: 24px;

      #search {
        width: 100%;

        input[type="search"] {
          width: 100%;
          font-size: 1rem;
        }

        button {
          display: none;
        }
      }

      #projects {
        margin: 0;
        gap: 8px;
      }

      #noResult {
        text-align: center;
        h2 {
          font-size: 1.5rem;
        }
        h4 {
          font-size: 1rem;
        }
        button {
          font-size: 1rem;
        }
      }
    }
  }
}
</style>
