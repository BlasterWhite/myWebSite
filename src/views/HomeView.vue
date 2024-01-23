<script setup lang="ts">
import TimeLine from "@/components/timeLine.vue";
import MySkills from "@/components/mySkills.vue";
import MyProjects from "@/components/myProjects.vue";
import TopButton from "@/components/topButton.vue";
import MyFooter from "@/components/myFooter.vue";

type element = {
  title: string;
  description: string;
  date: string;
  icon: string;
};

const elements = [
  {
    title: "Bachelor",
    description: "I have a <span red>bachelor</span>",
    date: "test1",
    icon: "school",
  },
  {
    title: "Developer",
    description: "Developer at <span green>Cyber Imagination</span>",
    date: "test2",
    icon: "work",
  },
  {
    title: "High School",
    description: "I have a <span purple>High School Degree</span>",
    date: "test1",
    icon: "labs",
  },
] as element[];
</script>

<template>
  <div id="container">
    <div id="header">
      <div>
        <h1>Hello, I'm</h1>
        <h1 id="name">Matéo Guézennec</h1>
        <h3>I'm a <span class="text-red">FullStack Developer</span></h3>
        <div id="buttons">
          <a><button id="hire">Hire Me</button></a>
          <router-link to="/projects"
            ><button id="portfolio">Portfolio</button></router-link
          >
        </div>
      </div>
      <div id="HeaderImage">
        <img src="@/assets/photos/Combine.png" alt="HeaderImage" id="pp" />
        <img src="@/assets/blob.svg" alt="Backgrounds Image 2" blob2 />
      </div>
    </div>

    <top-button />

    <time-line :p-elements="elements" />

    <my-skills />

    <my-projects />

    <my-footer />
  </div>
</template>

<style scoped lang="scss">
div#container {
  justify-content: center;
  height: 100vh;
  width: 90%;
  max-width: 98vw;
  /* background-color: #ff0e0e69; */
  margin: 206px auto 0 auto;
}

h1,
h2,
h3,
h1 *,
h2 *,
h3 * {
  font-weight: 700;
}

h1 {
  font-size: 4.5rem;
}

h3 {
  font-size: 1.8rem;
}
.text-red {
  color: var(--color-red);
}

h1#name {
  background: linear-gradient(89.31deg, #00ff38 -1.64%, #00d1ff 100%);
  width: fit-content;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

div#header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  margin: 0 0 100px 0;
}

div#buttons {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  gap: 128px;

  * {
    margin: 12px 0;
  }
}
a {
  button {
    background: var(--gradient-red);
    border: none;
    min-width: fit-content;
    padding: 16px 24px;
    border-radius: 999px;
    color: white;
    font-size: 1.2rem;
    font-weight: 500;
    margin: 10px;
    cursor: pointer;
    transition: 0.3s;

    &:hover {
      transform: scale(1.1);
    }

    &#portfolio {
      padding: calc(16px - 3px) calc(24px - 3px);
      background: none;
      border: 3px solid var(--color-red);
      color: var(--color-red);
    }
  }
}

div#HeaderImage {
  min-width: 250px;
  min-height: 250px;
  max-width: 450px;
  max-height: 450px;
  margin: 0 164px;
  position: relative;
  top: -100px;

  img {
    width: 100%;
  }

  img#pp {
    z-index: 1;
    width: 150%;
  }

  img[blob2] {
    filter: invert(66%) sepia(88%) saturate(602%) hue-rotate(358deg)
      brightness(102%) contrast(104%);
    transform: rotate(-69.5deg);
    position: absolute;
    top: -24%;
    left: -80%;
    width: 300%;
    z-index: -2;
    animation: infinite 15s floating;
  }
}

/**********************
* Responsive
**********************/
/* Set backgrounds of the body to red when screen is smaller than 1300px */
@media screen and (max-width: 1300px) {
  div#header {
    flex-direction: column;
    align-items: center;
    margin-bottom: 300px;
  }

  div#HeaderImage {
    margin: 0;
    top: 30px;
    left: -90px;
  }

  div#container {
    margin: 0;
  }
}

/**********************
* Animations
**********************/
@keyframes floating {
  0% {
    transform: rotate(-69.5deg) translate(0, 0px);
  }
  50% {
    transform: rotate(-69.5deg) translate(0, 15px);
  }
  100% {
    transform: rotate(-69.5deg) translate(0, -0px);
  }
}

@keyframes slideDown {
  0% {
    transform: translateY(-100%);
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: translateY(0);
  }
}

@keyframes slideRight {
  0% {
    transform: translateX(-100%);
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: translateX(0);
  }
}

/* Apply animations to specific elements */
#header h1:nth-child(1) {
  animation: slideDown 1s ease-in-out forwards;
}

#name {
  animation: slideRight 1s ease-in-out forwards;
}
</style>
