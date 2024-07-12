<template>
  <q-dialog v-model="card">
    <q-card class="my-card">
      <q-card-section class="q-pt-md">
        <div class="col text-h6 ellipsis">Crea un Curso</div>
      </q-card-section>

      <q-card-section class="q-pt-md">
        <q-input
          v-model="courseName"
          ref="courseNameRef"
          class=""
          filled
          label="Nombre del Curso"
          :rules="rules.name"
        ></q-input>
        <!-- <q-input
          v-model="courseTeacher"
          ref="courseTeacherRef"
          class="q-mt-md"
          filled
          label="Maestro"
          :rules="rules.teacher"
        ></q-input> -->

        <q-input
          color="teal"
          filled
          v-model="courseTeacher"
          :options="teachers"
          label="Curso"
        >
          <template v-slot:prepend>
            <q-icon name="book" />
          </template>
        </q-input>
        <q-input
          v-model="courseHour"
          ref="courseHourRef"
          class="q-mt-md"
          filled
          label="Horas"
          mask="###"
          :rules="rules.hour"
        ></q-input>
        <q-input
          v-model="courseDescription"
          ref="courseDescriptionRef"
          class="q-mt-md"
          filled
          label="Descripción"
          :rules="rules.description"
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
          label="Crear Curso"
          @click="createCourse"
          :disable="!courseTeacher || !courseName || !courseHour || !courseDescription"
        >
          <q-tooltip
            class="bg-red text-h6"
            anchor="center left"
            self="center right"
            :offset="[10, 10]"
            v-if="!courseTeacher || !courseName || !courseHour || !courseDescription"
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
const props = defineProps(["course", "open", "changeModal", "loadCourse"]);

const router = useRouter();
const route = useRoute();

defineOptions({
  name: "CreateCourse",
});

const card = ref(props.open);
const courseName = ref("");
const courseTeacher = ref("");
const courseHour = ref("");
const courseDescription = ref("");

const courseNameRef = ref(null);
const courseTeacherRef = ref(null);
const courseHourRef = ref(null);
const courseDescriptionRef = ref(null);
const loading = ref(false);

const teachers = ref([]);

const rules = {
  name: [
    (val) => val.length < 61 || "60 Carácteres máximos en el nombre",
    (val) => val.length > 0 || "Coloca un nombre",
  ],
  teacher: [
    (val) => val.length < 61 || "60 Carácteres máximos en el maestro",
    (val) => val.length > 0 || "Coloca un maestro",
  ],
  hour: [
    (val) => val.toString().length < 4 || "3 Carácteres máximos en la hora",
    (val) => val.toString().length > 0 || "Coloca una hora",
    (val) => !val.toString().includes("e") || "Ingresa un número válido",
  ],
  description: [
    (val) => val.length < 61 || "60 Carácteres máximos en la descripción",
    (val) => val.length > 0 || "Coloca una descripción",
  ],
};

const createCourse = async () => {
  try {
    loading.value = true;

    courseNameRef.value.validate();
    courseHourRef.value.validate();
    courseDescriptionRef.value.validate();

    if (
      courseNameRef.value.hasError ||
      courseHourRef.value.hasError ||
      courseDescriptionRef.value.hasError
    )
      throw { message: "Cumple con todas las condiciones antes de creare el curso" };

    await api.post("/course", {
      courseName: courseName.value,
      courseTeacher: courseTeacher.value.id,
      courseHours: courseHour.value,
      courseDescription: courseDescription.value,
    });
    Swal.fire({
      title: "Creado",
      text: "Curso creado correctamente",
      icon: "success",
      confirmButtonText: "Aceptar",
    });
    props.loadCourse();
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

onMounted(async () => {
  await api.get("/users?isForCourse=true&level=3").then((res) => {
    teachers.value = res.data;
  });
});

watch(card, () => {
  props.changeModal();
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
