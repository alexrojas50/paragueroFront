<template>
  <q-dialog v-model="card">
    <q-card class="my-card">
      <q-card-section>
        <div class="row no-wrap items-center">
          <div class="col text-h6 ellipsis">Información del EncuentrAo</div>
        </div>
      </q-card-section>

      <q-separator />
      <div class="loaderContainer" v-if="loading">
        <span class="loader"></span>
      </div>

      <q-card-section class="q-pt-md">
        <div class="text-subtitle1"><b>Curso :</b> {{ meetSelect.course.name }}</div>
        <div class="text-subtitle1">
          <b>Profesor :</b> {{ meetSelect.course.teacher.name }}
        </div>
        <div class="text-subtitle1"><b>Fecha :</b> {{ meetSelect.date }}</div>
        <div class="text-subtitle1"><b>Hora :</b> {{ meetSelect.time }}</div>
      </q-card-section>

      <q-separator />

      <q-card-section class="q-pt-md">
        <q-table
          id="tablePrint2"
          flat
          bordered
          title="Encuentros"
          :rows="rows"
          :columns="columns"
          row-key="name"
          binary-state-sort
          class="tableCourse"
          rows-per-page-label="Documentos por página"
        >
          <template v-slot:top>
            <b>Usuarios Registrados</b>
          </template>
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td key="name" :props="props">
                {{ props.row.name }}
              </q-td>
              <q-td key="phone" :props="props">
                {{ props.row.phone }}
              </q-td>
              <q-td key="email" :props="props">
                {{ props.row.email }}
              </q-td>

              <q-td key="actions" :props="props">
                <div class="q-gutter-sm row justify-center">
                  <q-btn
                    rounded
                    @click="openModalDelete(props.row)"
                    color="red"
                    icon="delete"
                    class="deteleBtn"
                  />
                </div>
              </q-td>
            </q-tr>
          </template>
        </q-table>
        <q-btn color="blue" label="Descargar PDF" @click="descargarPDF" class="q-mt-md" />
      </q-card-section>
      <q-separator />

      <q-card-actions align="around">
        <q-btn color="red" label="Cerrar" @click="close" />
      </q-card-actions>
    </q-card>
    <div style="visibility: hidden; position: absolute; overflow: hidden">
      <!-- <print-modal></print-modal> -->
      <div id="tablePrint">
        <div class="text-subtitle1"><b>Curso :</b> {{ meetSelect.course.name }}</div>
        <div class="text-subtitle1">
          <b>Profesor :</b> {{ meetSelect.course.teacher.name }}
        </div>
        <div class="text-subtitle1"><b>Fecha :</b> {{ meetSelect.date }}</div>
        <div class="text-subtitle1"><b>Hora :</b> {{ meetSelect.time }}</div>
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Teléfono</th>
              <th>Correo</th>
              <!-- Agrega más columnas según tus necesidades -->
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in rows" :key="index">
              <td>{{ item.name }}</td>
              <td>{{ item.phone }}</td>
              <td>{{ item.email }}</td>
              <!-- Agrega más celdas según tus necesidades -->
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </q-dialog>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { ref, onMounted, watch } from "vue";
import Swal from "sweetalert2";
import moment from "moment";
import { api } from "src/boot/axios";
import html2pdf from "html2pdf.js";

const props = defineProps(["meet", "open", "changeModal"]);

console.log("PROPSSS ", props);

const router = useRouter();
const route = useRoute();

defineOptions({
  name: "InfoMeetModal",
  components: {},
});

const card = ref(props.open);
const meetSelect = ref(props.meet);
const loading = ref(false);
const rows = ref([]);

const close = async (decision) => {
  loading.value = false;
  card.value = false;
};

watch(card, () => {
  props.changeModal();
});

watch(meetSelect, () => {
  console.log("MEET ", meetSelect.value);
});

onMounted(async () => {
  const res = await api.get(`/meet?meetId=${meetSelect.value._id}`);
  console.log("RESSS ", res);
  rows.value = res.data.users;
});

const datos = [
  { valor1: "Dato 1AAAAAAAAAAAAAAAAAAAAAA", valor2: "Dato A" },
  { valor1: "Dato 2", valor2: "Dato B" },
  // Agrega más datos según tus necesidades
];

const descargarPDF = () => {
  const printContents = document.getElementById("tablePrint");
  var opt = {
    margin: 1,
    filename: "Course.pdf",
    html2canvas: { scale: 2 },
    jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
  };

  // New Promise-based usage:
  html2pdf().from(printContents).set(opt).save();
};

const columns = [
  {
    name: "name",
    required: true,
    label: "Nombre",
    align: "left",
    field: "name",
    sortable: true,
  },
  {
    name: "phone",
    label: "Teléfono",
    field: "phone",
    align: "center",
  },
  {
    name: "email",
    label: "Correo",
    field: "email",
    align: "center",
  },
  {
    name: "actions",
    label: "Acciones",
    field: "actions",
    align: "center",
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

.deteleBtn {
  height: 30px;
  min-height: 0px;
}

.tdTable {
  margin-right: 500px;
}
</style>
