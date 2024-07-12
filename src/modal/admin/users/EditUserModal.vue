<template>
  <q-dialog v-model="card">
    <q-card class="my-card">
      <q-card-section class="q-pt-md">
        <div class="col text-h6 ellipsis">Edita un Usuario</div>
      </q-card-section>

      <q-card-section class="q-pt-md">
        <q-input
          v-model="userName"
          ref="userNameRef"
          class=""
          filled
          label="Nombre Y Apellido"
          :rules="rules.name"
        ></q-input>
        <q-input
          v-model="userEmail"
          ref="userEmailRef"
          class="q-mt-md"
          filled
          label="Email"
          :rules="rules.email"
        ></q-input>
        <q-input
          v-model="userPhone"
          ref="userPhoneRef"
          class="q-mt-md"
          filled
          label="Teléfono"
          :rules="rules.phone"
        ></q-input>
        <q-input
          v-model="userPassword"
          ref="userPasswordRef"
          class="q-mt-md"
          filled
          label="Contraseña"
          :rules="rules.password"
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
          label="Editar Usuario"
          @click="editUser"
          :disable="!userName || !userEmail || !userPhone"
        >
          <q-tooltip
            class="bg-red text-h6"
            anchor="center left"
            self="center right"
            :offset="[10, 10]"
            v-if="!userName || !userEmail || !userPhone"
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

const props = defineProps(["user", "open", "changeModal", "loadCourse"]);

const router = useRouter();
const route = useRoute();

defineOptions({
  name: "EditCourse",
});

const card = ref(props.open);

const userName = ref(props.user.name);
const userEmail = ref(props.user.email);
const userPhone = ref(props.user.phone);
const userPassword = ref("");
const userId = ref(props.user._id);
const loading = ref(false);

const userNameRef = ref(null);
const userEmailRef = ref(null);
const userPhoneRef = ref(null);
const userPasswordRef = ref(null);

const rules = {
  name: [
    (val) => val.length < 61 || "60 Carácteres máximos en el nombre",
    (val) => val.length > 0 || "Coloca un nombre",
  ],
  email: [
    (val) => val.length < 61 || "60 Carácteres máximos en el maestro",
    (val) => val.length > 0 || "Coloca un maestro",
  ],
  password: [],
  phone: [
    (val) => val.toString().length < 11 || "11 Carácteres máximos en la hora",
    (val) => val.toString().length > 0 || "Coloca una hora",
    (val) => !val.toString().includes("e") || "Ingresa un número válido",
  ],
};

const editUser = async () => {
  try {
    loading.value = true;

    userNameRef.value.validate();
    userEmailRef.value.validate();
    userPhoneRef.value.validate();
    userPasswordRef.value.validate();

    if (
      userNameRef.value.hasError ||
      userEmailRef.value.hasError ||
      userPhoneRef.value.hasError ||
      userPasswordRef.value.hasError
    )
      throw { message: "Cumple con todas las condiciones antes de editar el usuario" };

    await api.put("/users", {
      userName: userName.value,
      userEmail: userEmail.value,
      userPhone: userPhone.value,
      userPassword: userPassword.value,
      userId: userId.value,
    });
    Swal.fire({
      title: "Editado",
      text: "Usuario editado correctamente",
      icon: "success",
      confirmButtonText: "Aceptar",
    });
    props.loadCourse();
  } catch (error) {
    console.log("ERROR ", error);
    Swal.fire({
      title: "Error",
      text:
        error.message && !error.response
          ? error.message
          : error.response.data.error || error.message,
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

.inputCreate {
}
</style>
