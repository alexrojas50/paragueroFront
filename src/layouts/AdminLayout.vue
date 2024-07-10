<template>
  <q-layout>
    <q-header class="headerS" elevated>
      <q-toolbar class="toolBar">
        <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
        <q-toolbar-title class="titleMain" @click="returnIndex">
          Paragüero
        </q-toolbar-title>
        <div class="butttonsHeader">
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

    <q-drawer
      v-model="drawer"
      show-if-above
      :mini="miniState"
      @mouseover="miniState = false"
      @mouseout="miniState = true"
      :width="200"
      :breakpoint="500"
      bordered
      :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'"
    >
      <q-scroll-area class="fit" :horizontal-thumb-style="{ opacity: 0 }">
        <q-list padding>
          <q-item
            :active="activeItem == 'courses'"
            clickable
            v-ripple
            @click="sendTo({ name: 'AdminCourses' })"
          >
            <q-item-section avatar>
              <q-icon name="menu_book" />
            </q-item-section>
            <q-item-section> Cursos </q-item-section>
          </q-item>

          <q-item
            :active="activeItem == 'rooms'"
            clickable
            v-ripple
            @click="sendTo({ name: 'AdminRooms' })"
          >
            <q-item-section avatar>
              <q-icon name="meeting_room" />
            </q-item-section>
            <q-item-section> Aulas </q-item-section>
          </q-item>

          <q-item
            :active="activeItem == 'users'"
            clickable
            v-ripple
            @click="sendTo({ name: 'AdminUsers' })"
          >
            <q-item-section avatar>
              <q-icon name="group" />
            </q-item-section>
            <q-item-section> Usuarios </q-item-section>
          </q-item>

          <q-item
            :active="activeItem == 'meets'"
            clickable
            v-ripple
            @click="sendTo({ name: 'AdminMeets' })"
          >
            <q-item-section avatar>
              <q-icon name="apps" />
            </q-item-section>
            <q-item-section> Encuentros </q-item-section>
          </q-item>

          <q-item
            :active="activeItem == 'teachers'"
            clickable
            v-ripple
            @click="sendTo({ name: 'AdminTeachers' })"
          >
            <q-item-section avatar>
              <q-icon name="book" />
            </q-item-section>
            <q-item-section> Profesores </q-item-section>
          </q-item>

          <q-item
            :active="activeItem == 'reports'"
            clickable
            v-ripple
            @click="sendTo({ name: 'AdminReports' })"
          >
            <q-item-section avatar>
              <q-icon name="report" />
            </q-item-section>
            <q-item-section> Reportes </q-item-section>
          </q-item>
          <q-separator />

          <q-item clickable v-ripple @click="getBackup()">
            <q-item-section avatar>
              <q-icon name="cloud_download" />
            </q-item-section>
            <q-item-section> Backup </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { currentPath, authUser } from "src/utils";
import fileDownload from "js-file-download";
import { useRoute, useRouter } from "vue-router";
import { watch, ref, onMounted } from "vue";
import { SessionStorage } from "quasar";
import { api } from "src/boot/axios";
import Swal from "sweetalert2";

const router = useRouter();
const route = useRoute();

const buttonString = ref(currentPath.value.buttonString);
const isLogin = ref(false);
const drawer = ref(true);
const miniState = ref(true);
const activeItem = ref("");

defineOptions({
  name: "AdminLayout",
});

const changeRoute = async () => {
  if (buttonString.value == "Cerrar Sesión") {
    api.defaults.headers.common["Authorization"] = "";
    SessionStorage.removeItem("Authorization");
    await authUser.value.verifyToken();
  }
  router.push(currentPath.value.nextRoute);
};

const sendTo = (routeTo) => router.push(routeTo);

const getBackup = async () => {
  try {
    await api.get("/backup");

    api({
      url: "/static/backup.tar",
      method: "GET",
      responseType: "blob", // Important
    }).then((response) => {
      fileDownload(response.data, "backup.tar");
    });
  } catch (error) {
    console.log("ERROR ", error);
    Swal.fire({
      title: "Error",
      text: error.message && !error.response ? error.message : error.response.data.error,
      icon: "error",
      confirmButtonText: "Aceptar",
    });
  }
};

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
