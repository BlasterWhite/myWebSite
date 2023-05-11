<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "MyFooter",
});
</script>

<template>
  <div class="my-footer">
    <div class="content">
      <div class="me">
        <img src="@/assets/icon.svg" alt="Backgrounds Image 2" blob2 />
        <div>
          <h1>Matéo Guézennec</h1>
          <h3>FullStack Developer</h3>
        </div>
      </div>
      <div class="links">
        <h3>Links</h3>
        <div class="links-content">
          <a href="#"
            ><img src="@/assets/icons8-github.svg" alt="" /> GitHub
          </a>
          <a href="#"
            ><img src="@/assets/icons8-linkedin.svg" alt="" /> LinkedIn
          </a>
          <a href="#"
            ><img src="@/assets/icons8-stack-overflow.svg" alt="" /> Stack
            Overflow
          </a>
        </div>
      </div>
      <div class="contact">
        <h3>Contact</h3>
        <div class="contact-content">
          <p>
            <a href="mailto:#"
              ><span class="material-symbols-outlined"> mail </span> Email
              mat.guezen@gmail.com
            </a>
          </p>
          <p>
            <a href="tel:#"
              ><span class="material-symbols-outlined"> call </span> Phone +33 6
              49 22 47 25
            </a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "../assets/variables" as v;

.my-footer {
  background-color: v.$footer-background;
  color: v.$footer-text;
  height: 300px;
  width: 100%;

  @media screen and (max-width: 950px) {
    height: 650px;
  }

  &::before {
    content: "";
    position: absolute;
    left: -45%;
    width: 100%;
    height: 300px;
    background-color: v.$footer-background;

    @media screen and (max-width: 950px) {
      height: 650px;
    }
  }

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 45%;
    width: 100%;
    height: 300px;
    z-index: -1;
    background-color: v.$footer-background;

    @media screen and (max-width: 950px) {
      height: 650px;
    }
  }

  .content {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    margin: 0 auto;

    @media screen and (max-width: 950px) {
      flex-direction: column;
    }

    & > div {
      @media screen and (max-width: 950px) {
        margin: 20px 0;
      }
    }

    .me {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      text-align: center;

      h1 {
        font-size: 2.5rem;
        margin: 0;
      }

      h3 {
        font-size: 1.5rem;
        margin: 0;
      }

      img {
        width: 110px;
        margin-right: 20px;
      }
    }

    .links {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      margin-left: 100px;

      h3 {
        font-size: 1.5rem;
        margin: 0;
      }

      .links-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        margin-top: 20px;

        a {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          text-align: center;
          margin: 10px 0;
          color: v.$footer-text;
          text-decoration: none;

          img {
            margin-right: 10px;
            filter: invert(100%) sepia(100%) saturate(13%) hue-rotate(138deg)
              brightness(104%) contrast(101%);
          }
        }
      }
    }

    .contact {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      margin-left: 100px;

      h3 {
        font-size: 1.5rem;
        margin: 0;
      }

      .contact-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        margin-top: 20px;

        p {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          text-align: center;
          margin: 10px 0;
          color: v.$footer-text;
          text-decoration: none;

          a {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            text-align: center;
            margin: 10px 0;
            color: v.$footer-text;
            text-decoration: none;

            img {
              margin-right: 10px;
              filter: invert(100%) sepia(100%) saturate(13%) hue-rotate(138deg)
                brightness(104%) contrast(101%);
            }
          }
        }
      }
    }
  }
}
</style>
