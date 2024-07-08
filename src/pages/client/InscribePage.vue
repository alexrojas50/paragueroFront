<template>
  <q-page class="flex flex-center mainPage">
    <div class="box">
      <div class="title">
        <p>INSCRÍBETE EN UN CURSO</p>
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
              separator="cell"
            >
              <template v-slot:top>
                <img
                  style="height: 50px; width: 50px"
                  src="https://cdn.quasar.dev/logo-v2/svg/logo.svg"
                />
              </template>

              <template v-slot:body="props">
                <q-tr :props="props">
                  <q-td key="name" :props="props">
                    {{ props.row.name }}
                  </q-td>
                  <q-td key="teacher" :props="props">
                    {{ props.row.teacher }}
                  </q-td>
                  <q-td key="description" :props="props">
                    {{ props.row.description }}
                  </q-td>
                  <q-td key="hours" :props="props">
                    {{ props.row.hours }}
                  </q-td>
                  <q-td key="actions" :props="props">
                    <div class="q-gutter-sm row justify-around">
                      <q-btn
                        round
                        color="green"
                        icon="navigation"
                        @click="changeModalInscribe(props.row)"
                      />
                      <q-btn
                        round
                        color="blue"
                        icon="info"
                        @click="changeModalInfo(props.row)"
                      />
                    </div>
                  </q-td>
                </q-tr>
              </template>
            </q-table>
          </div>
        </div>
      </div>

      <inscribe-modal
        :course="course"
        :open="modalInscribe"
        :changeModal="changeModalInscribe"
        v-if="modalInscribe"
      />

      <info-modal
        :course="course"
        :open="modalInfo"
        :changeModal="changeModalInfo"
        v-if="modalInfo"
      />
    </div>
  </q-page>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import InscribeModal from "../../modal/client/InscribeModal.vue";
import InfoModal from "../../modal/client/InfoModal.vue";
import { ref, onMounted } from "vue";
import {api} from "../../boot/axios.js"

const router = useRouter();
const route = useRoute();

defineOptions({
  name: "InscribePage",
  components: {
    "inscribe-modal": InscribeModal,
    "info-modal": InfoModal,
  },
});

const modalInscribe = ref(false);
const modalInfo = ref(false);
const course = ref("");
const rows = ref([]);

const changeModalInscribe = (courseSelect) => {
  course.value = courseSelect;
  modalInscribe.value = !modalInscribe.value;
};

const changeModalInfo = (courseSelect) => {
  course.value = courseSelect;
  modalInfo.value = !modalInfo.value;
};

onMounted(async () => {
  const res = await api.get("/course")
  console.log('RESSS ',res);
  rows.value = res.data
})

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
    align: "left",
    sortable: true,
  },
  {
    name: "description",
    label: "Descripción",
    align: "left",
    field: "description",
  },
  {
    name: "hours",
    label: "Horas",
    field: "hours",
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
  width: 90vw;
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

.btn {
  width: 200px;
  height: 40px;
  background: rgba(0, 0, 0, 0.596) !important;
  border-radius: 10px;
  backdrop-filter: blur(10px);
  border: 2px solid rgba(131, 99, 99, 0.349);
  box-shadow: 0 0 20px rgba(8, 7, 16, 0.24);
}

.infoBox {
  width: 60vw;
  height: 100%;
  /* background: red; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}

.info {
  width: 60vw;
  height: 30%;
  /* background: blue; */
}
.social {
  width: 60vw;
  height: 30%;
  /* background: green; */
  padding-top: 5vh;
}

.socialB {
  margin-top: 6vh;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
</style>
