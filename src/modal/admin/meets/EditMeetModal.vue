<template>
  <q-dialog v-model="card">
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
          :options="futureMeetings"
          label="Label"
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
          :options="futureMeetings"
          label="Label"
        >
          <template v-slot:prepend>
            <q-icon name="meeting_room" />
          </template>
        </q-select>
      </q-card-section>

      <q-card-section class="q-pt-md">
        <div class="text-subtitle1">Selecciona una Fecha</div>
        <!-- <div class="text-subtitle1">Teacher : {{ course.teacher }}</div> -->
        <q-input
          color="teal"
          filled
          v-model="dateS"
          :options="futureMeetings"
          label="Label"
          type="date"
        >
          <template v-slot:prepend>
            <q-icon name="event" />
          </template>
        </q-input>
      </q-card-section>

      <q-card-section class="q-pt-md q-mb-md">
        <div class="text-subtitle1">Selecciona una Hora</div>
        <!-- <div class="text-subtitle1">Teacher : {{ course.teacher }}</div> -->
        <q-input
          color="teal"
          filled
          v-model="timeS"
          :options="futureMeetings"
          label="Label"
          type="time"
        >
          <template v-slot:prepend>
            <q-icon name="schedule" />
          </template>
        </q-input>
      </q-card-section>

      <q-separator />

      <q-card-actions align="right" class="row justify-around q-pb-md">
        <q-btn color="primary" label="Regresar" @click="close(false)" />
        <q-btn color="green" label="Cambiar Estado" @click="close(true)" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { ref, onMounted, watch } from "vue";
import Swal from "sweetalert2";
import moment from "moment";

const props = defineProps(["meet", "open", "changeModal"]);

const router = useRouter();
const route = useRoute();

defineOptions({
  name: "DeleteCourse",
});

const card = ref(props.open);
const loading = ref(false);
const courseS = ref(props.meet.course);
const roomS = ref(props.meet.room);
const dateS = ref(props.meet.date);
const timeS = ref(props.meet.time);

const close = (decision) => {
  if (decision) {
    loading.value = true;
    setTimeout(() => {
      loading.value = false;
      card.value = false;
      Swal.fire({
        title: "Elimnado",
        text: "Curso Elimnado Correctamente",
        icon: "success",
        confirmButtonText: "Aceptar",
        timer: 3000,
        timerProgressBar: true,
      });
    }, 5000);
  } else {
    loading.value = false;
    card.value = false;
  }
};

onMounted(() => {
  console.log("PROPS ", props);
});

watch(card, () => {
  props.changeModal();
});

watch(loading, () => {
  console.log("CHANGE LOADING ", loading);
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
