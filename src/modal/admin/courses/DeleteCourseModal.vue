<template>
  <q-dialog v-model="card">
    <q-card class="my-card">
      <q-card-section class="q-pt-md">
        <div class="col text-h6 ellipsis">Elimina un Curso</div>
      </q-card-section>

      <q-card-section class="q-pt-md">
        <div class="col text-h7 ellipsis">
          ¿Seguro que quieres eliminar el curso de {{ course.name }}?
        </div>
      </q-card-section>

      <q-separator />
      <div class="loaderContainer" v-if="loading">
        <span class="loader"></span>
      </div>

      <q-separator />

      <q-card-actions align="right" class="row justify-around">
        <q-btn color="primary" label="Regresar" @click="close(false)" />
        <q-btn color="red" label="Eliminar Curso" @click="close(true)" />
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
  name: "DeleteCourse",
});

const card = ref(props.open);
const loading = ref(false);
const courseId = ref(props.course._id);


const close = async (decision) => {
  try {
    if (decision) {
      loading.value = true;
      await api.delete(`/course?courseId=${courseId.value}`)
      Swal.fire({
        title: "Eliminado",
        text: 'Curso elminado correctamente',
        icon: "success",
        confirmButtonText: "Aceptar",
      });
      props.loadCourse()

    } else {
      loading.value = false;
      card.value = false;
    }
  } catch (error) {
    console.log('ERROR ', error);
    Swal.fire({
      title: "Error",
      text: error.message && !error.response ? error.message : error.response.data.error || error.message,
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

.inputCreate {}
</style>
