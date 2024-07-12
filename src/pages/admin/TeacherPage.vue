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
              title="Cursos"
              :rows="rows"
              :columns="columns"
              row-key="name"
              binary-state-sort
              class="tableCourse"
              rows-per-page-label="Documentos por página"
              dark
            >
              <template v-slot:top>
                <p>Profesores</p>
                <q-space />
                <q-btn rounded @click="openModalCreate" color="green" icon="add"></q-btn>
              </template>
              <template v-slot:body="props">
                <q-tr :props="props">
                  <q-td key="name" :props="props">
                    {{ props.row.name }}
                  </q-td>
                  <q-td key="email" :props="props">
                    {{ props.row.email }}
                  </q-td>
                  <q-td key="phone" :props="props">
                    {{ props.row.phone }}
                  </q-td>
                  <q-td key="actions" :props="props">
                    <div class="q-gutter-sm row justify-center">
                      <q-btn
                        rounded
                        @click="openModalEdit(props.row)"
                        color="blue"
                        icon="edit"
                      />
                      <q-btn
                        rounded
                        @click="openModalDelete(props.row)"
                        color="red"
                        icon="delete"
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
        :user="courseSelect"
        :open="modalEdit"
        :changeModal="openModalEdit"
        v-if="modalEdit"
        :loadCourse="loadCourse"
      />

      <delete-modal
        :user="courseSelect"
        :open="modalDelete"
        :changeModal="openModalDelete"
        v-if="modalDelete"
        :loadCourse="loadCourse"
      />
    </div>
  </q-page>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import CreateTeacherModal from "../../modal/admin/teachers/CreateTeacherModal.vue";
import EditTeacherModal from "../../modal/admin/teachers/EditTeacherModal.vue";
import DeleteTeacherModal from "../../modal/admin/teachers/DeleteTeacherModal.vue";
import Swal from "sweetalert2";
import { ref, onMounted } from "vue";
import { api } from "src/boot/axios";

const router = useRouter();
const route = useRoute();

defineOptions({
  name: "AdminCourses",
  components: {
    "create-modal": CreateTeacherModal,
    "edit-modal": EditTeacherModal,
    "delete-modal": DeleteTeacherModal,
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
    const res = await api.get("/users?level=3");
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
    label: "Nombre",
    align: "left",
    field: (row) => row.name,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "email",
    align: "center",
    label: "Email",
    field: "email",
  },
  {
    name: "phone",
    align: "center",
    label: "Teléfono",
    field: "phone",
  },
  {
    name: "actions",
    label: "Acciones",
    align: "center",
    content: "center",
    field: "actions",
    classes: "test",
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
