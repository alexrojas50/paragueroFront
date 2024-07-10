<template>
  <q-dialog v-model="card">
    <q-card class="my-card">
      <q-card-section class="q-pt-md">
        <div class="col text-h6 ellipsis">Crea un Reporte</div>
      </q-card-section>

      <q-card-section class="q-pt-md">
        <q-input v-model="courseName" filled label="Curso" disable></q-input>

        <q-input
          v-model="courseTeacher"
          class="q-mt-md"
          filled
          label="Maestro"
          disable
        ></q-input>

        <q-input
          v-model="meetDate"
          class="q-mt-md"
          filled
          label="Fecha"
          disable
        ></q-input>

        <q-input
          v-model="report"
          class="q-mt-md"
          filled
          autogrow
          label="Escribe el reporte"
        ></q-input>
      </q-card-section>

      <q-separator />
      <div class="loaderContainer" v-if="loading">
        <span class="loader"></span>
      </div>

      <q-separator />

      <q-card-actions align="right">
        <q-btn
          type="submit"
          flat
          color="primary"
          label="Crear"
          @click="editCourse"
          :disable="!report"
        >
          <q-tooltip
            class="bg-red text-h6"
            anchor="center left"
            self="center right"
            :offset="[10, 10]"
            v-if="!report"
            >Rellena todos los campos
          </q-tooltip>
        </q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { ref, onMounted, watch } from "vue";
import { api } from "../../../boot/axios.js";
import Swal from "sweetalert2";

const props = defineProps(["meet", "open", "changeModal", "loadCourse"]);

const router = useRouter();
const route = useRoute();

defineOptions({
  name: "EditReport",
});

const card = ref(props.open);

const meetId = ref(props.meet._id);
const courseName = ref(props.meet.course.name);
const courseTeacher = ref(props.meet.course.teacher.name);
const meetDate = ref(`${props.meet.date} ${props.meet.time}`);
const report = ref("");

const loading = ref(false);

const editCourse = async () => {
  try {
    console.log("???????????????");
    loading.value = true;
    console.log("??????????????? 1111111");

    await api.post("/report", {
      meetId: meetId.value,
      report: report.value,
    });
    console.log("??????????????? 22222222");

    Swal.fire({
      title: "Creado",
      text: "Reporte creado correctamente",
      icon: "success",
      confirmButtonText: "Aceptar",
    });
    console.log("??????????????? 4444444444");

    props.loadCourse();

    console.log("????????????? 5555");
  } catch (error) {
    console.log("ERROR ", error);
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
</style>
