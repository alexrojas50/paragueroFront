<template>
  <q-page class="flex flex-center mainPage">
    <div class="main">
      <div class="loaderContainer">
        <span class="loader" v-if="loading"></span>
      </div>
      <form @submit.prevent="Register">
        <h1 class="subtitle1">PARAGÜERO</h1>
        <h3>Regístrate aquí</h3>
        <label for="useremail">Email</label>
        <input
          type="text"
          placeholder="Ingresa tu email"
          id="useremail"
          v-model="userEmail"
        />
        <label for="username">Nombre de Usuario</label>
        <input
          type="text"
          placeholder="Ingresa un nombre de usuario"
          id="username"
          v-model="userName"
        />
        <label for="username">Teléfono</label>
        <input
          type="text"
          placeholder="Ingresa un número de teléfono"
          id="phone"
          v-model="phone"
        />

        <label for="username">Cédula</label>
        <input
          type="text"
          placeholder="Ingresa un número de cédula"
          id="CI"
          v-model="ci"
        />

        <label for="password">Password</label>
        <input
          type="password"
          placeholder="Ingresa tu contraseña"
          id="password"
          v-model="password"
        />
        <button class="register" type="submit">Regístrate</button>
        <div class="social">
          <div class="go" @click="toHome">
            <p>Home</p>
          </div>
          <div class="fb" @click="toLogin">
            <p>Login</p>
          </div>
        </div>
      </form>
    </div>
  </q-page>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import Swal from "sweetalert2";
import { api } from "src/boot/axios";
import { SessionStorage } from "quasar";

defineOptions({
  name: "RegisterPage",
});

const userEmail = ref("");
const userName = ref("");
const phone = ref("");
const ci = ref("");
const password = ref("");
const loading = ref(false);

const router = useRouter();
const route = useRoute();

onMounted(() => {
  // currentPath.value.changePath("register");
});

const toHome = () => router.push({ name: "Index" });
const toLogin = () => router.push({ name: "Login" });

const Register = async () => {
  try {
    loading.value = true;

    const res = await api.post("/users/create", {
      userEmail: userEmail.value,
      userName: userName.value,
      password: password.value,
      phone: phone.value,
      CIUser: ci.value,
    });

    api.defaults.headers.common["Authorization"] = res.data.token;
    SessionStorage.set("Authorization", res.data.token);
    router.push("/client");
  } catch (error) {
    console.log("ERROR? ", error);
    Swal.fire({
      title: "Error!",
      text: error.messageError
        ? error.message
        : error.response
        ? error.response.data.error
        : error,
      icon: "error",
      confirmButtonText: "Aceptar",
    });
  } finally {
    loading.value = false;
  }
};
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
  padding-top: 0px;
}

*,
*:before,
*:after {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

.main {
  width: 100vw;
  height: 100%;
  box-sizing: border-box;
  padding-top: max(10vh, 70px);
  /* padding-bottom: 30px; */

  display: flex;
  justify-content: center;
  overflow: scroll;
}

form {
  height: fit-content;
  width: 38vw;
  background-color: rgba(0, 0, 0, 0.459);
  position: relative;
  border-radius: 10px;
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 0 40px rgba(8, 7, 16, 0.6);
  padding: 50px 35px;
}

form * {
  font-family: "Poppins", sans-serif;
  color: #ffffff;
  letter-spacing: 0.5px;
  outline: none;
  border: none;
}

form h3 {
  font-size: 32px;
  font-weight: 500;
  line-height: 42px;
  text-align: center;
}

label {
  display: block;
  margin-top: 30px;
  font-size: 16px;
  font-weight: 500;
}

input {
  position: relative;
  display: block;
  height: 50px;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.07);
  border-radius: 3px;
  padding: 0 10px;
  margin-top: 8px;
  font-size: 14px;
  font-weight: 300;
  z-index: 2;
}

::placeholder {
  color: #e5e5e5;
}

button {
  margin-top: 50px;
  width: 100%;
  background-color: #ffffff;
  color: rgba(8, 7, 16, 1);
  padding: 15px 0;
  font-size: 18px;
  font-weight: 600;
  border-radius: 5px;
  cursor: pointer;
  transition: 1s;
}

.register:hover {
  background-color: antiquewhite;
  transform: scale(1.1);
}

.social {
  margin-top: 30px;
  display: flex;
  justify-content: center;
  width: 100%;
}

.social div {
  background: red;
  width: 150px;
  border-radius: 3px;
  padding-top: 7px;
  padding-bottom: 7px;
  background-color: rgba(255, 255, 255, 0.27);
  color: #eaf0fb;
  text-align: center;
}

.social div:hover {
  background-color: rgba(255, 255, 255, 0.47);
}

.social .fb {
  margin-left: 25px;
}

.social p {
  font-size: 17px;
}

.social p:hover {
  cursor: pointer;
}

.subtitle1 {
  position: absolute;
  font-size: 100px;
  opacity: 0.2;
  font-family: "Lobster", cursive;
  color: antiquewhite;
  right: -20vw;
  top: 45px;
  user-select: none;
}

.loaderContainer {
  display: flex;
  justify-content: center;
  position: absolute;
  width: 100%;
  height: 50px;
  top: 53%;
}

.loader {
  position: relative;
  width: 48px;
  height: 48px;
  margin-left: auto;
  margin-right: auto;
  border-radius: 50%;
  display: inline-block;
  border-top: 4px solid antiquewhite;
  border-right: 4px solid transparent;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
  z-index: 999;
}

.loader::after {
  content: "";
  box-sizing: border-box;
  position: absolute;
  left: 0;
  top: 0;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border-left: 4px solid rgba(8, 7, 16, 1);
  border-bottom: 4px solid transparent;
  animation: rotation 0.5s linear infinite reverse;
}
</style>
