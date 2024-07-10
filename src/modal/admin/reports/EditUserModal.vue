<template>
  <q-dialog v-model="card">
    <q-card class="my-card">
      <q-card-section class="q-pt-md">
        <div class="col text-h6 ellipsis">Reportes</div>
      </q-card-section>

      <q-card-section class="q-pt-md">
        <div v-for="(item, index) in reports.reports" :key="index">
          <div class="q-pb-xl">
            <q-input
              class=""
              filled
              label="Usuario"
              disable
              v-model="item.user.name"
              autogrow
            >
            </q-input>
            <q-input
              class=""
              filled
              label="Reporte"
              disable
              v-model="item.description"
              autogrow
            >
            </q-input>
          </div>
        </div>
      </q-card-section>

      <q-separator />
      <div class="loaderContainer" v-if="loading">
        <span class="loader"></span>
      </div>

      <q-separator />

      <q-card-actions align="right">
        <q-btn type="submit" flat color="primary" label="Cerrar" @click="editUser">
        </q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { ref, onMounted, watch } from "vue";

const props = defineProps(["reports", "open", "changeModal", "loadCourse"]);

defineOptions({
  name: "EditCourse",
});

const card = ref(props.open);
const reports = ref(props.reports);
const loading = ref(false);

const userNameRef = ref(null);

const editUser = async () => {
  loading.value = false;
  card.value = false;
};

onMounted(() => {
  console.log("PROPS ", props);
});

watch(card, () => {
  props.changeModal();
});

watch(reports, () => {
  console.log("??? ", reports);
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

.my-card {
  max-height: 50vh;
}
</style>
