<script lang="ts">
import { defineComponent } from "vue";
import ListProjects from "@/components/listProjects.vue";
import ShowProject from "@/components/showProject.vue";
import type { Project } from "@/types/project";

import projectsData from "@/assets/projects.json";

export default defineComponent({
  name: "MyProjects",
  data() {
    return {
      isLoading: false,
      projects: projectsData as Project[],
      projectSelected: 0,
    };
  },

  methods: {
    selectProject(i: number) {
      console.log("Project " + i + " selected");
      this.projectSelected = i;
    },
  },

  components: {
    ListProjects,
    ShowProject,
  },

  mounted() {
    console.log("MyProjects mounted");
    this.projects = [];
    projectsData.forEach((project) => {
      if (project.active) this.projects.push(project);
    });
  },
});
</script>

<template>
  <div class="my-projects">
    <h1>
      My Projects<span
        class="sub"
        v-html="'(' + projects.length + ' projects)'"
      ></span>
    </h1>
    <ListProjects
      :isLoading="isLoading"
      :projects="projects"
      @select="selectProject"
    />
    <show-project
      :isLoading="isLoading"
      :projects="projects"
      :projectSelected="projectSelected"
    />
  </div>
</template>

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
