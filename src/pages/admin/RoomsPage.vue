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
              <template v-slot:top>
                <p>Aulas</p>
                <q-space />
                <q-btn rounded @click="openModalCreate" color="green" icon="add"></q-btn>
              </template>

              <template v-slot:body="props">
                <q-tr :props="props">
                  <q-td key="number" :props="props">
                    {{ props.row.number }}
                  </q-td>
                  <q-td key="status" :props="props">
                    <div
                      :class="{
                        active: props.row.status,
                        desactive: !props.row.status,
                        status: true,
                      }"
                    ></div>
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
        :loadRooms="loadRooms"
        v-if="modalCreate"
      />

      <edit-modal
        :room="courseSelect"
        :open="modalEdit"
        :changeModal="openModalEdit"
        :loadRooms="loadRooms"
        v-if="modalEdit"
      />

      <delete-modal
        :room="courseSelect"
        :open="modalDelete"
        :changeModal="openModalDelete"
        :loadRooms="loadRooms"
        v-if="modalDelete"
      />
    </div>
  </q-page>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import CreateCourseModal from "../../modal/admin/rooms/CreateRoomModal.vue";
import EditCourseModal from "../../modal/admin/rooms/EditRoomModal.vue";
import DeleteCourseModal from "../../modal/admin/rooms/DeleteRoomModal.vue";
import { onMounted, ref } from "vue";
import { api } from "src/boot/axios";

const router = useRouter();
const route = useRoute();

defineOptions({
  name: "AdminCourses",
  components: {
    "create-modal": CreateCourseModal,
    "edit-modal": EditCourseModal,
    "delete-modal": DeleteCourseModal,
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

const loadRooms = async () => {
  try {
    const res = await api.get("/room");
    rows.value = res.data;
  } catch (error) {
    Swal.fire({
      title: "Error",
      text: "Error al cargar las aulas",
      icon: "error",
      confirmButtonText: "Aceptar",
    });
  }
};

onMounted(() => {
  loadRooms();
});

const columns = [
  {
    name: "number",
    required: true,
    label: "Número de Aula",
    align: "left",
    field: (row) => row.number,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "status",
    label: "Disponible",
    field: "status",
    align: "center",
    sortable: true,
    classes: "statusClassTable",
  },
  {
    name: "actions",
    label: "Acciones",
    align: "center",
    content: "center",
    field: "actions",
  },
];
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

.status {
  width: 30px;
  height: 30px;
  border-radius: 50%;
}

.active {
  background: rgb(0, 214, 0);
}

.desactive {
  background: red;
}
.statusClassTable {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 55px;
}
</style>
