<template>
  <q-layout>
    <q-header class="headerS" elevated>
      <q-toolbar class="toolBar">
        <div>
          <q-toolbar-title class="titleMain" @click="returnIndex">
            Paragüero
          </q-toolbar-title>
        </div>
        <div class="butttonsHeader">
          <q-btn outline rounded class="buttonsH" @click="sendInstagram">
            Instagram
          </q-btn>

          <q-btn outline rounded class="buttonsH" @click="sendWhatsapp"> Whatsapp </q-btn>

          <q-btn
            outline
            rounded
            :class="{ closeSession: isLogin, buttonRegister: true }"
            @click="changeRoute"
          >
            {{ buttonString }}
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { currentPath, authUser } from "src/utils";
import { useRoute, useRouter } from "vue-router";
import { watch, ref, onMounted } from "vue";
import { SessionStorage } from "quasar";
import { api } from "src/boot/axios";

const router = useRouter();
const route = useRoute();
const buttonString = ref(currentPath.value.buttonString);
const isLogin = ref(false);

defineOptions({
  name: "MainLayout",
});

watch(currentPath.value, () => {
  buttonString.value = currentPath.value.buttonString;
});

watch(authUser.value, () => {
  if (authUser.value.isAuth) isLogin.value = true;
  else isLogin.value = false;
});

watch(route, () => {
  currentPath.value.changePath(router.currentRoute.value.fullPath.replace("/", ""));
});

onMounted(async () => {
  const isVerify = await authUser.value.verifyToken();
  if (authUser.value.isAuth) isLogin.value = true;
  else isLogin.value = false;
  if (
    !isVerify &&
    route.fullPath !== "/" &&
    route.fullPath !== "/login" &&
    route.fullPath !== "/register"
  ) {
    api.defaults.headers.common["Authorization"] = "";
    SessionStorage.removeItem("Authorization");
    router.push({ name: "Index" });
  }
  currentPath.value.changePath(router.currentRoute.value.fullPath.replace("/", ""));
});

const changeRoute = async () => {
  if (buttonString.value == "Cerrar Sesión") {
    api.defaults.headers.common["Authorization"] = "";
    SessionStorage.removeItem("Authorization");
    await authUser.value.verifyToken();
  }
  router.push(currentPath.value.nextRoute);
};

const sendInstagram = () =>
  window.open("https://www.instagram.com/acelparaguero/?hl=es", "_blank");

const sendWhatsapp = () =>
  window.open("https://api.whatsapp.com/send?phone=584121788031", "_blank");

const returnIndex = () => router.push({ name: "Index" });
</script>

<style scoped>
.titleMain:hover {
  cursor: pointer;
}
.buttonsH {
  margin-right: 10px;
}

.closeSession {
  background: red !important;
}

.toolBar {
  display: flex;
  justify-content: space-between;
}

.headerS {
  /* background: linear-gradient(90deg, rgba(229, 97, 0, 1) 0%, rgba(9, 9, 121, 1) 100%); */
  background: #2747d6;
}
</style>
