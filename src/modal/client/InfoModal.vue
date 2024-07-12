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
        <div class="text-subtitle1">Profesor : {{ course.teacher.NAME }}</div>
        <div class="text-subtitle1">Descripción : {{ course.description }}</div>
      </q-card-section>

      <q-separator />

      <q-separator />

      <q-card-actions align="right">
        <q-btn v-close-popup flat color="primary" label="Cerrar" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { ref, onMounted, watch } from "vue";
import Swal from "sweetalert2";
const props = defineProps(["course", "open", "changeModal"]);

const router = useRouter();
const route = useRoute();

defineOptions({
  name: "InscribeModal",
});

const card = ref(props.open);
const course = ref(props.course);
const model = ref("");
const stars = ref(3);

onMounted(() => {
  console.log("PROPS ", props);
});

watch(card, () => {
  console.log("CERRANDO");
  props.changeModal();
});

const futureMeetings = [
  {
    date: "2024-05-02",
    hour: "2:00 PM",
    direction: "TALTALTAL",
    label: "2024-05-02 2:00 PM",
    room: "5",
  },
  {
    date: "2024-05-03",
    hour: "5:00 PM",
    direction: "TALTALTAL",
    label: "2024-05-03 5:00 PM",
    room: "6",
  },
  {
    date: "2024-05-04",
    hour: "4:00 PM",
    direction: "TALTALTAL",
    label: "2024-05-04 4:00 PM",
    room: "7",
  },
  {
    date: "2024-05-05",
    hour: "3:00 PM",
    direction: "TALTALTAL",
    label: "2024-05-05 3:00 PM",
    room: "8",
  },
];
</script>

<style scoped>
* {
  scrollbar-width: none;
}

.my-card {
  min-width: 30vw;
}
</style>
