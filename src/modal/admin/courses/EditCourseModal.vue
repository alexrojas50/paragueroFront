<template>
  <q-dialog v-model="card">
    <q-card class="my-card">
      <q-card-section class="q-pt-md">
        <div class="col text-h6 ellipsis">Edita un Curso</div>
      </q-card-section>

      <q-card-section class="q-pt-md">
        <q-input v-model="courseName" ref="courseNameRef" class="" filled label="Nombre del Curso"
          :rules="rules.name"></q-input>
        <q-input v-model="courseTeacher" ref="courseTeacherRef" class="q-mt-md" filled label="Maestro"
          :rules="rules.teacher"></q-input>
        <q-input v-model="courseHour" ref="courseHourRef" class="q-mt-md" filled label="Horas" mask="###"
          :rules="rules.hour"></q-input>
        <q-input v-model="courseDescription" ref="courseDescriptionRef" class="q-mt-md" filled label="Descripción"
          :rules="rules.description"></q-input>
      </q-card-section>

      <q-separator />
      <div class=" loaderContainer" v-if="loading">
        <span class="loader"></span>
      </div>

      <q-separator />

      <q-card-actions align="right">
        <q-btn type="submit" flat color="primary" label="Editar Curso" @click="editCourse"
          :disable="!courseTeacher || !courseName || !courseHour || !courseDescription">
          <q-tooltip class="bg-red text-h6" anchor="center left" self="center right" :offset="[10, 10]"
            v-if="!courseTeacher || !courseName || !courseHour || !courseDescription">Rellena todos los
            campos
          </q-tooltip>
        </q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { ref, onMounted, watch } from "vue";
import { api } from "../../../boot/axios.js"
import Swal from "sweetalert2";

const props = defineProps(["course", "open", "changeModal", "loadCourse"]);

const router = useRouter();
const route = useRoute();

defineOptions({
  name: "EditCourse",
});

const card = ref(props.open);

const courseName = ref(props.course.name);
const courseTeacher = ref(props.course.teacher);
const courseHour = ref(props.course.hours);
const courseDescription = ref(props.course.description);
const courseId = ref(props.course._id);
const loading = ref(false);

const courseNameRef = ref(null);
const courseTeacherRef = ref(null);
const courseHourRef = ref(null);
const courseDescriptionRef = ref(null);

const rules = {
  name: [
    val => (val.length < 61) || '60 Carácteres máximos en el nombre',
    val => (val.length > 0) || 'Coloca un nombre'
  ],
  teacher: [
    val => (val.length < 61) || '60 Carácteres máximos en el maestro',
    val => (val.length > 0) || 'Coloca un maestro'
  ],
  hour: [
    val => (val.toString().length < 4) || '3 Carácteres máximos en la hora',
    val => (val.toString().length > 0) || 'Coloca una hora',
    val => (!val.toString().includes('e')) || 'Ingresa un número válido'
  ],
  description: [
    val => (val.length < 61) || '60 Carácteres máximos en la descripción',
    val => (val.length > 0) || 'Coloca una descripción'
  ],
}

const editCourse = async () => {

  try {
    loading.value = true;

    courseNameRef.value.validate()
    courseTeacherRef.value.validate()
    courseHourRef.value.validate()
    courseDescriptionRef.value.validate()

    if (courseNameRef.value.hasError || courseTeacherRef.value.hasError || courseHourRef.value.hasError || courseDescriptionRef.value.hasError) throw { message: 'Cumple con todas las condiciones antes de creare el curso' }

    await api.put('/course', { courseName: courseName.value, courseTeacher: courseTeacher.value, courseHours: courseHour.value, courseDescription: courseDescription.value, courseId: courseId.value })
    Swal.fire({
      title: "Editado",
      text: 'Curso editado correctamente',
      icon: "success",
      confirmButtonText: "Aceptar",
    });
    props.loadCourse()

  } catch (error) {
    console.log('ERROR ', error);
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
  console.log('PROPS ', props);
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

.inputCreate {}
</style>
