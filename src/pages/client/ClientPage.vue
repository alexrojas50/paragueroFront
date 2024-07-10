<template>
  <q-page class="flex flex-center mainPage">
    <div class="box">
      <div class="title">
        <p>ASOCIACIÓN CIVIL "EL PARAGUERO"</p>
      </div>
      <div class="dataBox">
        <div class="tableCourses">
          <div class="q-pa-md elements">
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
                <img
                  style="height: 50px; width: 50px"
                  src="https://cdn.quasar.dev/logo-v2/svg/logo.svg"
                />
                <q-space />
                <q-btn rounded outline @click="toInscribe"> Inscríbete </q-btn>
              </template>

              <template v-slot:body="props">
                <q-tr :props="props">
                  <q-td key="name" :props="props">
                    {{ props.row.name }}
                  </q-td>
                  <q-td key="teacher" :props="props">
                    {{ props.row.teacher.name }}
                  </q-td>
                  <q-td key="hours" :props="props">
                    <div class="text-pre-wrap">{{ props.row.hours }}</div>
                  </q-td>
                </q-tr>
              </template>
            </q-table>
            <q-btn
              color="secondary"
              label="Últimos Encuentros"
              class="btn q-mt-xl"
              @click="sendTo({ name: 'ClientMeets' })"
            />
          </div>
        </div>
        <div class="infoBox">
          <img src="/paraguero.png" alt="" />
          <div class="info">
            <p>
              ¿Estás listo para dar un gran paso hacia el logro de tus metas? No esperes
              más para invertir en tu crecimiento personal y profesional. Nuestros cursos
              están diseñados para inspirarte, desafiarte y brindarte las herramientas que
              necesitas para alcanzar el éxito.
            </p>

            <p>
              ¡Inscríbete ahora y comienza tu viaje hacia el desarrollo y la realización
              personal! El futuro que deseas está a solo un paso de distancia. ¡No te
              pierdas esta oportunidad!
            </p>
          </div>
          <div class="social">
            <div class="socialB">
              <q-btn
                color="secondary"
                :icon-right="'img:public/icons/instagram.svg'"
                label="Instagram"
                class="btn"
                @click="sendInstagram"
              />

              <q-btn
                color="secondary"
                :icon-right="'img:public/icons/whatsapp.svg'"
                label="Whatsapp"
                class="btn"
                @click="sendWhatsapp"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { ref, onMounted } from "vue";
import { api } from "../../boot/axios.js";

const router = useRouter();
const route = useRoute();

defineOptions({
  name: "ClientPage",
});

const rows = ref([]);

const sendTo = (routeTo) => router.push(routeTo);

const sendInstagram = () =>
  window.open("https://www.instagram.com/acelparaguero/?hl=es", "_blank");

const sendWhatsapp = () =>
  window.open("https://api.whatsapp.com/send?phone=584121788031", "_blank");

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
  const res = await api.get("/course");
  rows.value = res.data;
});

const toInscribe = () => router.push({ name: "ClientInscribe" });
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
  width: 30vw;
  height: 100%;
  /* background: red; */
}

.elements {
  display: flex;
  flex-direction: column;
  align-items: center;
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
