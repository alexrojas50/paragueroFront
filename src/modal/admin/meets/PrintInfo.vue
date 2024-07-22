<template>
  <div>
    <table>
      <thead>
        <tr>
          <th>Columna 1</th>
          <th>Columna 2</th>
          <!-- Agrega más columnas según tus necesidades -->
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in datos" :key="index">
          <td>{{ item.valor1 }}</td>
          <td>{{ item.valor2 }}</td>
          <!-- Agrega más celdas según tus necesidades -->
        </tr>
      </tbody>
    </table>

    <!-- Botón para descargar el PDF -->
    <button @click="descargarPDF">Descargar PDF</button>
  </div>
</template>

<script setup>
import html2pdf from "html2pdf.js";
defineOptions({
  name: "PrintInfo",
});
const datos = [
  { valor1: "Dato 1", valor2: "Dato A" },
  { valor1: "Dato 2", valor2: "Dato B" },
  // Agrega más datos según tus necesidades
];

const descargarPDF = () => {
  const printContents = document.querySelector("table");
  html2pdf(printContents);
};
</script>
