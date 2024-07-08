<template>
  <q-page class="flex flex-center mainPage">
    <div class="box">
      <h1 class="title">Construyendo Futuros En El Oriente Venezolano</h1>
      <p>“Juntos cambiamos vidas para construir futuros”</p>
      <div class="svgIm">
        <img src="/group.svg" alt="SVG" class="svgLanding" />
        <div class="dots"></div>
      </div>
      <div class="contain">
        <button class="registro" @click="toRegister">Regístrate Gratis!</button>
        <div class="separadores">
          <div class="linea"></div>
          <p class="separador">O</p>
          <div class="linea"></div>
        </div>
        <button class="sesion" @click="toLogin">Inicia Sesión</button>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();

defineOptions({
  name: "IndexPage",
});

const toLogin = () => router.push({ name: "Login" });
const toRegister = () => router.push({ name: "Register" });
</script>

<style scoped>
* {
  scrollbar-width: none;
}

.mainPage {
  background: rgb(91, 123, 212);
  /* background: linear-gradient(34deg, rgb(88, 199, 112) 0%, rgba(215,123,28,1) 85%); */
  position: absolute;
  top: 0;
  left: 0;
  min-height: 100%;
  height: 100vh;
  width: 100vw;
  padding-top: 50px;
}

.box {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: scroll;
}

.title {
  margin-left: 30px;
  color: whitesmoke;
  font-family: "Zeyada", cursive;
  font-size: max(5vw, 55px);
  letter-spacing: 1px;
}

.svgIm {
  position: absolute;
  bottom: -50px;
  right: 10px;
  width: 50vw;
  height: 36vw;
  min-width: 500px;
  min-height: 330px;
  margin-bottom: 50px;
}

.svgLanding {
  height: 90%;
}

p {
  margin-top: 30px;
  font-size: max(2.5vw, 27px);
  margin-left: 60px;
  max-width: 50vw;
  letter-spacing: 2px;
  color: whitesmoke;
  line-height: 60px;
  font-family: "Lobster", cursive;
}

.contain {
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 50vw;
  margin-bottom: 2vh;
  margin-top: 6vh;
}

.contain button:hover {
  cursor: pointer;
}
.separadores {
  display: flex;
}

.separador {
  margin-top: 0;
  margin-left: 0;
}

.linea {
  margin: auto 30px;
  width: 100px;
  height: 3px;
  background: antiquewhite;
}

.registro {
  margin-left: auto;
  margin-right: auto;
  border: none;
  background: antiquewhite;
  width: 230px;
  height: 55px;
  border-radius: 15px;
  font-size: 20px;
  color: #12525e;
  font-weight: bold;
  transition: 0.5s;
}

.sesion {
  border: none;
  background: antiquewhite;
  width: 150px;
  height: 35px;
  border-radius: 15px;
  font-size: 15px;
  color: #12525e;
  font-weight: bold;
  transition: 0.5s;
}
</style>
