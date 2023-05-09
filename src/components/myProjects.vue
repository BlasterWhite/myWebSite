<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "MyProjects",
});
</script>

<template>
  <div class="my-projects">
    <h1>My Projects</h1>
    <div class="project-list"></div>
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
}
</style>
