<script setup lang="ts"></script>

<template>
  <div id="container">
    <div id="header">
      <div>
        <h1>Hello, I'm</h1>
        <h1 id="name">Matéo Guézennec</h1>
        <h3>I'm a <span class="text-red">FullStack Developer</span></h3>
        <div id="buttons">
          <button id="hire">Hire Me</button>
          <button id="portfolio">Portfolio</button>
        </div>
      </div>
      <div id="HeaderImage">
        <img src="@/assets/photos/Combine.png" alt="HeaderImage" id="pp" />
        <img src="@/assets/blob.svg" alt="Backgrounds Image 2" blob2 />
      </div>
    </div>
  </div>
</template>

<style scoped>
div#container {
  justify-content: center;
  height: 100vh;
  width: 90%;
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
  justify-content: space-between;
  align-items: flex-start;
}

div#buttons {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
}

div#buttons * {
  margin: 12px 64px;
}

button {
  border: 4px solid #fff0;
  background: var(--gradient-red);
  border: none;
  min-width: fit-content;
  font-size: 20px;
  padding: 16px 24px;
  border-radius: 999px;
  color: white;
  font-size: 1.2rem;
  font-weight: 500;
  margin: 10px;
  cursor: pointer;
  transition: 0.3s;
}

button:hover {
  transform: scale(1.1);
}

button#portfolio {
  padding: calc(16px - 3px) calc(24px - 3px);
  background: none;
  border: 3px solid var(--color-red);
  color: var(--color-red);
}

div#HeaderImage {
  min-width: 250px;
  min-height: 250px;
  max-width: 450px;
  max-height: 450px;
  margin: 0 164px;
  position: relative;
  top: -100px;
}

div#HeaderImage img {
  width: 100%;
}

div#HeaderImage img#pp {
  z-index: 1;
  width: 150%;
}

div#HeaderImage img[blob2] {
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
</style>
