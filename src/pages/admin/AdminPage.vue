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
              title="Próximos Encuentros"
              :rows="rows"
              :columns="columns"
              row-key="name"
              binary-state-sort
              class="tableCourse"
              rows-per-page-label="Documentos por página"
              dark
            >
              <template v-slot:body="props">
                <q-tr :props="props">
                  <q-td key="name" :props="props">
                    {{ props.row.name }}
                  </q-td>
                  <q-td key="teacher" :props="props">
                    {{ props.row.teacher }}
                  </q-td>
                  <q-td key="hours" :props="props">
                    <div class="text-pre-wrap">{{ props.row.hours }}</div>
                  </q-td>
                </q-tr>
              </template>
            </q-table>
          </div>
        </div>
        <div>
          <div class="q-pa-md buttons">
            <q-btn rounded @click="toCourses">Cursos</q-btn>
            <q-btn rounded @click="toRooms">Aulas</q-btn>
            <q-btn rounded @click="toUsers">Usuarios</q-btn>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { api } from "src/boot/axios";
import Swal from "sweetalert2";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();

defineOptions({
  name: "AdminPage",
});

const rows = ref([]);
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
    name: "hours",
    label: "Horas",
    field: "hours",
    sortable: true,
    style: "width: 10px",
  },
];

onMounted(async () => {
  try {
    const res = await api.get("/course");
    rows.value = res.data;
  } catch (error) {
    Swal.fire({
      title: "Error",
      text: "Error al cargar los cursos",
      icon: "error",
      confirmButtonText: "Aceptar",
    });
  }
});

const toCourses = () => router.push({ name: "AdminCourses" });
const toRooms = () => router.push({ name: "AdminRooms" });
const toUsers = () => router.push({ name: "AdminUsers" });
</script>

<style scoped>
* {
  scrollbar-width: none;
}

.mainPage {
  background: rgb(18, 42, 107);
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
  width: 30vw;
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
