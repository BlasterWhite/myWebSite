<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "MySkills",
});
</script>

<template>
  <div class="my-skills">
    <h1>My Skills</h1>
    <div class="skill-list">
      <div class="softskill">
        <h2>soft Skills</h2>
        <ul>
          <li>Curiosity</li>
          <li>Communication</li>
          <li>Creativity</li>
          <li>Teamwork</li>
          <li>Openness to criticism</li>
          <li>Problem solving</li>
        </ul>
      </div>
      <div class="hardskill">
        <h2>hard Skills</h2>
        <ul>
          <li>Web Development</li>
          <li>VueJS, Scss, Javascript</li>
          <li>Database</li>
          <li>MySQL, MongoDB, PostgresSQL</li>
          <li>Software development</li>
          <li>Java, C, C#, C++, Python</li>
        </ul>
      </div>
      <div class="languages">
        <h2>Languages</h2>
        <ul>
          <li>🇫🇷 French (Native)</li>
          <li>🇬🇧 English (Fluent)</li>
          <li>🇪🇸 Spanish (Beginner)</li>
          <li>🇨🇳 Chinese (Beginner)</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "../assets/variables" as v;

$contaier-color: #f6f6f6;

.my-skills {
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
    background-color: v.$color-orange;
    margin: 0;
    padding: 0;
  }
}

.skill-list {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  margin: 0 0 100px 0;

  @media (max-width: 1100px) {
    flex-direction: column;
    align-items: center;
  }

  & > div {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    width: 30%;
    height: 100%;
    margin: 0;
    padding: 0;
    border-radius: 8px;
    background-color: $contaier-color;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.12);
    padding: 16px;

    @media (max-width: 1100px) {
      width: 100%;
      margin: 0 0 16px 0;
    }

    h2 {
      font-size: 1.5rem;
      font-weight: 600;
      width: 100%;
      margin: 0;
      padding: 0;
      text-align: center;
      text-transform: capitalize;
    }

    ul {
      list-style: "- ";
      margin: 0;
      padding: 0;
      margin: 16px 0 0 8px;

      li {
        margin: 0;
        padding: 0;
        font-size: 1.2rem;
        font-weight: 300;
        margin-bottom: 4px;
      }
    }
  }

  .hardskill {
    ul {
      li {
        &:nth-child(even) {
          font-size: 1rem;
          margin-left: 12px;
          margin-top: -4px;
        }
      }
    }
  }
}
</style>
