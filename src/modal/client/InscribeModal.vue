<template>
  <q-dialog v-model="card">
    <q-card class="my-card">
      <q-card-section>
        <div class="row no-wrap items-center">
          <div class="col text-h6 ellipsis">{{ course.name }}</div>
        </div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <div class="text-subtitle1">Horas : {{ course.hours }}</div>
        <div class="text-subtitle1">Profesor : {{ course.teacher.name }}</div>
        <div class="text-subtitle1">Aula : #{{ model.data?.room?.number }}</div>
      </q-card-section>

      <q-separator />
      <div class="loaderContainer">
        <span class="loader" v-if="loading"></span>
      </div>
      <q-card-section class="q-pt-md">
        <div class="text-subtitle1">Selecciona la próxima clase</div>
        <q-select
          color="teal"
          filled
          v-model="model"
          :options="futureMeetings"
          label="Label"
        >
          <template v-slot:prepend>
            <q-icon name="event" />
          </template>
        </q-select>
      </q-card-section>

      <q-separator />

      <q-card-actions align="right">
        <q-btn flat color="primary" label="Inscribirse" @click="inscribe" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { ref, onMounted, watch } from "vue";
import Swal from "sweetalert2";
import { api } from "src/boot/axios";
const props = defineProps(["course", "open", "changeModal"]);

const router = useRouter();
const route = useRoute();

defineOptions({
  name: "InscribeModal",
});

const card = ref(props.open);
const course = ref(props.course);
const model = ref("");
const loading = ref(false);
const futureMeetings = ref([]);

const inscribe = async () => {
  try {
    loading.value = true;
    await api.post(`/meet/inscribe?meet=${model.value.data._id}`);
    Swal.fire({
      title: "Registrado",
      text: "Te has registrado exitosamente",
      icon: "success",
      confirmButtonText: "Aceptar",
      timer: 3000,
      timerProgressBar: true,
    });
  } catch (error) {
    Swal.fire({
      title: "Error",
      text: error.message && !error.response ? error.message : error.response.data.error,
      icon: "error",
      confirmButtonText: "Aceptar",
    });
  } finally {
    loading.value = false;
    card.value = false;
  }
};

onMounted(async () => {
  console.log("PROPS ", course.value);
  const res = await api.get(`/meet?courseId=${course.value._id}&isForInscribe=true`);
  console.log("RESSS ", res);
  futureMeetings.value = res.data;
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
</style>
