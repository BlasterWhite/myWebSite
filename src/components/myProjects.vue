<template>
  <div class="my-projects">
    <h1>My Key Projects</h1>
    <p v-for="project in projects" :key="project.id"></p>
    <ListProjects
      :is-loading="isLoading"
      :projects="projects"
      @select="selectProject"
    />
    <show-project
      :is-loading="isLoading"
      :projects="projects"
      :project-selected="projectSelected"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ListProjects from "@/components/listProjects.vue";
import ShowProject from "@/components/showProject.vue";
import type { Project } from "@/types/project";

import projectsData from "@/assets/projects.json";

export default defineComponent({
  name: "MyProjects",

  components: {
    ListProjects,
    ShowProject,
  },
  data() {
    return {
      isLoading: false,
      projectsRaw: projectsData as Project[],
      projectSelected: 0,
      starProject: ["2", "3", "1", "1", "1", "10"],
    };
  },

  computed: {
    projects() {
      const projects = [] as Project[];

      // Filter projects by starProject
      this.starProject.forEach((id) => {
        const project = this.projectsRaw.find((p) => p.id === id);
        if (project) projects.push(project);
      });

      // Sort by StarProject
      projects.sort((a, b) => {
        return this.starProject.indexOf(a.id) - this.starProject.indexOf(b.id);
      });

      return projects;
    },
  },

  methods: {
    selectProject(i: number) {
      this.projectSelected = i;
    },
  },
});
</script>

<style scoped lang="scss">
@use "../assets/variables" as v;

$contaier-color: #f6f6f6;

.my-projects {
  padding: 16px;
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

  span.sub {
    font-size: 1rem;
    font-weight: 400;
    margin-left: 8px;
    color: rgba(0, 0, 0, 0.322);
  }
}
</style>
