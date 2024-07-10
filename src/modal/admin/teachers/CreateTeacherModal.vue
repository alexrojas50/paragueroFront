<template>
  <q-dialog v-model="card">
    <q-card class="my-card">
      <q-card-section class="q-pt-md">
        <div class="col text-h6 ellipsis">Crea un Profesor</div>
      </q-card-section>

      <q-card-section class="q-pt-md">
        <q-input
          v-model="teacherName"
          ref="NameRef"
          class=""
          filled
          label="Nombre del Profesor"
        ></q-input>

        <q-input
          v-model="teacherEmail"
          ref="EmailRef"
          class="q-mt-md"
          filled
          label="Email"
        ></q-input>

        <q-input
          v-model="teacherPhone"
          ref="PhoneRef"
          class="q-mt-md"
          filled
          label="Teléfono"
        ></q-input>

        <q-input
          v-model="teacherCI"
          ref="CIRef"
          class="q-mt-md"
          filled
          label="Cédula de Identidad"
        ></q-input>

        <q-input
          v-model="teacherPassword"
          ref="PasswordRef"
          class="q-mt-md"
          filled
          label="Contraseña"
          type="password"
        ></q-input>
      </q-card-section>

      <q-separator />
      <div class="loaderContainer" v-if="loading">
        <span class="loader"></span>
      </div>

      <q-separator />

      <q-card-actions align="right">
        <q-btn
          type="submit"
          flat
          color="primary"
          label="Crear Curso"
          @click="createCourse"
          :disable="
            !teacherName ||
            !teacherEmail ||
            !teacherPhone ||
            !teacherPassword ||
            !teacherCI
          "
        >
          <q-tooltip
            class="bg-red text-h6"
            anchor="center left"
            self="center right"
            :offset="[10, 10]"
            v-if="
              !teacherName ||
              !teacherEmail ||
              !teacherPhone ||
              !teacherPassword ||
              !teacherCI
            "
            >Rellena todos los campos
          </q-tooltip>
        </q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { ref, onMounted, watch } from "vue";
import { api } from "../../../boot/axios.js";
import Swal from "sweetalert2";
const props = defineProps(["course", "open", "changeModal", "loadCourse"]);

const router = useRouter();
const route = useRoute();

defineOptions({
  name: "CreateCourse",
});

const card = ref(props.open);
const loading = ref(false);
const teacherName = ref("");
const teacherEmail = ref("");
const teacherPhone = ref("");
const teacherCI = ref("");
const teacherPassword = ref("");

const NameRef = ref(null);
const EmailRef = ref(null);
const PhoneRef = ref(null);
const CIRef = ref(null);
const PasswordRef = ref(false);

const rules = {};

const createCourse = async () => {
  try {
    loading.value = true;
    await api.post("/users/create", {
      userName: teacherName.value,
      password: teacherPassword.value,
      userEmail: teacherEmail.value,
      phone: teacherPhone.value,
      CIUser: teacherCI.value,
      level: 3,
    });
    Swal.fire({
      title: "Creado",
      text: "Curso creado correctamente",
      icon: "success",
      confirmButtonText: "Aceptar",
    });
    props.loadCourse();
  } catch (error) {
    loading.value = false;
    card.value = false;
    console.log("ERROR ", error);
    Swal.fire({
      title: "Error",
      text: error.message && !error.response ? error.message : error.response.data.error,
      icon: "error",
      confirmButtonText: "Aceptar",
    });
  } finally {
    loading.value = false;
    card.value = false;
  }
};

onMounted(() => {
  console.log("PROPS ", props);
});

watch(card, () => {
  props.changeModal();
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

.inputCreate {
}
</style>
