<template>
  <q-dialog class="" v-model="card">
    <q-card class="my-card">
      <q-card-section class="q-pt-md">
        <div class="col text-h6 ellipsis">Elimina un Encuentro</div>
      </q-card-section>

      <q-card-section class="q-pt-md">
        <div class="text-h7">
          ¿Seguro que quieres eliminar el encuentro de {{ meet.course }} el día
          {{ meet.date }} a las {{ meet.hour }}?
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
import { ref, onMounted, watch } from "vue";
import Swal from "sweetalert2";
const props = defineProps(["meet", "open", "changeModal"]);

defineOptions({
  name: "DeleteCourse",
});

const card = ref(props.open);
const loading = ref(false);
const meet = ref(props.meet);

const close = (decision) => {
  if (decision) {
    loading.value = true;
    setTimeout(() => {
      loading.value = false;
      card.value = false;
      Swal.fire({
        title: "Elimnado",
        text: "Encuentro Eliminado Correctamente",
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
  max-width: none;
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
