<script setup lang="ts">
import { ref } from "vue";

const props = defineProps({
  markdown: {
    type: String,
  },
});

const emit = defineEmits({
  close: () => true,
});

const projectTitle = ref("");
const projectThumbnail = ref("");
const projectDate = ref("");
const projectTags = ref("");
const projectMarkdown = ref(props.markdown || "");
</script>

<template>
  <div class="project-modal">
    <div class="project-modal-content">
      <button @click="emit('close')">Close</button>
      <h1>Project Modal</h1>
      <form>
        <div>
          <label for="projectTitle">Project title: </label>
          <input
            type="text"
            name="projectTitle"
            placeholder="My Project"
            v-model="projectTitle"
          />
        </div>
        <div>
          <label for="projectThumbnail">Project thumbnail: </label>
          <input
            type="text"
            name="projectThumbnail"
            placeholder="img.jpg"
            v-model="projectThumbnail"
          />
        </div>
        <div>
          <label for="projectDate">Project Date: </label>
          <input
            type="text"
            name="projectDate"
            placeholder="2023"
            v-model="projectDate"
          />
        </div>
        <div>
          <label for="projectTags">Project tags: </label>
          <input
            type="text"
            name="projectTags"
            placeholder="html, css, thing"
            v-model="projectTags"
          />
        </div>
      </form>
      <div id="json">
        <h3>JSON</h3>
        <pre>
{
    "title": "{{ projectTitle }}",
    "tags": [{{
            projectTags
              .split(", ")
              .map((tag) => `"${tag}"`)
              .join(", ")
          }}],
    "date": "{{ projectDate }}",
    "thumbnail": "{{ projectThumbnail }}",
    "data": "",
    "markdown": `{{ projectMarkdown }}`,
    "active": true
}
      </pre
        >
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.project-modal {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  width: 100%;
  height: 100%;
  padding: 5rem;
  background-color: rgba(0, 0, 0, 0.75);
  overflow: scroll;

  .project-modal-content {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 2rem;
    width: 100%;
    height: 100%;
    background-color: #f9f9f9;
    border-radius: 0.5rem;
    box-shadow: 0 0 1rem rgba(0, 0, 0, 0.8);

    h1 {
      margin-bottom: 2rem;
    }

    form {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100%;

      div {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: flex-start;
        width: 100%;
        gap: 1rem;
      }

      label {
        margin-bottom: 0.5rem;
      }

      input {
        margin-bottom: 1rem;
        padding: 0.5rem;
        width: 50%;
        border: 1px solid #000;
        border-radius: 0.25rem;
      }

      textarea {
        margin-bottom: 1rem;
        padding: 0.5rem;
        width: 100%;
        height: 10rem;
        border: 1px solid #000;
        border-radius: 0.25rem;
      }
    }

    #json {
      margin-top: 2rem;
      width: 100%;
      height: 100%;
      overflow: auto;

      pre {
        width: 100%;
        height: 100%;
        overflow: auto;
      }
    }

    button {
      position: absolute;
      top: 1rem;
      right: 1rem;
      padding: 0.5rem;
      border: 1px solid #000;
      border-radius: 0.25rem;
    }
  }
}
</style>
