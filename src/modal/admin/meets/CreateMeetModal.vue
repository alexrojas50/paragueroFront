<template>
  <q-dialog v-model="card" persistent>
    <q-card class="my-card">
      <q-card-section>
        <div class="row no-wrap items-center">
          <div class="col text-h6 ellipsis">Crea un Encuentro</div>
        </div>
      </q-card-section>

      <q-separator />
      <div class="loaderContainer" v-if="loading">
        <span class="loader"></span>
      </div>

      <q-card-section class="q-pt-md">
        <div class="text-subtitle1">Selecciona un Curso</div>
        <!-- <div class="text-subtitle1">Teacher : {{ course.teacher }}</div> -->
        <q-select
          color="teal"
          filled
          v-model="courseS"
          :options="avalibleCourse"
          label="Curso"
        >
          <template v-slot:prepend>
            <q-icon name="book" />
          </template>
        </q-select>
      </q-card-section>

      <q-card-section class="q-pt-md">
        <div class="text-subtitle1">Selecciona un Aula</div>
        <!-- <div class="text-subtitle1">Teacher : {{ course.teacher }}</div> -->
        <q-select
          color="teal"
          filled
          v-model="roomS"
          :options="avalibleRooms"
          label="Aula"
        >
          <template v-slot:prepend>
            <q-icon name="meeting_room" />
          </template>
        </q-select>
      </q-card-section>

      <q-card-section class="q-pt-md">
        <div class="text-subtitle1">Selecciona una Fecha</div>
        <!-- <div class="text-subtitle1">Teacher : {{ course.teacher }}</div> -->
        <q-input color="teal" filled v-model="dateS" label="Fecha" type="date">
          <template v-slot:prepend>
            <q-icon name="event" />
          </template>
        </q-input>
      </q-card-section>

      <q-card-section class="q-pt-md">
        <div class="text-subtitle1">Selecciona una Hora</div>
        <!-- <div class="text-subtitle1">Teacher : {{ course.teacher }}</div> -->
        <q-input color="teal" filled v-model="timeS" label="Hora" type="time">
          <template v-slot:prepend>
            <q-icon name="schedule" />
          </template>
        </q-input>
      </q-card-section>

      <q-separator />

      <q-card-actions align="around">
        <q-btn color="red" label="Cancelar" @click="close(false)" />

        <q-btn color="primary" label="Crear Encuentro" @click="close(true)" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { ref, onMounted, watch } from "vue";
import Swal from "sweetalert2";
import moment from "moment";
import { api } from "src/boot/axios";

const props = defineProps(["loadMeets", "open", "changeModal"]);

const router = useRouter();
const route = useRoute();

defineOptions({
  name: "DeleteCourse",
});

const card = ref(props.open);
const loading = ref(false);

const courseS = ref(null);
const roomS = ref(null);
const dateS = ref("");
const timeS = ref("");

const avalibleCourse = ref([]);
const avalibleRooms = ref([]);

const close = async (decision) => {
  try {
    if (decision) {
      loading.value = true;
      await api.post("/meet", {
        courseId: courseS.value.id,
        roomId: roomS.value.id,
        date: dateS.value,
        time: timeS.value,
      });
      Swal.fire({
        title: "Creada",
        text: "Aula creada Correctamente",
        icon: "success",
        confirmButtonText: "Aceptar",
        timer: 3000,
        timerProgressBar: true,
      });
      loading.value = false;
      card.value = false;
      props.loadMeets();
    } else {
      loading.value = false;
      card.value = false;
    }
  } catch (error) {
    loading.value = false;
    card.value = false;
    console.log("ERROR ", error);
    Swal.fire({
      title: "Error",
      text: "Error al crear el aula",
      icon: "error",
      confirmButtonText: "Aceptar",
    });
  }
};

onMounted(async () => {
  await api.get("/course?isForMeets=true").then((res) => {
    avalibleCourse.value = res.data;
  });

  await api.get("/room?isForMeets=true").then((res) => {
    avalibleRooms.value = res.data;
  });
});

watch(card, () => {
  props.changeModal();
});

watch(courseS, () => {
  console.log("CHANGE courseS ", courseS);
});
</script>

<style scoped>
* {
  scrollbar-width: none;
}

.my-card {
  min-width: 30vw;
}

.loaderContainer {
  display: flex;
  justify-content: center;
  position: absolute;
  width: 100%;
  height: 50px;
  top: 53%;
  z-index: 999;
}

.loader {
  position: relative;
  width: 48px;
  height: 48px;
  margin-left: auto;
  margin-right: auto;
  border-radius: 50%;
  display: inline-block;
  border-top: 4px solid rgb(50, 75, 216);
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

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.inputCreate {
}
</style>
