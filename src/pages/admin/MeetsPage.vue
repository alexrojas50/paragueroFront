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
              title="Encuentros"
              :rows="rows"
              :columns="columns"
              row-key="name"
              binary-state-sort
              class="tableCourse"
              rows-per-page-label="Documentos por página"
              dark
            >
              <template v-slot:top>
                <p>Encuentros</p>
                <q-space />
                <q-btn rounded @click="openModalCreate" color="green" icon="add"></q-btn>
              </template>

              <template v-slot:body="props">
                <q-tr :props="props">
                  <q-td key="course" :props="props">
                    {{ props.row.course.name }}
                  </q-td>
                  <q-td key="room" :props="props">
                    {{ props.row.room.number }}
                  </q-td>
                  <q-td key="date" :props="props">
                    {{ props.row.date }}
                  </q-td>
                  <q-td key="hour" :props="props">
                    {{ props.row.time }}
                  </q-td>

                  <q-td key="actions" :props="props">
                    <div class="q-gutter-sm row justify-center">
                      <q-btn
                        rounded
                        @click="openModalInfo(props.row)"
                        color="green"
                        icon="info"
                      />
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
        :loadMeets="loadMeets"
        v-if="modalCreate"
      />

      <edit-modal
        :meet="meetSelect"
        :open="modalEdit"
        :changeModal="openModalEdit"
        :loadMeets="loadMeets"
        v-if="modalEdit"
      />

      <info-modal
        :meet="meetSelect"
        :open="modalInfo"
        :changeModal="openModalInfo"
        :loadMeets="loadMeets"
        v-if="modalInfo"
      />

      <delete-modal
        :meet="meetSelect"
        :open="modalDelete"
        :changeModal="openModalDelete"
        :loadMeets="loadMeets"
        v-if="modalDelete"
      />
    </div>
  </q-page>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import CreateRoomModal from "../../modal/admin/meets/CreateMeetModal.vue";
import InfoMeetModal from "../../modal/admin/meets/InfoMeetModal.vue";
import EditRoomModal from "../../modal/admin/meets/EditMeetModal.vue";
import DeleteRoomModal from "../../modal/admin/meets/DeleteMeetModal.vue";
import { onMounted, ref } from "vue";
import Swal from "sweetalert2";
import { api } from "src/boot/axios";

const router = useRouter();
const route = useRoute();

defineOptions({
  name: "AdminMeets",
  components: {
    "create-modal": CreateRoomModal,
    "info-modal": InfoMeetModal,
    "edit-modal": EditRoomModal,
    "delete-modal": DeleteRoomModal,
  },
});

const modalCreate = ref(false);
const modalInfo = ref(false);
const modalEdit = ref(false);
const modalDelete = ref(false);
const meetSelect = ref({});
const rows = ref([]);

const openModalCreate = () => {
  modalCreate.value = !modalCreate.value;
};
const openModalInfo = (meetS) => {
  meetSelect.value = meetS;
  modalInfo.value = !modalInfo.value;
};

const openModalEdit = (meetS) => {
  meetSelect.value = meetS;
  modalEdit.value = !modalEdit.value;
};
const openModalDelete = (meetS) => {
  meetSelect.value = meetS;
  modalDelete.value = !modalDelete.value;
};

const loadMeets = async () => {
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

onMounted(() => {
  loadMeets();
});

const columns = [
  {
    name: "course",
    required: true,
    label: "Curso",
    align: "left",
    field: "course",
    sortable: true,
  },
  {
    name: "room",
    label: "Aula",
    field: "room",
    align: "center",
    sortable: true,
  },
  {
    name: "date",
    label: "Fecha",
    field: "date",
    align: "center",
    sortable: true,
  },
  {
    name: "hour",
    label: "Hora",
    field: "hour",
    align: "center",
    sortable: true,
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
}
</style>
