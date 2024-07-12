<template>
  <q-dialog class="" v-model="card">
    <q-card class="my-card">
      <q-card-section class="q-pt-md">
        <div class="col text-h6 ellipsis">Elimina un Encuentro</div>
      </q-card-section>

      <q-card-section class="q-pt-md">
        <div class="text-h7">
          ¿Seguro que quieres eliminar el encuentro de {{ meet.course.name }} el día
          {{ meet.date }} a las {{ meet.time }}?
        </div>
      </q-card-section>

      <q-separator />
      <div class="loaderContainer" v-if="loading">
        <span class="loader"></span>
      </div>

      <q-separator />

      <q-card-actions align="right" class="row justify-around">
        <q-btn color="primary" label="Regresar" @click="close(false)" />
        <q-btn color="red" label="Eliminar Encuentro" @click="close(true)" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import Swal from "sweetalert2";
import { api } from "src/boot/axios";
const props = defineProps(["meet", "open", "changeModal", "loadMeets"]);

defineOptions({
  name: "DeleteCourse",
});

const card = ref(props.open);
const loading = ref(false);
const meet = ref(props.meet);

const close = async (decision) => {
  if (decision) {
    try {
      loading.value = true;
      await api.delete(`/meet?meetId=${props.meet._id}`);
      props.loadMeets();
      loading.value = false;
      card.value = false;
      Swal.fire({
        title: "Eliminado",
        text: "Encuentro Eliminado Correctamente",
        icon: "success",
        confirmButtonText: "Aceptar",
        timer: 3000,
        timerProgressBar: true,
      });
    } catch (error) {
      loading.value = false;
      card.value = false;
      Swal.fire({
        title: "Error",
        text: "Error Editando el Encuentro",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    }
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
