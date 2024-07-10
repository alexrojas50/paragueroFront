<template>
  <q-page class="flex flex-center mainPage">
    <div class="box">
      <div class="title">
        <p>ASOCIACIÓN CIVIL "EL PARAGUERO"</p>
      </div>
      <div class="dataBox">
        <div class="tableCourses">
          <div class="q-pa-md">
            <q-table
              flat
              bordered
              title="Últimos Encuentros"
              :rows="rows"
              :columns="columns"
              row-key="name"
              binary-state-sort
              class="tableCourse"
              rows-per-page-label="Documentos por página"
              dark
            >
              <template v-slot:top>
                <p>Últimos Encuentros</p>
                <q-space />
                <!-- <q-btn rounded @click="openModalCreate" color="green" icon="add"></q-btn> -->
                <p>Crea un reporte pulsando el botón "+"</p>
              </template>

              <template v-slot:body="props">
                <q-tr :props="props">
                  <q-td key="name" :props="props">
                    {{ props.row.course.name }}
                  </q-td>
                  <q-td key="teacher" :props="props">
                    {{ props.row.course.teacher.name }}
                  </q-td>
                  <q-td key="date" :props="props">
                    <div class="text-pre-wrap">
                      {{ `${props.row.date} ${props.row.time}` }}
                    </div>
                  </q-td>
                  <q-td key="actions" :props="props">
                    <div class="q-gutter-sm row justify-center">
                      <q-btn
                        rounded
                        @click="openModalEdit(props.row)"
                        color="green"
                        icon="add"
                      />

                      <q-btn
                        rounded
                        @click="openModalDelete(props.row)"
                        color="blue"
                        icon="info"
                      />
                    </div>
                  </q-td>
                </q-tr>
              </template>
            </q-table>
          </div>
        </div>
      </div>
      <create-modal
        :open="modalCreate"
        :changeModal="openModalCreate"
        v-if="modalCreate"
        :loadCourse="loadCourse"
      />

      <edit-modal
        :meet="courseSelect"
        :open="modalEdit"
        :changeModal="openModalEdit"
        v-if="modalEdit"
        :loadCourse="loadCourse"
      />
    </div>
  </q-page>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import EditCourseModal from "../../modal/client/report/EditReportModal.vue";
import Swal from "sweetalert2";
import { ref, onMounted } from "vue";
import { api } from "src/boot/axios";

const router = useRouter();
const route = useRoute();

defineOptions({
  name: "AdminCourses",
  components: {
    "edit-modal": EditCourseModal,
  },
});

const modalCreate = ref(false);
const modalEdit = ref(false);
const modalDelete = ref(false);
const courseSelect = ref({});
const rows = ref([]);

const openModalCreate = () => {
  modalCreate.value = !modalCreate.value;
};
const openModalEdit = (courseS) => {
  courseSelect.value = courseS;
  modalEdit.value = !modalEdit.value;
};
const openModalDelete = (courseS) => {
  courseSelect.value = courseS;
  modalDelete.value = !modalDelete.value;
};

const loadCourse = async () => {
  try {
    const res = await api.get("/meet");
    rows.value = res.data;
  } catch (error) {
    console.log("error", error);
    Swal.fire({
      title: "Error",
      text: error.message && !error.response ? error.message : error.response.data.error,
      icon: "error",
      confirmButtonText: "Aceptar",
    });
  }
};

const columns = [
  {
    name: "name",
    required: true,
    label: "Nombre del Curso",
    align: "left",
    field: (row) => row.name,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "teacher",
    align: "center",
    label: "Dictado Por",
    field: "teacher",
    sortable: true,
  },
  {
    name: "date",
    label: "Fecha",
    align: "center",
    field: "date",
    style: "width: 10px",
  },
  {
    name: "actions",
    label: "Acciones",
    align: "center",
    content: "center",
    field: "actions",
  },
];

onMounted(() => {
  loadCourse();
});
</script>

<style scoped>
* {
  scrollbar-width: none;
}

.mainPage {
  background: rgb(91, 123, 212);
  position: absolute;
  top: 0;
  left: 0;
  min-height: 100%;
  height: 100vh;
  width: 100vw;
  padding-top: 50px;
}

.box {
  /* background: red; */
  padding: 20px;
  position: relative;
  width: 100%;
  height: 100%;
  overflow: scroll;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}

.title {
  width: 95vw;
  height: 10vh;
  /* background: blue; */
}

p {
  width: 100%;
  text-align: center;
  color: white;
  font-size: x-large;
}

.dataBox {
  width: 95vw;
  height: 75vh;
  /* background: blue; */
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

.tableCourses {
  width: 80vw;
  height: 100%;
  /* background: red; */
}

.tableCourse {
  color: white;
  font-weight: bold;
  min-height: 60vh;
  max-height: 70vh;
  background-color: rgba(0, 0, 0, 0.596);
  border-radius: 10px;
  backdrop-filter: blur(10px);
  border: 2px solid rgba(131, 99, 99, 0.349);
  box-shadow: 0 0 20px rgba(8, 7, 16, 0.24);
}

.tableCourse p {
  width: auto;
}

.buttons {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  min-height: 60vh;
  max-height: 70vh;
}

.buttons button {
  background-color: rgba(0, 0, 0, 0.596);
  color: white;
  min-width: 7vw;
  width: 14vw;
}
</style>
